const express = require("express");

const researchRecordRoutes = express.Router();

const dbo = require("../config/dbcon");
dbo.connectToServer("Research", function (err) {
  if (err) console.log(err);
});

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1403424",
  key: "2cad138fbc7c142d3cfd",
  secret: "17e759d678d73053a48b",
  cluster: "ap2",
  useTLS: true,
});

researchRecordRoutes.route("/chat/:id").post(function (req, res) {
  let db_connect = dbo.getDb("Research");
  let obj = {
    Message: req.body.Message,
    SendBy: req.body.SendBy,
  };
  db_connect.collection(req.params.id).insertOne(obj, function (err, result) {
    if (err) {
      console.log(err);
    }
  });
  pusher.trigger(req.params.id, "new_message", obj);
});

researchRecordRoutes.route("/chat/:id").get(function (req, res) {
  let db_connect = dbo.getDb("Research");
  db_connect
    .collection(req.params.id)
    .find()
    .sort({ _id: 1 })
    .toArray(function (err, result) {
      if (err) {
        console.log(err);
      }
      res.json(result);
    });
});

module.exports = researchRecordRoutes;
