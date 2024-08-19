import prisma from '../../../lib/prismaClient';
import {
  fetchCustomer,
  fetchCustomers,
  updateCustomer,
} from '../components/customerUtils';

jest.mock('../../../lib/prismaClient', () => ({
  customer: {
    findMany: jest.fn(),
  },
}));

global.fetch = jest.fn();

describe('customerUtils', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchCustomers', () => {
    it('fetches and formats customers correctly', async () => {
      const mockCustomers = [
        {
          id: 'cla1b2c3d4e5f6g7h8i9j0',
          name: 'John Doe',
          phone: '123-456-7890',
          bookings: [{ service: { name: 'Haircut' } }],
        },
        {
          id: 'clk5l6m7n8o9p0q1r2s3t4',
          name: 'Jane Smith',
          phone: '098-765-4321',
          bookings: [],
        },
      ];

      (prisma.customer.findMany as jest.Mock).mockResolvedValue(mockCustomers);

      const result = await fetchCustomers();

      expect(result).toEqual([
        {
          id: 'cla1b2c3d4e5f6g7h8i9j0',
          name: 'John Doe',
          phone: '123-456-7890',
          service: 'Haircut',
        },
        {
          id: 'clk5l6m7n8o9p0q1r2s3t4',
          name: 'Jane Smith',
          phone: '098-765-4321',
          service: 'No service booked',
        },
      ]);
    });
  });

  describe('fetchCustomer', () => {
    it('fetches a customer by ID successfully', async () => {
      const mockCustomer = {
        id: 'cla1b2c3d4e5f6g7h8i9j0',
        name: 'John Doe',
        phone: '123-456-7890',
        email: 'john@example.com',
      };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockCustomer),
      });

      const result = await fetchCustomer('cla1b2c3d4e5f6g7h8i9j0');

      expect(result).toEqual(mockCustomer);
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/customers/cla1b2c3d4e5f6g7h8i9j0'
      );
    });

    it('returns null when fetch fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
      });

      const result = await fetchCustomer('cla1b2c3d4e5f6g7h8i9j0');

      expect(result).toBeNull();
    });
  });

  describe('updateCustomer', () => {
    it('updates a customer successfully', async () => {
      const mockCustomer = {
        id: 'cla1b2c3d4e5f6g7h8i9j0',
        name: 'John Doe',
        phone: '123-456-7890',
        email: 'john@example.com',
      };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
      });

      const result = await updateCustomer(mockCustomer);

      expect(result).toBe(true);
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/customers/cla1b2c3d4e5f6g7h8i9j0',
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(mockCustomer),
        }
      );
    });

    it('returns false when update fails', async () => {
      const mockCustomer = {
        id: 'cla1b2c3d4e5f6g7h8i9j0',
        name: 'John Doe',
        phone: '123-456-7890',
        email: 'john@example.com',
      };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
      });

      const result = await updateCustomer(mockCustomer);

      expect(result).toBe(false);
    });
  });
});
