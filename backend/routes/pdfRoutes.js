import express from 'express';
import { generatePDF } from '../controllers/pdfController.js';

const router = express.Router();

// POST /api/pdf/generate
router.post('/generate', generatePDF);

export default router;
