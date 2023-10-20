import { borrowerModel } from "../../../DB/Models/borrower.model.js"
import bcrypt from 'bcrypt'
import { generateToken } from "../../utils/tokenFunctions.js"

//============================= Registration API =============================
/**
 * get data from user (name , email , password)
 * check if email already exist
 * hash password
 * create new borrower
 * return success message
 */
export const registerController = async(req,res,next)=>{
    const { name ,email , password } = req.body
    const hashedPassword = bcrypt.hashSync(password,8)
    const isEmailExist = await borrowerModel.findOne({
        where: {
            email
          }
    })
    if(isEmailExist){
        return next(new Error('email already exist',{cause:400}))
    }
    const borrower = await borrowerModel.create({name ,email , password:hashedPassword })
    if(!borrower){
        return next(new Error('register faild',{cause:400}))    
    }
    res.status(200).json({message:'register done, please try to login',borrower})

}


//============================= Login API =============================
/**
 * get data from user (email , password)
 * check if email exist
 * check if password correct
 * generate token
 * return success message with token
 */
export const loginController = async(req,res,next)=>{
    const{ email , password } = req.body
    const isEmailExist = await borrowerModel.findOne({
        where: {
            email
        }
    })
    if(!isEmailExist?.dataValues){
        return next(new Error('in-valid login credentials',{cause:400}))
    }

    const isPasswordCorrect = bcrypt.compareSync(password ,isEmailExist.dataValues.password)
    if(!isPasswordCorrect){
        return next(new Error('in-valid login credentials',{cause:400}))
    }
    const token = generateToken({
        payload:{
            email,
            id:isEmailExist.id,
            isLoggedIn:true
        },
        signature:process.env.DEFAULT_SIGNATURE,
    })
    res.status(200).json({message:'login done',token})
}


