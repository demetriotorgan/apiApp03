const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routes')

require('dotenv').config();

const app = express();
const PORT = process.env.port || 5000;
app.use(express.json());
app.use(cors({
    origin:'https://front-app03.vercel.app',    
}));
app.use((req,res, next)=>{
    res.header('Access-Control-Allow-Origin', 'https://front-app03.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    next();    
  });

mongoose
    .connect(process.env.MONGODB_URL)
    .then(()=>console.log('Conectado ao mongoDB'))
    .catch((err)=>console.log(err));

app.use(routes);
app.listen(PORT, ()=>console.log(`Rodando na porta ${PORT}`));