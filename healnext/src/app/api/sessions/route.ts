import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import prisma from "@/prisma/client";

const createSessionschema = z.object({
    doctorname: z.string().min(1).max(20),
    diagnosis: z.string().min(1).max(20),
    note: z.string().min(0)
})
export async function POST(request: NextRequest) {
    const body= await request.json();
    console.log("Received body", body);
    const validation = createSessionschema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400 })
    const newSession = await prisma.session.create({
        data: { doctorname: body.doctorname, diagnosis: body.diagnosis, note: body.note},
    });
    console.log('New Session:', newSession)
    return NextResponse.json(newSession, { status: 201});
}