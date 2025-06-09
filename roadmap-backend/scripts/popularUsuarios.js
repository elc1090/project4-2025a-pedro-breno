const mongoose = require('mongoose');
const connectDB = require('../db');
const Usuario = require('../models/Usuario');

const usuarios = [
  {
    nome: 'Ana Souza',
    login: 'ana.souza',
    senha: '123456'
  },
  {
    nome: 'Carlos Lima',
    login: 'carlos.lima',
    senha: 'senhaSegura'
  }
];

const popular = async () => {
  try {
    await connectDB();
    await Usuario.deleteMany(); // Limpa antes
    await Usuario.insertMany(usuarios);
    console.log('Usuários inseridos com sucesso!');
    process.exit(0);
  } catch (err) {
    console.error('Erro ao inserir usuários:', err);
    process.exit(1);
  }
};

popular();
