import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Creates 5 Services
  const haircut = await prisma.service.create({
    data: {
      name: 'Haircut',
      price: 25.00,
    },
  });

  const hairColoring = await prisma.service.create({
    data: {
      name: 'Hair Coloring',
      price: 60.00,
    },
  });

  const hairWashing = await prisma.service.create({
    data: {
      name: 'Hair Washing',
      price: 15.00,
    },
  });

  const beardTrim = await prisma.service.create({
    data: {
      name: 'Beard Trim',
      price: 20.00,
    },
  });

  const scalpMassage = await prisma.service.create({
    data: {
      name: 'Scalp Massage',
      price: 30.00,
    },
  });

  // Creates 5 Customers and Bookings
  await prisma.customer.create({
    data: {
      name: 'John Doe',
      phone: '+1234567890',
      email: 'john.doe@example.com',
      bookings: {
        create: {
          bookedTime: new Date('2024-08-19T10:00:00Z'),
          serviceId: haircut.id,
          hasPaid: true,
        },
      },
    },
  });

  await prisma.customer.create({
    data: {
      name: 'Jane Smith',
      phone: '+1234567891',
      email: 'jane.smith@example.com',
      bookings: {
        create: {
          bookedTime: new Date('2024-08-20T11:00:00Z'),
          serviceId: hairColoring.id,
          hasPaid: true,
        },
      },
    },
  });

  await prisma.customer.create({
    data: {
      name: 'Bob Johnson',
      phone: '+1234567892',
      email: 'bob.johnson@example.com',
      bookings: {
        create: {
          bookedTime: new Date('2024-08-21T12:00:00Z'),
          serviceId: hairWashing.id,
          hasPaid: false,
        },
      },
    },
  });

  await prisma.customer.create({
    data: {
      name: 'Alice Williams',
      phone: '+1234567893',
      email: 'alice.williams@example.com',
      bookings: {
        create: {
          bookedTime: new Date('2024-08-22T13:00:00Z'),
          serviceId: beardTrim.id,
          hasPaid: false,
        },
      },
    },
  });

  await prisma.customer.create({
    data: {
      name: 'Charlie Brown',
      phone: '+1234567894',
      email: 'charlie.brown@example.com',
      bookings: {
        create: {
          bookedTime: new Date('2024-08-23T14:00:00Z'),
          serviceId: scalpMassage.id,
          hasPaid: false,
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });