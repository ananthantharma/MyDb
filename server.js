const express = require('express');
const bodyParser= require('body-parser')
const app = express();


// ========================
// Link to Database
// ========================
const MongoClient = require('mongodb').MongoClient
const connectionString = "mongodb+srv://admin:Password123@cluster0.9okfw.mongodb.net/?retryWrites=true&w=majority"


MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {

    console.log('Connected to Database')

    const db = client.db('contact-list')
    const contactCollection = db.collection('contacts')

// ========================
// Middlewares
// ========================
    
    app.set('view engine', 'ejs')
    app.use(express.static('public'))
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

// ========================
// Routes - get
// ========================
    function displayHomePage(){
        app.get('/', (req, res) => {
        //res.sendFile(__dirname + '/index.html')
        contactCollection.find().toArray()
        .then(results => {
        res.render('index.ejs', {contacts:results})
        })
      })
    }
    displayHomePage();

// ========================
// Routes - post or  update
// ========================
    app.post('/contacts', (req, res) => {
        contactCollection.insertOne(req.body)
        .then(result => {
            res.redirect('/')
            displayHomePage();
            console.log("submit clicked")

        })
        .catch(error => console.error(error))
    })

// ========================
// Routes - post or  create
// ========================    
    app.put('/contacts', (req, res) => {
        contactCollection.updateMany(
            { name: req.body.name },
            {
              $set: {
                message: req.body.name,
                message: req.body.message
              }
            },
            {
              upsert: true
            }
          )
          .then(result => {
            res.json('Success')
           })
          .catch(error => console.error(error))
      })
// ========================
// Routes - delete
// ========================  
      app.delete('/contacts',(req, res) => {
            contactCollection.deleteMany({})
        })

      app.delete('/contactsUpdate',(req, res) => {
            contactCollection.deleteOne(
                {name: req.body.name }
                )
            .then(result => {
            res.json('Success')
            })
            .catch(error => console.error(error))
            })


  })
  .catch(error => console.error(error))

// ========================
// Listen
// ========================
  
  app.listen(3000, function() {
    console.log('listening on 3000')
  })