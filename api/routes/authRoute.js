import express from "express";
import {signup} from '../controllers/authControler.js'
import { signin } from "../controllers/authControler.js";
import { google } from "../controllers/authControler.js";
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google);

export default router;