
import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Post, { IPost } from '../models/Post';

const router = express.Router();

// GET /api/post/:postID - Get post by ID
router.get('/:postID', async (req: Request, res: Response) => {
  try {
    const postID = req.params.postID;
    
    // Find post by ID
    const post = await Post.findOne({ PostID: postID });
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Format the response to match the expected structure
    const response = {
      PostID: post.PostID,
      PostType: post.PostType,
      PostTitle: post.PostTitle,
      PostBody: post.PostBody,
      PostChildrenIds: post.PostChildrenIds,
      Likes: post.Likes,
      Dislikes: post.Dislikes
    };
    
    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// POST /api/post/make - Create a new post
router.post('/make', async (req: Request, res: Response) => {
  try {
    const { Title, Description, ParentID } = req.body;
    
    // Validate required fields
    if (!Title || !Description) {
      return res.status(400).json({ message: 'Title and Description are required' });
    }
    
    // Generate a new post ID
    const newPostID = uuidv4();
    
    // Determine post type based on parent ID
    let postType: 'Post' | 'Comment' | 'Reply' = 'Post';
    
    if (ParentID) {
      // Find the parent post
      const parentPost = await Post.findOne({ PostID: ParentID });
      
      if (!parentPost) {
        return res.status(404).json({ message: 'Parent post not found' });
      }
      
      // Determine if this is a comment or reply
      postType = parentPost.PostType === 'Post' ? 'Comment' : 'Reply';
      
      // Update parent's children list
      await Post.updateOne(
        { PostID: ParentID },
        { 
          $push: { PostChildrenIds: newPostID },
          $set: { updatedAt: new Date() }
        }
      );
    }
    
    // Create new post
    const newPost = new Post({
      PostID: newPostID,
      PostType: postType,
      PostTitle: Title,
      PostBody: Description,
      PostChildrenIds: [],
      Likes: 0,
      Dislikes: 0,
      ParentID: ParentID || null
    });
    
    await newPost.save();
    
    // Return the created post ID
    res.status(201).json({ CreatedPostID: newPostID });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

// GET /api/post - Get all root posts (no parent)
router.get('/', async (req: Request, res: Response) => {
  try {
    const posts = await Post.find({ PostType: 'Post' })
      .sort({ updatedAt: -1 })
      .limit(20);
    
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
});

export const postRoutes = router;
