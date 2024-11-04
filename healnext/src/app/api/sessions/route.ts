import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import prisma from "@/prisma/client";

// Define the schema with date as a string
const createSessionSchema = z.object({
    doctorname: z.string().min(1).max(20),
    diagnosis: z.string().min(1).max(20),
    date: z.string().regex(/^\d{2}-\d{2}-\d{4}$/), // Validates dd-mm-yyyy format
    note: z.string().optional()
});

// Function to convert dd-mm-yyyy to ISO
function convertDDMMYYYYToISO(dateString: string) {
    const [day, month, year] = dateString.split('-');
    return new Date(`${year}-${month}-${day}T00:00:00Z`);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    console.log("Received body", body);

    // Validate the request body
    const validation = createSessionSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const { doctorname, diagnosis, note, date } = body;

    // Convert date to ISO before saving
    const isoDate = convertDDMMYYYYToISO(date);

    // Create a new session in the database
    const newSession = await prisma.session.create({
        data: { 
            doctorname,
            diagnosis,
            date: isoDate,
            note
        }
    });

    console.log('New Session:', newSession);

    // Format the date back to dd-mm-yyyy in the response
    const formattedSession = {
        ...newSession,
        date: date // Send back in dd-mm-yyyy format as received
    };

    return NextResponse.json(formattedSession, { status: 201 });
}