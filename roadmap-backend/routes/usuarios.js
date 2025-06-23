const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

router.post('/sync', async (req, res) => {
  const { nome, login, tipo = 'professor' } = req.body;

  if (!nome || !login) {
    return res.status(400).json({ error: 'Nome e login são obrigatórios.' });
  }

  try {
    let usuario = await Usuario.findOne({ login });

    if (usuario) {
      return res.status(200).json(usuario);
    }

    usuario = new Usuario({
      nome,
      login,
      senha: '', 
      tipo,
    });

    await usuario.save();
    return res.status(201).json(usuario);
  } catch (error) {
    console.error('Erro ao sincronizar usuário:', error);
    return res.status(500).json({ error: 'Erro no servidor.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado.' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuário.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado.' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar usuário.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado.' });
    res.json({ mensagem: 'Usuário removido com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar usuário.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
