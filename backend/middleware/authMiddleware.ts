import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken';
import UserModel from '../models/user';

interface AuthenticatedRequest extends Request {
    user?: { name: string }
}

export async function middlware (req:AuthenticatedRequest, res:Response, next:NextFunction):Promise<void> {
    try {
        const token = req.headers.authorization?.split(' ')[1]

        if (!token) {
            res.status(401).json({success: false, message: "Unauthorized"})
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { id: string};
        const user = await UserModel.findById(decoded.id);

        if (!user) {
            res.status(401).json({success: false, message: "no user"})
            return;
        }
        const newUser = { name: user.firstname, id: user._id }
        req.user = newUser
        next();
    } catch(error) {
        res.status(404).json({success: false, message: 'Please Login'})
    }
}