const express = require('express');
const router = express.Router();
const Roadmap = require('../models/Roadmap');
const User = require('../models/Usuario');

// Criar roadmap
router.post('/', async (req, res) => {
  try {
    const { autor } = req.body;

    const autorExiste = await User.findById(autor);
    if (!autorExiste) {
      return res.status(400).json({ error: 'Autor não encontrado.' });
    }

    const roadmap = new Roadmap(req.body);
    await roadmap.save();
    res.status(201).json(roadmap);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Listar todos os roadmaps
router.get('/', async (req, res) => {
  try {
    const roadmaps = await Roadmap.find();
    res.json(roadmaps);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar roadmaps.' });
  }
});

// Listar todos os roadmaps de um autor especifico
router.get('/autor/:autorId', async (req, res) => {
  try {
    const { autorId } = req.params;
    const roadmaps = await Roadmap.find({ autor: autorId });
    res.json(roadmaps);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar roadmaps do autor.' });
  }
});

// Buscar roadmap por ID
router.get('/:id', async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);
    if (!roadmap) return res.status(404).json({ error: 'Roadmap não encontrado.' });
    res.json(roadmap);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar roadmap.' });
  }
});

// Atualizar roadmap
router.put('/:id', async (req, res) => {
  try {
    const roadmap = await Roadmap.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!roadmap) return res.status(404).json({ error: 'Roadmap não encontrado.' });
    res.json(roadmap);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar roadmap.' });
  }
});

// Deleta roadmap
router.delete('/:id', async (req, res) => {
  try {
    const roadmap = await Roadmap.findByIdAndDelete(req.params.id);
    if (!roadmap) return res.status(404).json({ error: 'Roadmap não encontrado.' });
    res.json({ mensagem: 'Roadmap removido com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar roadmap.' });
  }
});

module.exports = router;
