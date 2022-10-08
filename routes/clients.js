const router =require ('express').Router();
const Clients=require ('../models/client');
// const addMonths = require('date-fns/addMonths');
// const fs = require('fs-extra');
// const format = require('date-fns/format');
const cron =require ('node-cron')


//Envia la lista de clientes con las compras y pagos q ha hecho
router.get('/GetClients',async(req,res)=>{
    const Response=await Clients.find()
    if(Response){
        res.json({
            error:false,
            data: Response
        })
    }else{
        res.json({
            error:true,
            mensaje: '005'
        })
    }
})

router.post('/NewClient',async(req,res)=>{
    
    if(Response){
        res.json({
            error:false,
            data: Response
        })
    }else{
        res.json({
            error:true,
            mensaje: 'NO SE ENCUENTRAN Clientes'
        })
    }
})


module.exports = router;