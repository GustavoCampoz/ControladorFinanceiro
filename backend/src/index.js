const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(cors());
app.use(express.json());

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: false
});

const Transaction = sequelize.define('Transaction', {
  description: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.DECIMAL(12,2), allowNull: false },
  type: { type: DataTypes.ENUM('receita', 'despesa'), allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false }
}, { tableName: 'Transactions' });

app.get('/api/transactions', async (_, res) => res.json(await Transaction.findAll()));
app.post('/api/transactions', async (req, res) => {
  const { description, amount, type, date } = req.body;
  const t = await Transaction.create({ description, amount, type, date });
  res.json(t);
});
app.put('/api/transactions/:id', async (req, res) => {
  const { id } = req.params;
  const t = await Transaction.findByPk(id);
  if (!t) return res.status(404).send();
  await t.update(req.body);
  res.json(t);
});
app.delete('/api/transactions/:id', async (req, res) => {
  const { id } = req.params;
  const t = await Transaction.findByPk(id);
  if (!t) return res.status(404).send();
  await t.destroy();
  res.sendStatus(204);
});

sequelize.sync().then(() => app.listen(process.env.PORT, () => console.log(`API rodando na porta ${process.env.PORT}`)));
