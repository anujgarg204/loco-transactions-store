const express = require("express");
const transactionController = require('../controllers/transactionController');
let router = express.Router();

// @route GET && POST - /transactions/

// PUT /transactionservice/transaction/$transaction_id Body:{ "amount":double,"type":string,"parent_id":long }
// Express 8.5.0 gives empty object on put body. Hence, using post for now.

// GET /transactionservice/transaction/$transaction_id Returns: {"amount":double,"type":string,"parent_id":long}
router.route('/transactionservice/transaction/:id')
    .get(transactionController.getTransactionById)
    .post(transactionController.createTransactionWithId);

// // GET /transactionservice/types/$type Returns: [long, long, ... ]
router.route('/transactionservice/types/:type')
    .get(transactionController.getTransactionIdsByType);

// // GET /transactionservice/sum/$transaction_id Returns: { "sum": double } A sum of all
// // transactions that are transitively linked by their parent_id to $transaction_id.( If A is parent of B
// // and C, and C is parent of D and E . sum(A) = B + C + D + E
router.route('/transactionservice/sum/:id')
    .get(transactionController.getSumById);

module.exports = router;