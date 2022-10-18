const express = require('express');
const mongoose = require ('mongoose');
const {v4: uuidv4}  = require('uuid')
const cors=require('cors');

const app = express();
const corsOptions={
    origin:'*',//reemplazar con dominio, donde esta el origen del servidor del frontend
    optionsSuccessStatus:200//para algunos navegadores
}
app.use(cors(corsOptions));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.raw());
app.use(express.static(__dirname + '/app/dist/app'))

const uri=`mongodb+srv://mariagranderepuestos:cuentaCuenta@cluster0.hjawbpo.mongodb.net/Cluster0?retryWrites=true&w=majority`
const option={ useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(uri,{
  useUnifiedTopology: true,
  useNewUrlParser: true
 })
 .then(() => console.log('Base de datos conectada'))
 .catch(e => console.log('error db:', e))

 const Clients =require ('./routes/clients');
 app.use('/api/client',Clients);
 const Login =require ('./routes/login');
 app.use('/api/login',Login);


//  app.get('/',(req,res)=>{
//      res.json({
//          estado:true,
//          mensaje: 'functiona prueba para mostrar!'
//     })
//  });

 const PORT=process.env.PORT || 3001;
app.listen(PORT, ()=>{
  console.log(`servidor andando en: ${PORT}`)})