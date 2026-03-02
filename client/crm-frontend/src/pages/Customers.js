import React, { useEffect, useState } from "react";
import API from "../api/axios";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  const getCustomers = async () => {
    const res = await API.get("/customers/");

    setCustomers(res.data);
  };

  const createCustomer = async () => {
    await API.post("/customers/", {
      name,
      email,
      phone,
      company,
    });

    getCustomers();
  };

  const deleteCustomer = async (id) => {
    await API.delete(`/customers/${id}/`);

    getCustomers();
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Customers</h1>

      <div className="space-y-2 mb-6">
        <input
          className="border p-2 w-full"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Phone"
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Company"
          onChange={(e) => setCompany(e.target.value)}
        />

        <button
          onClick={createCustomer}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Add Customer
        </button>
      </div>

      <div>
        {customers.map((c) => (
          <div key={c.id} className="border p-4 mb-2 flex justify-between">
            <div>
              <p className="font-bold">{c.name}</p>
              <p>{c.email}</p>
              <p>{c.phone}</p>
              <p>{c.company}</p>
            </div>

            <button
              onClick={() => deleteCustomer(c.id)}
              className="bg-red-500 text-white px-3"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Customers;
