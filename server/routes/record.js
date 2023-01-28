const express = require("express");
const txnRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
//const app = express();

// recordRoutes.get('/', (req, res) => {
//     res.send('hello world')
//   })


//READ
txnRoutes.route("/transactions").get(function (req, res) {
    const dbConnect = dbo.getDb();
  
    dbConnect
      .collection("transactions")
      .find({}).limit(50)
      .toArray(function (err, result) {
        if (err) {
          res.status(400).send("Error fetching listings!");
       } else {
            res.json(result);
        }
      });
  });

//CREATE
txnRoutes.route("/transactions").post(function (req, res) {
  const dbConnect = dbo.getDb();
  const txnDocument = {
    //transaction: req.body,
    date: req.body.date,
    type: req.body.type,
    category: req.body.category,
    description: req.body.description,
    amount: req.body.amount
  };

  dbConnect
    .collection("transactions")
    .insertOne(txnDocument, function (err, result) {
      if (err) {
        res.status(400).send("Error inserting matches!");
      } else {
        console.log(`Added a new match with id ${result.insertedId}`);
        res.status(204).send();
      }
    });
  });

//   //UPDATE
//   // This section will help you update a document by id.
// recordRoutes.route("/listings/updateLike").post(function (req, res) {
//     const dbConnect = dbo.getDb();
//     const listingQuery = { _id: req.body.id };
//     const updates = {
//       $inc: {
//         likes: 1
//       }
//     };
  
//     dbConnect
//       .collection("listingsAndReviews")
//       .updateOne(listingQuery, updates, function (err, _result) {
//         if (err) {
//           res.status(400).send(`Error updating likes on listing with id ${listingQuery.id}!`);
//         } else {
//           console.log("1 document updated");
//         }
//       });
//   });

  //DELETE
  txnRoutes.route("/transactions/delete/:id").delete((req, res) => {
      const dbConnect = dbo.getDb();
      const txnQuery = { _id: ObjectId(req.params.id) };
      console.log(txnQuery,req.params.id)
      dbConnect
      .collection("transactions")
      .deleteOne(txnQuery, function (err, _result) {
          if (err) {
          res.status(400).send(`Error deleting listing with id ${txnQuery._id}!`);
          } else {
          console.log(`1 document deleted, ${txnQuery._id}`);
          }
      });
  });

module.exports = txnRoutes;



//app.listen(port, () => console.log("API STARTED"));