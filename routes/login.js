const router=require('express').Router();
const login=require('../models/login');

router.post('/login',async(req,res)=>{

    const Response=await login.findOne()
     if(Response.user===req.body.data.user){
         if(Response.password===req.body.data.password){
             res.json({
                 error:false,
                 mensaje: "000", //Acceso correcto
                 message: "Acceso correcto",
                 data: Response._id
             })
      } else {
          res.json({
              error:true,
                 mensaje: '002', //Password  incorrecto
                 message: "Password  incorrecto"
          })
         }
  }else{
      res.json({
             error:true,
             mensaje: '001', //nombre de usuario incorrecto
             message: "nombre de usuario incorrecto"
      })
  }
})
router.post('/ChangePassword',async(req,res)=>{
    const Response=await login.findOne()
    if(Response.user===req.body.data.user){
        if(Response.password===req.body.data.password){


            try {
                Response.password=req.body.data.newpassword;
                Response.save();
                res.json({
                    error: false,
                    mensaje: "003", //ACTUALIZACION DE CONTRASEÑA CORRECTA
                    message: "Actualizacion correcta",
                    data: ""
                })
            }
            catch (error) {
                res.json({
                    error: true,
                    mensaje: "004", //ERROR AL ACTUALIZAR CONTRASEÑA
                    message: "ERROR AL ACTUALIZAR CONTRASEÑA"
                })
            }
        } else {
            res.json({
                error:true,
                mensaje: '002', //Password  incorrecto
                message: "Password  incorrecto"
            })
        }
    }else{
        res.json({
            error:true,
            mensaje: '001', //nombre de usuario incorrecto
            message: "nombre de usuario incorrecto"
        })
    }
})

module.exports=router;