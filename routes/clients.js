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
    const cliente= new Clients();
    cliente.name=req.body.data.name;
    cliente.lastname=req.body.data.lastname;
    cliente.cellphone=req.body.data.cellphone;
    cliente.email=req.body.data.email;
    cliente.buys=req.body.data.buys;
    cliente.pays=req.body.data.pays;
    try {
        cliente.save();
        res.json({
            error: false,
            mensaje: "007" //DATO ALMACENADO CORRECTAMENTE
        })
    }
    catch (error) {
        res.json({
            error: true,
            mensaje: "008", //ERROR AL ALMACENAR DATO
            message: error
        })
    }
})

router.post('/AddBuy/:id',async(req,res)=>{
    const id=req.params.id
    const cliente= await Clients.findOne({_id:id});

    // cliente.name=req.body.data.name;
    // cliente.lastname=req.body.data.lastname;
    // cliente.cellphone=req.body.data.cellphone;
    // cliente.email=req.body.data.email;
    cliente.buys.push(req.body.data.buys);
    cliente.pays.push(req.body.data.pays);
    try {
         cliente.save();
         res.json({
             error: false,
             mensaje: "007" //DATO ALMACENADO CORRECTAMENTE
         })
     }
     catch (error) {
         res.json({
             error: true,
             mensaje: "008", //ERROR AL ALMACENAR DATO
             message: error
         })
     }
})
module.exports = router;


// EJEMPLO DE JSON RECIBIDO PARA NEW CLIENT
// {"data":{
//     "name":"prueba1",
//     "lastname":"probando",
//     "cellphone":"34343434",
//     "email":"correo@gmail.com",
//     "buys":[
//       {"subtotal":"400",
//         "fecha":"15 dic",
//         "productos":
//             [{  "cantidad":"3",
//                 "detalles":"escobillas",
//                 "preciounitario":"100"
//               },
//               { "cantidad":"1",
//                 "detalles":"escor",
//                 "preciounitario":"100"
//             }]
//       },
//       {"subtotal":"1400",
//         "fecha":"10 dic",
//         "productos":[
//           {"cantidad":"2",
//             "detalles":"zapatillas",
//             "preciounitario":"100"
//           },
//           {"cantidad":"1",
//             "detalles":"escoba",
//             "preciounitario":"1200"}
//           ]
//       },
//       {"subtotal":"400",
//         "fecha":"5 dic",
//         "productos":[
//           {"cantidad":"1",
//             "detalles":"lastre",
//             "preciounitario":"400"
//           }]
//       }
//       ],
//     "pays":[
//       {
//         "fecha":"15 dic",
//         "entrega":"1500"
//       },
//       {        
//         "fecha":"7 dic",
//         "entrega":"300"
//       }
//       ]
// }
// }