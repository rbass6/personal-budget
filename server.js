const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const budgetData = require('./budget-data.json')
const budgetModel = require("./models/budget_schema")
const cors = require('cors')
const port = 3000;
const url = "mongodb://localhost:27017/budget"

//app.use('/', express.static('public'))

mongoose.connect(url, {family: 4}).then(() => {
  const app = express();

  app.use(
    cors({
      allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
      exposedHeaders: ["authorization"], // you can change the headers
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false
    }), 
    bodyParser.json()
  )

  app.get('/hello', (req, res) => {
    res.send('Hello World!');
  });

  app.get('/budget', (req, res) => {
    res.json(budgetData);
  });

  app.get('/budgets', async (req, res) => {
    const budgets = await budgetModel.find()
    res.send(budgets)
  })

  app.post('/add-budget', async (req, res) => {
    const budget = new budgetModel({
      id: req.body.id,
      title: req.body.title,
      budget: req.body.budget,
      color: req.body.color
    })
    await budget.save()
    res.send(budget)
  })

  app.listen(port, () => {
    console.log(`Budget app listening at http://localhost:${port}`)
  })

})