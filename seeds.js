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


const aryaman = new User({
    username:'Aryaman Mishra',
    email:'aryaman.m09@gmail.com',
    password:'my_password'
})

aryaman.save().then(() => {
    console.log('user saved')
})
.catch(err => {
    console.log('Error occured', err)
})