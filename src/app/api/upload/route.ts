import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. Try Cloudinary if it is configured with real credentials (not defaults)
    const hasCloudinary = 
      process.env.CLOUDINARY_CLOUD_NAME && 
      process.env.CLOUDINARY_CLOUD_NAME !== 'demo-cloud' &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET;

    if (hasCloudinary) {
      try {
        // Upload to Cloudinary using a fetch request or cloudinary SDK
        // Since we want to keep things lightweight, we can use the Cloudinary REST API:
        const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
        const uploadPreset = 'unsigned_preset'; // or default to local if preset not configured

        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
        
        // Construct the base64 or upload data
        const base64File = `data:${file.type};base64,${buffer.toString('base64')}`;
        
        const response = await fetch(cloudinaryUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            file: base64File,
            upload_preset: uploadPreset,
          }),
        });

        const result = await response.json();
        if (result.secure_url) {
          return NextResponse.json({ success: true, url: result.secure_url });
        }
      } catch (cloudinaryError) {
        console.warn('Cloudinary upload failed, falling back to local storage:', cloudinaryError);
      }
    }

    // 2. Fallback: Save file to local public/uploads directory
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Ensure the uploads directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uniqueFilename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = path.join(uploadDir, uniqueFilename);

    fs.writeFileSync(filePath, buffer);
    console.log(`Saved file locally to: ${filePath}`);

    const relativeUrl = `/uploads/${uniqueFilename}`;
    return NextResponse.json({ success: true, url: relativeUrl });

  } catch (error: any) {
    console.error('Error in upload route:', error);
    return NextResponse.json({ success: false, error: error.message || 'Upload failed' }, { status: 500 });
  }
}
