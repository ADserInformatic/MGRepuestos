const router =require ('express').Router();
const Clients=require ('../models/client');
// const addMonths = require('date-fns/addMonths');
// const fs = require('fs-extra');
// const format = require('date-fns/format');
const cron =require ('node-cron')//para programar tarea
var request = require("request");//para enviar mensajes de wsp

const job = cron.schedule('0 10 3 * *', async () => {//TAREA A LAS 10 EN PUNTO DEL DIA 3 DE CADA MES DURANTE EL AÑO
    const clientes = await Clients.find()
    for (let i = 0; i < clientes.length; i++) {//CALCULO DEUDA POR CADA CLIENTE
        const TotalDeuda = 0;
        const Entregas =0;
        for (let x =0; x<clientes.buys.length;x++){//SUMO EL TOTAL DE LA DEUDA
            TotalDeuda+=clientes.buys[x].subtotal;
        }
        for (let y =0; y<clientes.pays.length;y++){//SUMO EL TOTAL DE ENTREGAS
            Entregas+=clientes.pays[y].entrega;
        }
        if(TotalDeuda-Entregas>0){ //CALCULO SI TIENE UNA DEUDA


            var options = {
                method: 'POST',
                url: 'https://api.ultramsg.com/instance1150/messages/chat',
                headers: {'content-type': 'application/x-www-form-urlencoded'},
                form: {
                  token: 'Instance_token',
                  to: '3436222320',
                  body: 'WhatsApp API on UltraMsg.com works good',
                  priority: '10',
                  referenceId: ''
                }
              };
              request(options, function (error, response, body) {
                if (error) throw new Error(error);
              
                console.log(body);
              });


        }        
    }
}, {
    scheduled: true,
    timezone: "America/Argentina/Buenos_Aires"
});
job.start()


//prueba enviar mensaje
router.post('/send',async(req,res)=>{
    var options = {
        method: 'POST',
        url: 'https://api.ultramsg.com/instance1150/messages/chat',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        form: {
          token: 'Instance_token',
          to: '3436222320',
          body: 'WhatsApp API on UltraMsg.com works good',
          priority: '10',
          referenceId: ''
        }
      };
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.json({
            err:true,
            mensaje: body})
        console.log(body);
      });
})
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
    cliente.deuda=0;
   

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
    
    if (cliente){
        cliente.buys=[];
        cliente.pays=[];

    if(req.body.data.pays){
        cliente.pays.push(req.body.data.pays);}
    if(cliente.buys){cliente.buys.push(req.body.data.buys);}
    
    
    let TotalBuys=0;
    let TotalPays=0;
    if(cliente.buys){
        for(let x=0;x<cliente.buys.length;x++){TotalBuys+=cliente.buys[x].subtotal}
    }
    if(cliente.pays){
        for(let x=0;x<cliente.pays.length;x++){TotalPays+=cliente.pays[x].entrega}
        
    }
    console.log(TotalBuys)
    console.log(TotalPays)
    cliente.deuda=TotalBuys-TotalPays;
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
    }
})


router.post('/AddPay/:id',async(req,res)=>{
    const id=req.params.id
    const cliente= await Clients.findOne({_id:id});
    if(cliente){
    cliente.pays.push(req.body.data);
    let TotalBuys=0;
    let TotalPays=0;
    if(cliente.buys){
        for(let x=0;x<cliente.buys.length;x++){TotalBuys+=cliente.buys[x].subtotal}
    }
    if(cliente.pays){
        for(let x=0;x<cliente.pays.length;x++){TotalPays+=cliente.pays[x].entrega}
        
    }
    console.log(TotalBuys)
    console.log(TotalPays)
    cliente.deuda=TotalBuys-TotalPays;
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
    }
    res.json({error:true, mensaje: "codigo",message: "no encontro cliente"})
}
)
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