require("dotenv").config();
const express = require('express');

const app = express();

// parse various different custom JSON types as JSON
app.use(express.json());
// Using routers to handle requests
app.use('/',require('./routes/transactionRoutes'));

app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);
  
    res.status(500).json({
      message: "Something went rely wrong",
    });
  });


let PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));