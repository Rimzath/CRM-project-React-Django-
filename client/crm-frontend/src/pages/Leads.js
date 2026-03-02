import React, { useEffect, useState } from "react";
import API from "../api/axios";

function Leads() {
  const [leads, setLeads] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [source, setSource] = useState("");

  const [editingId, setEditingId] = useState(null);

  const getLeads = async () => {
    const res = await API.get("/leads/");

    setLeads(res.data);
  };

  useEffect(() => {
    getLeads();
  }, []);

  const clearForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setSource("");
    setEditingId(null);
  };

  const createLead = async () => {
    if (editingId) {
      await API.put(`/leads/${editingId}/`, {
        name,
        email,
        phone,
        source,
      });
    } else {
      await API.post("/leads/", {
        name,
        email,
        phone,
        source,
      });
    }

    clearForm();
    getLeads();
  };

  const editLead = (lead) => {
    setEditingId(lead.id);
    setName(lead.name);
    setEmail(lead.email);
    setPhone(lead.phone);
    setSource(lead.source);
  };

  const deleteLead = async (id) => {
    await API.delete(`/leads/${id}/`);

    getLeads();
  };

  const convertLead = async (id) => {
    await API.post(`/leads/convert/${id}/`);

    getLeads();
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Leads</h1>

      {/* FORM */}

      <div className="grid grid-cols-4 gap-3 mb-6">
        <input
          className="border p-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className="border p-2"
          placeholder="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />

        <button onClick={createLead} className="bg-green-500 text-white p-2">
          {editingId ? "Update Lead" : "Add Lead"}
        </button>

        <button onClick={clearForm} className="bg-gray-500 text-white p-2">
          Clear Form
        </button>
      </div>

      {/* LIST */}

      {leads.map((lead) => (
        <div
          key={lead.id}
          className="border p-4 mb-2 flex justify-between items-center"
        >
          <div>
            <p className="font-bold">{lead.name}</p>

            <p>{lead.email}</p>

            <p>{lead.phone}</p>

            <p>Status: {lead.status}</p>
          </div>

          <div className="flex gap-2">
            {lead.status !== "Converted" && (
              <button
                onClick={() => convertLead(lead.id)}
                className="bg-blue-500 text-white px-3 py-1"
              >
                Convert
              </button>
            )}

            <button
              onClick={() => editLead(lead)}
              className="bg-yellow-500 text-white px-3 py-1"
            >
              Edit
            </button>

            <button
              onClick={() => deleteLead(lead.id)}
              className="bg-red-500 text-white px-3 py-1"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Leads;
