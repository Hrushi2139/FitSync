import express from 'express';
import {
    signUp,
    login,

} from '../controllers/auth.controller.js';

const router=express.Router();
router.post('/signUp',signUp);
router.post('/login',login);

export default router;

