import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const ChartView = ({ transactions }) => {
  const data = [
    {
      name: "Receitas",
      total: transactions
        .filter((t) => t.type === "receita")
        .reduce((acc, t) => acc + Number(t.amount), 0),
    },
    {
      name: "Despesas",
      total: transactions
        .filter((t) => t.type === "despesa")
        .reduce((acc, t) => acc + Number(t.amount), 0),
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartView;