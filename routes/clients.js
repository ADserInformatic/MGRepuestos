const router =require ('express').Router();
const Clients=require ('../models/client');
// const addMonths = require('date-fns/addMonths');
// const fs = require('fs-extra');
// const format = require('date-fns/format');
const cron =require ('node-cron')//para programar tarea


// Find your account sid and auth token in your Twilio account Console.
//var client = new twilio('MG831f19fb057c965a23e4788103079286', '[Redacted]');
const accountSid = 'ACb3b1b7a3bf7538f5908756d7dcb42d20'; 
//const authToken = '84bf2bb58b9d198fde3de0b28c3ab989'; 
const authToken = '627a72a6f88c8f8d3cf00bf0c15ec4ec'
const client = require('twilio')(accountSid, authToken); 


router.post('/senda', (req, res)=>{
    
 
        client.messages 
            .create({ 
                body: 'Beleeeeeeeen', 
                from: 'whatsapp:+14155238886',       
                to: 'whatsapp:+5493436222320' 
            }) 
            .then(res.json('ok')) 
            .done();
})

const job = cron.schedule('0 10 3 * *', async () => {//TAREA A LAS 10 EN PUNTO DEL DIA 3 DE CADA MES DURANTE EL AÑO
    const clientes = await Clients.find()
    for (let i = 0; i < clientes.length; i++) {//CALCULO DEUDA POR CADA CLIENTE
        if(clientes[i].deuda>0){ //CALCULO SI TIENE UNA DEUDA
            client.messages 
            .create({ 
            body: `Buenos días ${clientes[i].name}, nos comunicamos de María Grande Repuestos para  recordarle que Ud. posee una saldo de $${clientes[i].deuda}, por favor comunicarse a la brevedad.`, 
            from: 'whatsapp:+14155238886',       
            to: `whatsapp: ${+clientes[i].cellphone} `
            }) 
            .then(res.json('ok')) 
            .done();
        }        
    }
}, {
    scheduled: true,
    timezone: "America/Argentina/Buenos_Aires"
});
job.start()


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
    cliente.buys=[];
    cliente.pays=[];
   

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

    if(cliente.buys){
        cliente.buys.push(req.body.data.buys);
        cliente.deuda+=req.body.data.buys.subtotal;
    }    
    
    if(req.body.data.pays){
        cliente.pays.push(req.body.data.pays);
        cliente.deuda-=req.body.data.pays.entrega;
        
    }

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
    console.log(req.body)

    if(!cliente){return res.json({error:true, mensaje: "codigo",message: "no encontro cliente"})}
    cliente.pays.push(req.body.data);

    cliente.deuda-=req.body.data.entrega;
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