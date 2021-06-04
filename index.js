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


app.post('/users/signup', async(req,res) => {
    try {
        const newUser = new User(req.body)
        const check = await User.find({username:newUser.username, email:newUser.email, password:newUser.password})
        console.log(check)
        if (JSON.stringify(check) !== '[]') {
            console.log('Same User')
            res.redirect(`/users/${check[0]._id}`) 
        }
        else {
            newUser.save().then(() => {
                console.log('new user logged in')
            })
            .catch(err => {
                console.log('error')
                console.log(err)
            })
            res.redirect(`/users/${newUser._id}`)
        }
    }
    catch {
        console.log('Sign Up error!!!!')
    }
})  

app.get('/users/login', (req,res) => {
    res.render('login')
})

app.post('/users/login', async(req,res) => {
    try {
        const user = new User(req.body)
        const check = await User.find({username:user.username, email:user.email, password:user.password})
        if (JSON.stringify(check) !== '[]') {
            res.redirect(`/users/${check[0]._id}`)
        }
        else {
            res.send('User by these credentials does not exist please sign up')
        }
    }
    catch {
        console.log('error')
    }
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