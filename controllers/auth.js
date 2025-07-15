const { response } = require("express")

const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../jwt/jwt");

const crearUsuario=async  (req, res=response)=>{
   
    const {email,password}=req.body;

    try {
        const existeEmail= await Usuario.findOne({email:email});
    if(existeEmail){
        return res.status(400).json(
        {
            ok:false,
            msg: 'el email ya esta registrado'
        })
    }

    const usuario = new Usuario( req.body);
  
 // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );



    await usuario.save();

    //generar JSON WEB TOKEN (JWT)
   
    const token = await generarJWT( usuario.id );
     res.json({
        ok:true,
        //msg: usuario
        usuario,
        token
    })
    
} catch (error) {
    console.log(error);
    res.status(500).json(
        {
            ok:false,
            msg: 'Hable con el administrador'
        }
    );
}
   
}

const login =async (req,res=response)=>{

 const {email,password}=req.body;
 try {
    const usuarioDB= await Usuario.findOne({email:email});

  if(!usuarioDB){
        return res.status(400).json(
        {
            ok:false,
            msg: 'el email no esta registrado'
        })
    }

 // Validar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
       if (!validPassword){
          return res.status(400).json(
        {
            ok:false,
            msg: 'no coinciden email y contraseña'
        })
       } 

       //Generar el JWT
        const token = await generarJWT( usuarioDB.id );

        res.json({
        ok:true,
        msg: 'login correcto',
        usuarioDB,
        token        
    })  

 } catch (error) {
     console.log(error);
    res.status(500).json(
        {
            ok:false,
            msg: 'Hable con el administrador'
        }
    );
 }

}

const renewToken = async (req,res=response)=>{
//recibimos el uid del usuario    
const uid= req.uid;
//obtenemos el usuario de la bd con ese id
 const usuarioDB= await Usuario.findOne({_id:uid});
//generamos un nuevo token
 const token = await generarJWT( usuarioDB.id );

    res.json({
        ok:true,
        msg:'llegamos a renova token',
        uid:req.uid,
        usuarioDB,
        token
        //msg2:req.hola
    })
}
module.exports = { crearUsuario,login,renewToken}