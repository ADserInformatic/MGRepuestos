const router=require('express').Router();
const user=require('../models/login');

router.get('/login',async(req,res)=>{
    const Response=await user.find()
    if(Response){
        res.json({
            error:false,
            data: Response
        })
    }else{
        res.json({
            error:true,
            mensaje: 'NO SE ENCUENTRAN USUARIOS'
        })
    }
})