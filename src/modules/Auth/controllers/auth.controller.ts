import {Application, NextFunction, Request, Response} from "express";
import {Get, Post} from "../../Common/decorators/methods";
import {CommonController} from "../../Common/controllers/common.controller";
import jwt from "jsonwebtoken";
import {Password} from "../../Common/services/password.service";
import User from "../../User/services/user.model";
const jwtSecret: string = process.env.JWT_SECRET || "111";
const tokenExpirationInSeconds = 36000;
export class AuthController extends CommonController{
    constructor(app: Application) {
        super(app);
    }

    @Post('/login')
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const body:any = req.body;
            const email = body?.email;
            const password = body?.password;
            if(!email||!password){
                return res.status(404).json({error:'Email and password required',success:false});
            }
            const user = await User.findOne({where:{email}});
            if(!user){
                return res.status(404).json({error:'User not found',success:false});
            }
            const isPasswordMatch = await Password.compare(user.password, password);

            if (!isPasswordMatch) {
                return res.status(401).json({error:'Invalid Password',success:false});
            }
            const token = jwt.sign(req.body, jwtSecret, {
                expiresIn: tokenExpirationInSeconds,
            });

            return res.status(200).json({
                success: true,
                token,
            });
        } catch (e) {
            next(e);
        }

    }
}