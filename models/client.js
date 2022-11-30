const {boolean}=require ('@hapi/joi');
const mongoose =require ('mongoose');

const clientSchema= mongoose.Schema({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    cellphone: {type: String, required: true},
    deuda:{type: String, required: true},
    buys:{type: Array, default: []},
    pays:{type: Array, default: []}
})
module.exports=mongoose.model('client',clientSchema);



// buys=[
// {   subtotal:"",
//     fecha:"",
//     productos:[{    
//         cantidad:"",
//         detalles:"",
//         preciounitario:""}]
// }
// ]

// pays=[
//     {   fecha:"",
//         entrega:""
//     }
// ]