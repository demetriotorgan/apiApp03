const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routes')

require('dotenv').config();

const app = express();
const PORT = process.env.port || 5000;
app.use(express.json());
app.use(cors({
    origin:'*',    
}));
app.use((req,res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    next();    
  });

mongoose
    .connect(process.env.MONGODB_URL)
    .then(()=>console.log('Conectado ao mongoDB'))
    .catch((err)=>console.log(err));
    
const db = mongoose.connection;
    db.on('error', ()=>console.error('Erro na conexão com o banco de dados'));
    db.once('open', ()=> console.log('Conectado ao Banco de Dados'));
    
app.get('/produtos/venda/conexao',(req,res)=>{
        if(db.readyState === 1){
            res.json({connected: true})
        }else{
            res.json({connected: false})
        }
    });

app.use(routes);
app.listen(PORT, ()=>console.log(`Rodando na porta ${PORT}`));