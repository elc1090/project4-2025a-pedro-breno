const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/usuarios', require('./routes/usuarios'));
app.use('/roadmaps', require('./routes/roadmaps'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
