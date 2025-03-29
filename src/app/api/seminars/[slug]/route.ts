import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET /api/seminars/[slug] - Get a single seminar by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const seminar = await prisma.seminar.findUnique({
      where: {
        slug: params.slug,
      },
    });

    if (!seminar) {
      return NextResponse.json(
        { error: 'Seminar not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(seminar);
  } catch (error) {
    console.error('Error fetching seminar:', error);
    return NextResponse.json(
      { error: 'Failed to fetch seminar' },
      { status: 500 }
    );
  }
}

// PUT /api/seminars/[slug] - Update a seminar (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();
    
    // TODO: Add admin authentication
    
    // Check if seminar exists
    const existingSeminar = await prisma.seminar.findUnique({
      where: {
        slug: params.slug,
      },
    });

    if (!existingSeminar) {
      return NextResponse.json(
        { error: 'Seminar not found' },
        { status: 404 }
      );
    }

    const updatedSeminar = await prisma.seminar.update({
      where: {
        slug: params.slug,
      },
      data: {
        title: body.title,
        description: body.description,
        date: new Date(body.date),
        location: body.location,
        imageUrl: body.imageUrl,
        audienceType: body.audienceType,
        // We don't update the slug as it's used as the identifier
      },
    });

    return NextResponse.json(updatedSeminar);
  } catch (error) {
    console.error('Error updating seminar:', error);
    return NextResponse.json(
      { error: 'Failed to update seminar' },
      { status: 500 }
    );
  }
}

// DELETE /api/seminars/[slug] - Delete a seminar (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // TODO: Add admin authentication
    
    // Check if seminar exists
    const existingSeminar = await prisma.seminar.findUnique({
      where: {
        slug: params.slug,
      },
    });

    if (!existingSeminar) {
      return NextResponse.json(
        { error: 'Seminar not found' },
        { status: 404 }
      );
    }

    await prisma.seminar.delete({
      where: {
        slug: params.slug,
      },
    });

    return NextResponse.json({ message: 'Seminar deleted successfully' });
  } catch (error) {
    console.error('Error deleting seminar:', error);
    return NextResponse.json(
      { error: 'Failed to delete seminar' },
      { status: 500 }
    );
  }
} 