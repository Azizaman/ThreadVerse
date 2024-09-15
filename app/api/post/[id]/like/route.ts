import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const postId = parseInt(params.id, 10);

  if (isNaN(postId)) {
    return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
  }

  try {
    // Increment the like count for the post
    const post = await prisma.post.update({
      where: { id: postId },
      data: { like_count: { increment: 1 } },
      select: { like_count: true },
    });

    return NextResponse.json({ likes: post.like_count }, { status: 200 });
  } catch (error) {
    console.error('Error liking post:', error);
    return NextResponse.json({ error: 'Failed to like post' }, { status: 500 });
  }
}