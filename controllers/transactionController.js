const Transaction = require('../models/transaction');

exports.getTransactionById = async (req, res, next) => {
    try{
        const [transaction,_] = await Transaction.getTransactionById(req.params.id);
        console.log(transaction);
        res.status(200).json(transaction[0]);
    }catch(error){
        next(error);
    }
}

exports.createTransactionWithId = async (req, res, next) => {
    let {amount, type, parent_id} = req.body;
    let transaction = new Transaction(req.params.id, amount, type, parent_id == undefined? null: parent_id);

    transaction = await transaction.save().then().catch(err =>{ 
        console.log('ID is already in use. Please use a unqiue ID!')
        next(err);});
    // In a real world scenario, ID will have to be unique. If we have an object present on the same ID, we are not over-writing it.

    res.send('ok');
}

exports.getTransactionIdsByType = async (req, res, next) => {
    try{
        const [transaction,_] = await Transaction.getTransactionIdsByType(req.params.type);
        
        let finalArray = transaction.map(function (obj) {return obj.id;});

        res.status(200).json(finalArray);
    }catch(error){
        next(error);
    }
}

exports.getSumById = async (req, res, next) => {
    try{
        const [transaction,_] = await Transaction.getTransitiveSumById(req.params.id);
        
        transaction[0].sum = transaction[0].sum == null? 0 : transaction[0].sum;
        
        res.status(200).json(transaction[0].sum);
    }catch(error){
        next(error);
    }
}