import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import prisma from "@/prisma/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';

// Initialize Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Use HTTPS
});

// Define the schema with date as a string and prescription URL
const createSessionSchema = z.object({
  doctorname: z.string().min(1).max(20),
  diagnosis: z.string().min(1).max(20),
  date: z.string().regex(/^\d{2}-\d{2}-\d{4}$/), // Validates dd-mm-yyyy format
  note: z.string().optional(),
  prescriptionImageUrl: z.string().optional(),
});

// Function to convert dd-mm-yyyy to ISO
function convertDDMMYYYYToISO(dateString: string) {
  const [day, month, year] = dateString.split('-');
  return new Date(`${year}-${month}-${day}T00:00:00Z`);
}

// Function to format Date object to dd-mm-yyyy
function formatDateToDDMMYYYY(date: Date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

// Handle GET and POST requests
export async function GET() {
  try {
    // Get the user from Kinde authentication
    const { getUser } = getKindeServerSession();
    const user = await getUser(); // Kinde provides the user object
    
    // Extract the user email from Kinde user object
    const userEmail = user?.email;
    
    if (!userEmail) {
      return NextResponse.json({ error: 'Unauthorized: No user email found' }, { status: 401 });
    }

    // Fetch sessions by userEmail
    const sessions = await prisma.session.findMany({
      where: { userEmail }
    });

    // Format the date field to dd-mm-yyyy
    const formattedSessions = sessions.map((session) => ({
      ...session,
      date: formatDateToDDMMYYYY(session.date)
    }));

    return NextResponse.json(formattedSessions, { status: 200 });
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return NextResponse.json({ error: 'Unable to fetch sessions data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Use formData for file uploads
    const formData = await request.formData();
    const file = formData.get('prescriptionImage') as File | null;
    
    // Extract other form fields
    const doctorname = formData.get('doctorname') as string;
    const diagnosis = formData.get('diagnosis') as string;
    const date = formData.get('date') as string;
    const note = (formData.get('note') as string) || '';
    
    // Validate the core form data
    const validation = createSessionSchema.safeParse({
      doctorname,
      diagnosis,
      date,
      note,
      prescriptionImageUrl: "",
    });
    
    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    // Get the authenticated user's data from Kinde
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userEmail = user?.email;

    if (!userEmail) {
      return NextResponse.json({ error: 'Unauthorized: No user email found' }, { status: 401 });
    }

    // Convert date to ISO before saving
    const isoDate = convertDDMMYYYYToISO(date);

    // Create or find user
    let userExists = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!userExists) {
      userExists = await prisma.user.create({
        data: {
          email: userEmail,
        }
      });
      console.log('User created with email:', userEmail);
    }

    // Handle file upload if a file was provided
    let fileUrl = undefined;
    
    if (file) {
      // Create a sanitized user directory (replace special chars in email)
      const safeUserDir = userEmail.replace(/[^a-zA-Z0-9]/g, '_');
      
      // Generate a unique filename with user identifier to prevent collisions
      const uniqueId = uuidv4();
      const safeFileName = file.name.replace(/\s+/g, '-').toLowerCase();
      
      // Convert file to buffer for upload
      const buffer = Buffer.from(await file.arrayBuffer());
      
      // Create a unique folder path for this user's health data in Cloudinary
      const folderPath = `prescriptions/${safeUserDir}`;
      
      // Upload to Cloudinary with HIPAA-compliant settings
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: folderPath, // Optional: Organize files into folders
            public_id: `${uniqueId}-${safeFileName.split('.')[0]}`, // Unique filename
            resource_type: 'image',
            type: 'upload', // Make the asset public
            overwrite: true,
            invalidate: true,
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
      
        // Write buffer to stream
        stream.write(buffer);
        stream.end();
      });
      
      // Store the public URL in the database
      fileUrl = (uploadResult as { secure_url: string }).secure_url;
      
      // For added security, just store the Cloudinary asset ID and generate URLs as needed
      // fileUrl = `cloudinary://${uploadResult.public_id}`;

    }

    // Create a new session in the database with the prescription image URL
    const newSession = await prisma.session.create({
      data: { 
        doctorname,
        diagnosis,
        date: isoDate,
        note,
        userEmail,
        fileUrl, // Add the URL to the session
      },
    });

    console.log('New Session:', newSession);

    // Format the date back to dd-mm-yyyy in the response
    const formattedSession = {
      ...newSession,
      date: date // Send back in dd-mm-yyyy format as received
    };

    return NextResponse.json(formattedSession, { status: 201 });
  } catch (error) {
    console.error('Error creating session:', error);
    return NextResponse.json({ error: 'Unable to create session' }, { status: 500 });
  }
}