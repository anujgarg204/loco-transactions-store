const db = require('../config/db');

class Transaction{

    constructor(id,amount,type,parent_id){
        this.id = id;
        this.amount = amount;
        this.type = type;
        this.parent_id= parent_id;
    }

    async save(){
        let sql = this.parent_id == null? `
        INSERT INTO loco(
            id,
            amount,
            type,
            parent_id
        )
        VALUES(
            '${this.id}',
            '${this.amount}',
            '${this.type}',
            NULL
        );
        `:`
        INSERT INTO loco(
            id,
            amount,
            type,
            parent_id
        )
        VALUES(
            '${this.id}',
            '${this.amount}',
            '${this.type}',
            '${this.parent_id}'
        );
        `

        var [transaction,_] = await db.execute(sql);
        return transaction;
        }

    static getTransactionById(id){
        let sqlGetById = `SELECT amount,type,parent_id FROM loco WHERE id = ${id};`
        return db.execute(sqlGetById);
    }

    static getTransactionIdsByType(type){
        let sqlGetIdsByType = `SELECT id FROM loco WHERE type = '${type}' group by id;`
        return  db.execute(sqlGetIdsByType);
    }

    static getTransitiveSumById(id){
        let sqlSum = `
        with recursive cte (id, amount, parent_id)
        as
        (
            select id,amount, parent_id from loco
            where id = '${id}'
            union all 
            SELECT loco.id, loco.amount, loco.parent_id
            FROM cte JOIN loco
              ON cte.id = loco.parent_id
        )
        select sum(amount) as sum from cte;`

       return db.execute(sqlSum);
    }
}

module.exports = Transaction;