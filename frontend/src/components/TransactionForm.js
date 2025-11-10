import React, { useState } from "react";
import api from "../api";

const TransactionForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    type: "receita",
    date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.description || !form.amount || !form.date) return;

    await api.post("/transactions", form);
    onAdd();
    setForm({ description: "", amount: "", type: "receita", date: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        name="description"
        placeholder="Descrição"
        value={form.description}
        onChange={handleChange}
        required
      />
      <input
        name="amount"
        type="number"
        placeholder="Valor"
        value={form.amount}
        onChange={handleChange}
        required
      />
      <select name="type" value={form.type} onChange={handleChange}>
        <option value="receita">Receita</option>
        <option value="despesa">Despesa</option>
      </select>
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        required
      />
      <button type="submit">Adicionar</button>
    </form>
  );
};

export default TransactionForm;