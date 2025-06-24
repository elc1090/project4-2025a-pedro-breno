require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const aiRoutes = require('./routes/generate-roadmap');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/usuarios', require('./routes/usuarios'));
app.use('/api/auth', authRoutes);
app.use('/roadmaps', require('./routes/roadmaps'));
app.use('/api/generate-roadmap', aiRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
