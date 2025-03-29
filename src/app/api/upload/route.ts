import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG and WebP images are allowed.' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const buffer = await file.arrayBuffer();
    const hash = crypto.createHash('sha256').update(Date.now().toString()).digest('hex').slice(0, 8);
    const fileExtension = file.type.split('/')[1];
    const filename = `${hash}.${fileExtension}`;
    
    // Use the existing seminars directory
    const uploadDir = join(process.cwd(), 'public', 'seminars');
    
    // Write the file
    await writeFile(
      join(uploadDir, filename),
      Buffer.from(buffer)
    );

    // Return the URL path that can be used to access the file
    return NextResponse.json({
      url: `/seminars/${filename}`
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}