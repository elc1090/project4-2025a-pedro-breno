const mongoose = require('mongoose');

const RoadmapSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario', 
    required: true
  },
  descricao: {
    type: String
  },
  passos: [
    {
      titulo: String,
      descricao: String,
      concluido: {
        type: Boolean,
        default: false
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Roadmap', RoadmapSchema);
