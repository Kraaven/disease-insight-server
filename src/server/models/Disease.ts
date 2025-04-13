
import mongoose, { Schema, Document } from 'mongoose';

export interface IRegion {
  Africa: string;
  Asia: string;
  Europe: string;
  "North America": string;
  "South America": string;
  Oceania: string;
}

export interface IDiseaseOverview {
  description: string;
  causes: string[];
  risk_factors: string[];
}

export interface IDiseasePrevalence {
  global: string;
  by_region: IRegion;
}

export interface IDiagnosisInfo {
  criteria: string;
  methods: string[];
}

export interface ITreatment {
  [key: string]: string;
}

export interface IDisease extends Document {
  name: string;
  overview: IDiseaseOverview;
  symptoms: string[];
  diagnosis: IDiagnosisInfo;
  treatment: ITreatment[];
  prevalence: IDiseasePrevalence;
  last_updated: Date;
}

const DiseaseSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true, index: true },
  overview: {
    description: { type: String, required: true },
    causes: [{ type: String, required: true }],
    risk_factors: [{ type: String, required: true }]
  },
  symptoms: [{ type: String, required: true }],
  diagnosis: {
    criteria: { type: String, required: true },
    methods: [{ type: String, required: true }]
  },
  treatment: [{ type: Map, of: String, required: true }],
  prevalence: {
    global: { type: String, required: true },
    by_region: {
      Africa: { type: String, required: true },
      Asia: { type: String, required: true },
      Europe: { type: String, required: true },
      "North America": { type: String, required: true },
      "South America": { type: String, required: true },
      Oceania: { type: String, required: true }
    }
  },
  last_updated: { type: Date, required: true, default: Date.now }
});

// Create a text index for searching by disease name
DiseaseSchema.index({ name: 'text' });

export default mongoose.model<IDisease>('Disease', DiseaseSchema);
