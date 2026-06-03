import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

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
        const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
        const apiKey = process.env.CLOUDINARY_API_KEY;
        const apiSecret = process.env.CLOUDINARY_API_SECRET;

        // Generate a secure signature for signed upload
        const timestamp = Math.round(new Date().getTime() / 1000);
        const signatureString = `timestamp=${timestamp}${apiSecret}`;
        const signature = crypto.createHash('sha1').update(signatureString).digest('hex');

        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
        
        // Construct the base64 data URL
        const base64File = `data:${file.type};base64,${buffer.toString('base64')}`;
        
        const response = await fetch(cloudinaryUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            file: base64File,
            api_key: apiKey,
            timestamp: timestamp,
            signature: signature,
          }),
        });

        const result = await response.json();
        if (result.secure_url) {
          console.log('Successfully uploaded to Cloudinary:', result.secure_url);
          return NextResponse.json({ success: true, url: result.secure_url });
        } else {
          console.warn('Cloudinary upload responded without secure_url:', result);
        }
      } catch (cloudinaryError) {
        console.warn('Cloudinary upload failed, falling back to local storage:', cloudinaryError);
      }
    }

    // 2. Fallback: Save file to local public/uploads directory
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    try {
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
    } catch (localWriteError: any) {
      console.warn('Local file write failed (likely read-only environment like Vercel). Falling back to Base64 data URL:', localWriteError);
      
      // Fallback: Convert to Base64 data URL so the app continues working seamlessly in read-only environments
      const base64File = `data:${file.type};base64,${buffer.toString('base64')}`;
      return NextResponse.json({ success: true, url: base64File });
    }

  } catch (error: any) {
    console.error('Error in upload route:', error);
    return NextResponse.json({ success: false, error: error.message || 'Upload failed' }, { status: 500 });
  }
}

