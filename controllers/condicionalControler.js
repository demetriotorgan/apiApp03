const estoqueModel = require('../models/estoqueModel')
const condicionalModel = require('../models/condicionalModel')

module.exports.getCondiconais = async(req,res)=>{
    const condicionais = await condicionalModel.find();
    res.send(condicionais);
}

module.exports.saveCondicional = async(req,res)=>{
    const {cliente, data, produtos} = req.body;
        condicionalModel
            .create({cliente, data, produtos})
            .then((data)=>{
                console.log('Condiconal cadastrado com sucesso')
                console.log(data)
                res.send(data);
            })
}