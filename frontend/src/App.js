import React, { useEffect, useState } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import ChartView from "./components/ChartView";
import api from "./api";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const res = await api.get("/transactions");
    setTransactions(res.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="container">
      <h1>💰 Controlador Financeiro</h1>
      <TransactionForm onAdd={fetchTransactions} />
      <ChartView transactions={transactions} />
      <TransactionList transactions={transactions} onDelete={fetchTransactions} />
    </div>
  );
}

export default App;