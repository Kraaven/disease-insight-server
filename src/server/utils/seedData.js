// Convert seedData.ts to seedData.js (keeping the same functionality)
import Disease from '../models/Disease.js';
import Post from '../models/Post.js';

export async function seedInitialData() {
  try {
    // Check if we already have some data
    const diseaseCount = await Disease.countDocuments();
    const postCount = await Post.countDocuments();
    
    if (diseaseCount === 0) {
      console.log('Seeding initial disease data...');
      
      // Add a few sample diseases
      const sampleDiseases = [
        {
          name: "Influenza",
          overview: {
            description: "Influenza, commonly known as the flu, is a highly contagious respiratory illness caused by influenza viruses.",
            causes: ["Influenza A virus", "Influenza B virus", "Influenza C virus"],
            risk_factors: ["Age (very young or elderly)", "Weakened immune system", "Chronic illnesses", "Pregnancy"]
          },
          symptoms: ["Fever", "Cough", "Sore throat", "Body aches", "Fatigue", "Headache"],
          diagnosis: {
            criteria: "Diagnosis is typically based on symptoms and can be confirmed through laboratory testing.",
            methods: ["Rapid influenza diagnostic tests", "RT-PCR", "Viral culture"]
          },
          treatment: [
            {"Antiviral medications": "Oseltamivir (Tamiflu) and zanamivir (Relenza) can reduce the duration and severity of symptoms."},
            {"Rest and hydration": "Adequate rest and increased fluid intake are recommended."},
            {"Over-the-counter medications": "Pain relievers and fever reducers can help manage symptoms."},
            {"Prescription medications": "For severe cases or high-risk patients."}
          ],
          prevalence: {
            global: "Seasonal influenza affects about 5-10% of adults and 20-30% of children worldwide each year.",
            by_region: {
              "Africa": "Significant burden, but often underreported due to limited surveillance.",
              "Asia": "High burden, especially in densely populated areas.",
              "Europe": "Well-documented seasonal patterns, typically winter months.",
              "North America": "Annual epidemics during fall and winter months.",
              "South America": "Seasonal pattern typically opposite to Northern Hemisphere.",
              "Oceania": "Peak season typically June to September."
            }
          },
          last_updated: new Date()
        }
      ];
      
      await Disease.insertMany(sampleDiseases);
      console.log(`Seeded ${sampleDiseases.length} diseases successfully!`);
    }
    
    if (postCount === 0) {
      console.log('Seeding initial post data...');
      
      // Add a few sample posts
      const samplePosts = [
        {
          PostID: "1234-5678-abcd-efgh",
          PostType: "Post",
          PostTitle: "Living with Chronic Migraines",
          PostBody: "I've been dealing with chronic migraines for over a decade. Would love to hear about others' experiences and any treatment strategies that have worked for you.",
          PostChildrenIds: [],
          Likes: 5,
          Dislikes: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          PostID: "8765-4321-wxyz-ijkl",
          PostType: "Post",
          PostTitle: "New research on autoimmune disorders",
          PostBody: "Just read a fascinating article about new treatments for autoimmune disorders. Has anyone heard about or tried any experimental treatments?",
          PostChildrenIds: [],
          Likes: 8,
          Dislikes: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      
      await Post.insertMany(samplePosts);
      console.log(`Seeded ${samplePosts.length} posts successfully!`);
    }
    
  } catch (error) {
    console.error('Error seeding initial data:', error);
  }
}
