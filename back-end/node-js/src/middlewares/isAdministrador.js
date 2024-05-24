import jwt from "jsonwebtoken"


export const  decodeToken = async(req,res,next) =>{
    try {
        const token = req.headers["token"]
        const llave = process.env.AUTH_SECRET
        jwt.verify(token, llave,(err, decode) =>{
            if(err){
                console.error(err)
                return
            }
            console.log("", decode.user.rol_nombre)
            if(decode.user.rol_nombre === "Administrador"){
                next()
            }
             else{
                res.status(403).json({menseje: "No tienes permiso para esta acción"})
             }
        })
    } catch (error) {
    console.error(error)
    }
}


export const adminAndInstructor = async (req, res, next)=>{
    try {
        const token = req.headers["token"]
        const llave = process.env.AUTH_SECRET
        jwt.verify(token, llave,(err, decode) =>{
            if(err){
                console.error(err)
                return
            }
            const adminOrInstru = decode.user.rol_nombre
            
            if( adminOrInstru === "Administrador" || adminOrInstru === "Instructor"){
                next()
            }
             else{
                res.status(403).json({menseje: "No tienes permiso para esta acción"})
             }
        })
    } catch (error) {
    console.error(error)
    }
}