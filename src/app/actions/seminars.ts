'use server';

import prisma from '@/lib/db';

export interface SeminarFilters {
  audienceType?: string;
  location?: string;
}

export async function getSeminars(filters: SeminarFilters = {}) {
  try {
    const whereClause: any = {};
    
    if (filters.audienceType) {
      whereClause.audienceType = filters.audienceType;
    }
    
    if (filters.location) {
      whereClause.location = filters.location;
    }
    
    const seminars = await prisma.seminar.findMany({
      where: whereClause,
      orderBy: {
        date: 'asc',
      },
    });
    
    return { seminars };
  } catch (error) {
    console.error('Error fetching seminars:', error);
    return { error: 'Failed to fetch seminars' };
  }
}

export async function getSeminarBySlug(slug: string) {
  try {
    const seminar = await prisma.seminar.findUnique({
      where: {
        slug,
      },
    });
    
    if (!seminar) {
      return { error: 'Seminar not found' };
    }
    
    return { seminar };
  } catch (error) {
    console.error('Error fetching seminar:', error);
    return { error: 'Failed to fetch seminar' };
  }
} 