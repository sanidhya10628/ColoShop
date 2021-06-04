const express = require('express')
const app = express()

const path = require('path')


const User = require('./models/user');


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ColoShop', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('CONNECTION CONFIRMED')
})
.catch(err => {
    console.log('Connection refused')
    console.log(err)
})

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'));


app.get('/', (req,res) => {
    res.render('index')
})


app.get('/users/signup', (req,res) => {
    res.render('signup')
})


app.post('/users/signup', (req,res) => {
    const newUser = new User(req.body)
    newUser.save().then(() => {
        console.log('User saved in database')
        res.redirect(`/users/${newUser._id}`)
    }).catch (err => {
        console.log('Error occured', err)
    })
    console.log(req.body)
})  


app.get('/users/:id', async(req,res) => {
    const id = req.params.id
    const user = await User.findById(id)
    const username = user.username
    res.render('userHome', {id,username})
})


app.get('/users/:id/profile', async(req,res) => {
    const id = req.params.id
    const user = await User.findById(id)
    res.render('userProfile', {user})
})
app.listen(4000, () => {
    console.log('Listening on port 4000')
})