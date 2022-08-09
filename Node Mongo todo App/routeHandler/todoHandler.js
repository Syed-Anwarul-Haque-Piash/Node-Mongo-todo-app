const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();
const todoSchema=require('../schemas/todoSchema');
const Course=new mongoose.model("Course",todoSchema);

//get all the todos
router.get('/',(req,res)=>{
    Course.find({status: 'active'},(err,data)=>{
        if(err){
            res.status(500).json({
                err:"There is an server side error"
            })
        }
        else{
            res.status(200).json({
                result:data,
                message:"Get Course successfully"
            });
        }
    })
})
//get a todo by ID
router.get('/:id',(req,res)=>{
    Course.find({_id:req.params.id},(err,data)=>{
        if(err){
            res.status(500).json({
                err:"There is an server side error"
            })
        }else{
            res.status(200).json({
                result:data
            });
        }
    })
});

//post a todo
router.post('/',(req,res)=>{
    const newCourse=new Course(req.body);
    newCourse.save((err)=>{
        if(err){
            res.status(500).json({
                error:"There is an server side error"
            })
        }
        else{
            res.status(200).json({
                message:'Course saved successfully'
            })
        }
    });
});

//post multiple todo
router.post('/all',(req,res)=>{
    Course.insertMany(req.body,(err)=>{
        if(err){
            res.status(500).json({
                error:"There is an server side error"
            })
        }
        else{
            res.status(200).json({
                message:'Course saved successfully'
            })
        }
    });
});

//put a todo bu ID
router.put('/:id',(req,res)=>{
    Course.updateOne({_id:req.params.id},{
        $set:{
            status:"active",
            title:req.body.title
        }
    },(err)=>{
        if(err){
            res.status(500).json({
                err:"There is an server side error."
            });
        }else{
            res.status(200).json({
                message:"Updated successfully"
            })
        }
    })
});

//delete a todo by ID

router.delete('/:id',(req,res)=>{
    Course.deleteOne({_id:req.params.id},(err)=>{
        if(err){
            res.status(500).json({
                err:"There is an server side error."
            })
        }
        else{
            res.status(200).json({
                message:"Deleted successfully"
            })
        }
    })
});

module.exports=router;