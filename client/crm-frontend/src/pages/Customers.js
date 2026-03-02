import React, { useEffect, useState } from "react";
import API from "../api/axios";

function Customers() {
  const [customers, setCustomers] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");

  const [editingId, setEditingId] = useState(null);

  const clearInputs = () => {
    setName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setEditingId(null);
  };

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

    clearInputs();
    getCustomers();
  };

  const updateCustomer = async () => {
    await API.put(`/customers/${editingId}/`, {
      name,
      email,
      phone,
      company,
    });

    clearInputs();
    getCustomers();
  };

  const deleteCustomer = async (id) => {
    await API.delete(`/customers/${id}/`);
    getCustomers();
  };

  const editCustomer = (customer) => {
    setEditingId(customer.id);
    setName(customer.name);
    setEmail(customer.email);
    setPhone(customer.phone);
    setCompany(customer.company);
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        {editingId ? (
          <button
            onClick={updateCustomer}
            className="bg-green-500 text-white px-4 py-2"
          >
            Update Customer
          </button>
        ) : (
          <button
            onClick={createCustomer}
            className="bg-blue-500 text-white px-4 py-2"
          >
            Add Customer
          </button>
        )}
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

            <div className="space-x-2">
              <button
                onClick={() => editCustomer(c)}
                className="bg-yellow-500 text-white px-3"
              >
                Edit
              </button>

              <button
                onClick={() => deleteCustomer(c.id)}
                className="bg-red-500 text-white px-3"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Customers;
