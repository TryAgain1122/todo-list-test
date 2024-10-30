import express from 'express';
import { create, createNotes, deleteNote, getAllData, loginAccount, update, verifyUser } from '../controllers/userController';
import { middlware } from '../middleware/authMiddleware'
const router = express.Router();

router.post('/create', create);
router.get('/getAllNotes',middlware, getAllData);
router.post('/login', loginAccount);
router.post('/addNotes',middlware, createNotes);
router.put('/updateNotes/:id', update)
router.delete('/deleteNote/:id', deleteNote)
router.get('/verify', middlware, verifyUser)

export default router