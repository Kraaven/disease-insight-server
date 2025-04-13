
import express, { Request, Response } from 'express';
import Disease, { IDisease } from '../models/Disease';

const router = express.Router();

// GET /api/disease/:diseaseName
router.get('/:diseaseName', async (req: Request, res: Response) => {
  try {
    const diseaseName = req.params.diseaseName;
    
    // Check if the disease exists (case-insensitive search)
    const disease = await Disease.findOne({ 
      name: { $regex: new RegExp(`^${diseaseName}$`, 'i') } 
    });
    
    if (!disease) {
      return res.status(404).json({ message: 'Disease not found' });
    }
    
    // Format the response to match the expected structure
    const response = {
      name: disease.name,
      overview: disease.overview,
      symptoms: disease.symptoms,
      diagnosis: disease.diagnosis,
      treatment: disease.treatment,
      prevalence: disease.prevalence,
      last_updated: disease.last_updated
    };
    
    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching disease:', error);
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// GET /api/disease - Get all diseases (name only)
router.get('/', async (req: Request, res: Response) => {
  try {
    const diseases = await Disease.find({}, 'name');
    res.status(200).json(diseases);
  } catch (error) {
    console.error('Error fetching diseases:', error);
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// POST /api/disease - Add a new disease (for admin purposes)
router.post('/', async (req: Request, res: Response) => {
  try {
    const diseaseData = req.body;
    
    // Validate required fields
    if (!diseaseData.name || !diseaseData.overview) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // Check if disease already exists
    const existingDisease = await Disease.findOne({ 
      name: { $regex: new RegExp(`^${diseaseData.name}$`, 'i') }
    });
    
    if (existingDisease) {
      return res.status(409).json({ message: 'Disease already exists' });
    }
    
    // Create new disease
    const newDisease = new Disease({
      ...diseaseData,
      last_updated: new Date()
    });
    
    await newDisease.save();
    res.status(201).json(newDisease);
  } catch (error) {
    console.error('Error adding disease:', error);
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

export const diseaseRoutes = router;
