import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET /api/seminars/[slug] - Get a single seminar by slug or ID
export async function GET(
  request: NextRequest,
  context: { params: { slug: string } }
) {
  const { slug } = await context.params;

  try {
    // Try to find by ID first
    let seminar = await prisma.seminar.findUnique({
      where: {
        id: slug, // Now using the awaited slug
      },
    });

    // If not found by ID, try to find by slug
    if (!seminar) {
      seminar = await prisma.seminar.findUnique({
        where: {
          slug: slug,
        },
      });
    }

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
  context: { params: { slug: string } }
) {
  const { slug } = await context.params;
  
  try {
    const body = await request.json();
    
    // TODO: Add admin authentication
    
    // Check if seminar exists by ID
    const existingSeminar = await prisma.seminar.findUnique({
      where: {
        id: slug, // Now using the awaited slug
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
        id: slug,
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
  context: { params: { slug: string } }
) {
  const { slug } = await context.params;
  
  try {
    // TODO: Add admin authentication
    
    // Check if seminar exists by ID
    const existingSeminar = await prisma.seminar.findUnique({
      where: {
        id: slug, // Now using the awaited slug
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
        id: slug,
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