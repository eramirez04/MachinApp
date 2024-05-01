import bycrypt from "bcryptjs"

export const encriptarContra = async (password) =>{
    const contraEncriptada = await bycrypt.hash(password,10)
    return contraEncriptada
}

export const compare = async (texto, contraCriptada) =>{
    return await bycrypt.compare(texto, contraCriptada)
}
