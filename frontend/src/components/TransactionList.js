import React from "react";
import api from "../api";

const TransactionList = ({ transactions, onDelete }) => {
  const handleDelete = async (id) => {
    await api.delete(`/transactions/${id}`);
    onDelete();
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Valor (R$)</th>
          <th>Tipo</th>
          <th>Data</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t) => (
          <tr key={t.id}>
            <td>{t.description}</td>
            <td>{Number(t.amount).toFixed(2)}</td>
            <td>{t.type}</td>
            <td>{new Date(t.date).toLocaleDateString("pt-BR")}</td>
            <td>
              <button onClick={() => handleDelete(t.id)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionList;