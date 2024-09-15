import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';

const prisma = new PrismaClient();

// Path where images will be saved
const uploadDir = path.join(process.cwd(), 'public', 'uploads');

// Ensure that the uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Create a new post (POST request)
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData(); // Parse the multipart form data
    const content = formData.get('content')?.toString() || ''; // Get post content
    const imageFile = formData.get('image') as File | null; // Get the image file

    // Validate the required fields
    if (!content && !imageFile) {
      return NextResponse.json({ message: 'Content or image is required' }, { status: 400 });
    }

    let imagePath = null;

    // Handle image file saving if it exists
    if (imageFile) {
      const imageName = `${uuidv4()}-${imageFile.name}`;
      imagePath = path.join(uploadDir, imageName);

      const arrayBuffer = await imageFile.arrayBuffer();
      fs.writeFileSync(imagePath, Buffer.from(arrayBuffer));

      // Store relative path to save in the database
      imagePath = `${imageName}`;
    }

    // Create the post in the database
    const newPost = await prisma.post.create({
      data: {
        content: content,
        user_id: 1, // Set a user_id, replace this with the actual user ID if available
        image: imagePath,
      },
    });

    return NextResponse.json(newPost, { status: 201 }); // Return the created post with 201 status
  } catch (error) {
    console.error('Error creating the post:', error);
    return NextResponse.json({ message: 'Error creating the post' }, { status: 500 });
  }
}

// Fetch all posts (GET request)
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        created_at: 'desc', // Sort posts by newest first
      },
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ message: 'Error fetching posts' }, { status: 500 });
  }
}
