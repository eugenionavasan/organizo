"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Customer = {
  id: number;
  name: string;
  tel: string;
  service: string;
};

const mockCustomers: Customer[] = [
  { id: 1, name: "John Doe", tel: "123-456-7890", service: "Web Development" },
  { id: 2, name: "Jane Smith", tel: "987-654-3210", service: "Graphic Design" },
  {
    id: 3,
    name: "Alice Johnson",
    tel: "555-123-4567",
    service: "SEO Optimization",
  },
];

const EditCustomerPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const customerToEdit = mockCustomers.find(
      (c) => c.id === parseInt(params.id)
    );
    if (customerToEdit) {
      setCustomer(customerToEdit);
    } else {
      router.push("/customers"); // Redirect if the customer is not found
    }
  }, [params.id, router]);

  const handleSave = () => {
    // Mock save logic
    alert("Customer details saved!");
    router.push("/customers");
  };

  if (!customer) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Edit Customer: {customer.name}
      </h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name:</label>
        <input
          type="text"
          value={customer.name}
          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Telephone:
        </label>
        <input
          type="text"
          value={customer.tel}
          onChange={(e) => setCustomer({ ...customer, tel: e.target.value })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Service:
        </label>
        <input
          type="text"
          value={customer.service}
          onChange={(e) =>
            setCustomer({ ...customer, service: e.target.value })
          }
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default EditCustomerPage;
