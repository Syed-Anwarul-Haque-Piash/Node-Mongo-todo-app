const express=require('express');
const mongoose=require('mongoose');
const todoHandler = require('./routeHandler/todoHandler')
const app=express();
app.use(express.json());

//database connection
mongoose.connect('mongodb://localhost/courses',{useNewUrlParser:true},{useUnifiedTopology:true})
.then(()=>console.log('Connection Successfully established'))
.catch(err=>console.log(err))
app.use('/todo',todoHandler);

function errorHandler(err, req, res, next) {
    if(res.headersSent){
        return next(err)
    }
    res.status(500).json({error: err})
}



app.listen(3000,()=>{
    console.log("I am from 3000 port");
})