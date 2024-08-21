"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../components/layout";

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

const CustomerListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState(mockCustomers);
  const router = useRouter();

  const handleEdit = (id: number) => {
    router.push(`/customers/${id}/edit`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredCustomers(
      mockCustomers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(value) ||
          customer.tel.toLowerCase().includes(value) ||
          customer.service.toLowerCase().includes(value)
      )
    );
  };

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Customer List</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name, telephone, or service..."
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="border-b border-gray-200 px-4 py-2 text-left">
                  Name
                </th>
                <th className="border-b border-gray-200 px-4 py-2 text-left">
                  Telephone
                </th>
                <th className="border-b border-gray-200 px-4 py-2 text-left">
                  Service
                </th>
                <th className="border-b border-gray-200 px-4 py-2 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td className="border-b border-gray-200 px-4 py-2">
                    {customer.name}
                  </td>
                  <td className="border-b border-gray-200 px-4 py-2">
                    {customer.tel}
                  </td>
                  <td className="border-b border-gray-200 px-4 py-2">
                    {customer.service}
                  </td>
                  <td className="border-b border-gray-200 px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      onClick={() => handleEdit(customer.id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerListPage;
