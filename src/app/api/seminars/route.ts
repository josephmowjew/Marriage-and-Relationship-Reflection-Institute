import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET /api/seminars - Get all seminars
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const audienceType = searchParams.get('audienceType');
    const location = searchParams.get('location');

    // Build filters
    const filters: any = {};
    if (audienceType) {
      filters.audienceType = audienceType;
    }
    if (location) {
      filters.location = location;
    }

    const seminars = await prisma.seminar.findMany({
      where: filters,
      orderBy: {
        date: 'asc',
      },
    });

    return NextResponse.json(seminars);
  } catch (error) {
    console.error('Error fetching seminars:', error);
    return NextResponse.json(
      { error: 'Failed to fetch seminars' },
      { status: 500 }
    );
  }
}

// POST /api/seminars - Create a new seminar (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // TODO: Add admin authentication
    
    const seminar = await prisma.seminar.create({
      data: {
        title: body.title,
        description: body.description,
        date: new Date(body.date),
        location: body.location,
        imageUrl: body.imageUrl,
        audienceType: body.audienceType,
        slug: body.slug,
      },
    });

    return NextResponse.json(seminar, { status: 201 });
  } catch (error) {
    console.error('Error creating seminar:', error);
    return NextResponse.json(
      { error: 'Failed to create seminar' },
      { status: 500 }
    );
  }
} 