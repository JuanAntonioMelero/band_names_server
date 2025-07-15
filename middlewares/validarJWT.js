const jwt = require('jsonwebtoken');

const validarJWT=(req,res=response,next)=>{

    //Leer token
    const token= req.header('x-token');
try {
    if(!token){
            res.json({
                ok:false,
                msg:'no existe ningun token'
                }
            )
    }
    const {uid}=jwt.verify(token, process.env.JWT_KEY);
    req.uid=uid;
    //req.hola='hola';

    next();
} catch (error) {
     return res.status(500).json({
        ok:false,
        msg:' token no valido'
    })
}
  

  
};

module.exports={validarJWT}