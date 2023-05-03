const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const ejs = require("ejs");
const cors = require("cors");
const { indexController } = require("./controllers/indexController");

require("dotenv").config();

const DB =
  "mongodb+srv://userID: password@cluster0.zli3ysf.mongodb.net/BankingSystem?retryWrites=true&w=majority";

const connection = mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`Connection successful`);
  })
  .catch((err) => console.log(err + `No connection`));

const {
  customerDisplayController,
} = require("./controllers/customerDisplayController");
const {
  customerAddController,
} = require("./controllers/customerAddController");
const { addFundsController } = require("./controllers/addFundsController");
const { withdrawController } = require("./controllers/withdrawController");
const {
  displayTransactionsController,
} = require("./controllers/displayTransactionsController");
const {
  transferFundsController,
} = require("./controllers/transferFundsController");

app.use(cors());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

connection
  .then((response) => {
    console.log("Database has been connected!");
    app.listen(PORT, () => {
      console.log(`Server running on Port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", indexController);
app.get("/customers/:id", customerDisplayController);
app.get("/customers/:id/transactions", displayTransactionsController);
app.post("/customers/:id/addFunds", addFundsController);
app.post("/customers/:id/withdrawFunds", withdrawController);

app.post("/customers/:id/transferFunds", transferFundsController);

app.post("/customers", customerAddController);
