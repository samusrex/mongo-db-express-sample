const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var ObjectId = require('mongodb').ObjectID;

const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://samusrex:net143256@cluster0-35jlb.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(uri, (err, client) => {
    if (err) return console.log(err)
    db = client.db('crud-node') // coloque o nome do seu DB

    app.listen(3000, () => {
        console.log('Server running on port 3000')
    })
})

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/', (req, res) => {
    var cursor = db.collection('task').find()
})

app.get('/show', (req, res) => {
    db.collection('task').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', { data: results })

    })
})

app.post('/show', (req, res) => {
    db.collection('task').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('Salvo no Banco de Dados')
        res.redirect('/show')
    })
})
app.route('/edit/:id')
.get((req,res)=>{
    var id = req.params.id

    db.collection('task').find(ObjectId(id)).toArray((err,result)=>{
        if(err) return res.send(err)
        res.render('edit.ejs',{data:result})
    })
})
.post((req,res)=>{
    var id =   req.params.id
    var name = req.body.name
    var surname = req.body.surname

    db.collection('task').updateOne({_id:ObjectId(id)},{
        $set   :{
            name: name,
            surname : surname
        }
    })
})