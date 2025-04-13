
import Disease from '../models/Disease';
import Post from '../models/Post';
import { v4 as uuidv4 } from 'uuid';

export const seedDiseases = async () => {
  try {
    // Check if we already have diseases in the database
    const count = await Disease.countDocuments();
    if (count > 0) {
      console.log('Database already seeded with diseases');
      return;
    }

    // Sample disease data
    const diseases = [
      {
        name: "Depression",
        overview: {
          description: "Depression is a mental health disorder characterized by persistently depressed mood or loss of interest in activities, causing significant impairment in daily life.",
          causes: ["Biological factors", "Brain chemistry", "Hormones", "Genetics", "Environmental factors"],
          risk_factors: ["Family history", "Trauma", "Chronic illness", "Medications", "Substance abuse"]
        },
        symptoms: [
          "Persistent sad, anxious, or 'empty' mood", 
          "Loss of interest in activities once enjoyed",
          "Feelings of hopelessness",
          "Decreased energy",
          "Difficulty concentrating",
          "Insomnia or oversleeping",
          "Changes in appetite",
          "Thoughts of death or suicide"
        ],
        diagnosis: {
          criteria: "Symptoms must be present for at least two weeks and represent a change from previous functioning",
          methods: ["Clinical assessment", "Psychological evaluation", "Physical examination", "Depression screening tests"]
        },
        treatment: [
          {"Psychotherapy": "Talk therapy such as cognitive behavioral therapy (CBT) that helps people identify and change troubling emotions, thoughts, and behavior"},
          {"Medication": "Antidepressants that may help improve how your brain uses certain chemicals that control mood or stress"},
          {"Lifestyle changes": "Regular exercise, adequate sleep, healthy eating, and avoiding alcohol and drugs"},
          {"Alternative treatments": "Meditation, acupuncture, and other complementary approaches"}
        ],
        prevalence: {
          global: "Approximately 280 million people worldwide (3.8% of the population)",
          by_region: {
            "Africa": "5.4%",
            "Asia": "3.1%",
            "Europe": "4.2%",
            "North America": "4.4%",
            "South America": "4.0%",
            "Oceania": "4.3%"
          }
        },
        last_updated: new Date()
      },
      {
        name: "Anxiety",
        overview: {
          description: "Anxiety disorders involve excessive worry, nervousness, or fear that interferes with daily activities.",
          causes: ["Genetics", "Brain chemistry", "Environmental stress", "Personality", "Medical conditions"],
          risk_factors: ["Childhood trauma", "Stress", "Negative life events", "Family history", "Medical conditions"]
        },
        symptoms: [
          "Excessive worry",
          "Restlessness",
          "Fatigue",
          "Difficulty concentrating",
          "Irritability",
          "Muscle tension",
          "Sleep problems",
          "Panic attacks"
        ],
        diagnosis: {
          criteria: "Excessive anxiety and worry occurring more days than not for at least 6 months",
          methods: ["Clinical interview", "Psychological questionnaires", "Medical history", "Physical examination"]
        },
        treatment: [
          {"Psychotherapy": "Cognitive behavioral therapy (CBT) to learn different ways of thinking, behaving, and reacting to situations"},
          {"Medication": "Anti-anxiety medications or antidepressants to reduce symptoms"},
          {"Relaxation techniques": "Deep breathing, meditation, yoga, and progressive muscle relaxation"},
          {"Lifestyle changes": "Regular exercise, adequate sleep, and reducing caffeine and alcohol"}
        ],
        prevalence: {
          global: "Approximately 301 million people worldwide (3.6% of the population)",
          by_region: {
            "Africa": "4.0%",
            "Asia": "2.9%",
            "Europe": "3.9%",
            "North America": "5.1%",
            "South America": "3.8%",
            "Oceania": "4.3%"
          }
        },
        last_updated: new Date()
      }
    ];

    await Disease.insertMany(diseases);
    console.log('Database seeded with disease data');
  } catch (error) {
    console.error('Error seeding diseases:', error);
  }
};

export const seedPosts = async () => {
  try {
    // Check if we already have posts in the database
    const count = await Post.countDocuments();
    if (count > 0) {
      console.log('Database already seeded with posts');
      return;
    }

    // Create some sample posts
    const rootPostId = uuidv4();
    const commentId = uuidv4();

    // Root post
    const rootPost = new Post({
      PostID: rootPostId,
      PostType: 'Post',
      PostTitle: 'Living with Anxiety: My Personal Journey',
      PostBody: 'I was diagnosed with anxiety disorder two years ago, and I wanted to share my experience with treatments that worked for me...',
      PostChildrenIds: [commentId],
      Likes: 5,
      Dislikes: 0
    });

    // Comment on the root post
    const comment = new Post({
      PostID: commentId,
      PostType: 'Comment',
      PostTitle: 'Thank you for sharing',
      PostBody: 'Your story is inspiring. I\'ve also found meditation helpful for managing my anxiety symptoms.',
      PostChildrenIds: [],
      Likes: 2,
      Dislikes: 0,
      ParentID: rootPostId
    });

    await rootPost.save();
    await comment.save();
    console.log('Database seeded with post data');
  } catch (error) {
    console.error('Error seeding posts:', error);
  }
};

export const seedInitialData = async () => {
  await seedDiseases();
  await seedPosts();
};
