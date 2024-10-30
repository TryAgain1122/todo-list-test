import { Request, Response } from "express";
import UserModel from "../models/user";
import NoteModel from '../models/note';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
    user?: { id: string }
}

export async function create(req: Request, res: Response): Promise<void> {
    const { email, password, firstname, lastname } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const createAccount = new UserModel({ 
            email,
            password: hashedPassword,
            firstname,
            lastname
        });
        if (!createAccount) {
            res.status(400).json({ message: "Please fill all fields" });
        } else {
            await createAccount.save();
            res.status(200).json({ message: 'Created Account', createAccount })
        }
    } catch (error) {
        res.status(404).json({ message: 'Internal Server error' })
    }
}

export const loginAccount = async (req:Request, res:Response):Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({email});
        if (!user) {
            res.status(401).json({success: false, message: 'User not exist'});
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            res.status(401).json({success: false, message: 'Wrong Credentials'});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '5h'})
        res.status(200).json({success: true, token, user: {name: user.firstname} ,message: 'Login Successfully'})
    } catch(error) {
        res.status(404).json({message: 'Internal Server Error'})
    }
}

export const createNotes = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { title, description } = req.body;

    try {
        // Validate input fields
        if (!title || !description) {
            res.status(400).json({ message: 'Please fill all fields' }); // Use 400 for bad request
            return; // Add return to exit early
        }

        // Create a new note
        const notes = new NoteModel({ title, description, userId: req.user.id });

        // Save the note to the database
        await notes.save();

        // Send a success response
        res.status(201).json({success: true, message: 'Note created successfully', note: notes }); // Include the created note
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Internal Server Error' }); // Use 500 for server errors
    }
};

export const getAllData = async (req:AuthenticatedRequest, res:Response):Promise<void> => {
    try {   
        const GetData = await NoteModel.find({userId: req.user.id});
        if (!GetData) {
            res.status(400).json({success: false, message: "Not found"});
            return;
        } else {
            res.status(200).json({ success: true, GetData});
            return;
        }

    } catch(error) {
        res.status(404).json({success: false, message: 'Internal Server Error'})
    }
}

export const update = async (req:Request, res:Response):Promise<void> => {
    const { id } = req.params;

    try {
        const update = await NoteModel.findByIdAndUpdate(id, req.body, {new: true})

        if (!update) {
            res.status(400).json({ success: false, message: 'I Cannot find this ID'})
            return;
        } else {
            res.status(200).json({ success: true, update })
        }
    } catch (error) {
        res.status(404).json({ success: false, message: 'Internal Server Error'})
    }
    
}

export const deleteNote = async (req:Request, res:Response):Promise<void> => {
    const { id } = req.params;
    try {
        
        const deleteNote = await NoteModel.findByIdAndDelete(id);

        if (!deleteNote) {
            res.status(400).json({ success: false, message: 'I Cannot find this ID'})
            return;
        } else {
            res.status(200).json({ success: true, deleteNote })
        }
    } catch (error) {
        res.status(404).json({ success: false, message: 'Internal Server Error'})
    }
}

export const verifyUser = async (req: AuthenticatedRequest, res: Response):Promise<void> => {
    res.status(200).json({ success: true, user: req.user })
}