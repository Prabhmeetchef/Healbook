"use client";
import '../createSession/sessioncss.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface SessionForm {
    doctorname: string;
    diagnosis: string;
    date: Date;
    note: string;
    prescriptionImage?: FileList;
}

export default function CreateSession() {
    const { register, handleSubmit, setValue } = useForm<SessionForm>();
    const router = useRouter();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setValue("prescriptionImage", e.target.files);
        }
    };

    return (
        <div className="bg-[#0cc0df] w-full min-h-screen flex flex-col">
            <div id="head">
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <link rel="shortcut icon" href="mainlogo.png" type="image/x-icon" />
                <title>Healbook: Your Health Data Vault</title>
            </div>
            <div>
                <div id="header" className="fixed w-full bg-white min-h-[4rem] shadow flex justify-between items-center px-4 border-b-2">
                    <Link href="/" className="w-1/12 ml-2 sm:ml-4 min-w-32"><img src="/logomainwhite.png" id="logo" alt="logo" /></Link>
                    <a href="profile" className="inline-flex mr-2 sm:mr-4"><img src="/10061438.png" id="pfp" alt="profile" className="w-8 hover:w-8" /></a>
                </div>
            </div>
            <div className="pt-24 flex flex-col items-center justify-center flex-1 px-4 py-8">
                <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 space-y-6">
                    <h1 className="text-xl font-bold mb-4 text-gray-700">Create a New Session</h1>
                    <form
                        className="space-y-6"
                        onSubmit={handleSubmit(async (data) => {
                            // Convert date to 'dd-mm-yyyy' format manually
                            const date = new Date(data.date);
                            const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;

                            const payload = { ...data, date: formattedDate };

                            console.log("Data to be sent:", payload); // Log the data being sent
                            await axios.post('/api/sessions', payload);
                            router.push('/dashboard');
                        })}
                    >
                        <div className="flex flex-col">
                            <label htmlFor="doctorName" className="mb-1 text-gray-600">Doctor&apos;s Name</label>
                            <input
                                id="doctorName"
                                placeholder="Can only be 10 letters long"
                                maxLength={10}
                                required
                                className="border-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                {...register('doctorname')}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="diagnosis" className="mb-1 text-gray-600">Diagnosis</label>
                            <input
                                id="diagnosis"
                                placeholder="Can only be 20 letters long"
                                maxLength={20}
                                required
                                className="border-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                {...register('diagnosis')}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="date" className="mb-1 text-gray-600">Date</label>
                            <input
                                id="date"
                                type="date"
                                required
                                className="border-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                {...register('date')}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="note" className="mb-1 text-gray-600">Note</label>
                            <textarea
                                id="note"
                                placeholder="Enter any additional notes here"
                                rows={3}
                                maxLength={100}
                                className="border-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                {...register('note')}
                            />
                        </div>

                        {/* Image Upload Section */}
                        <div className="flex flex-col">
                            <label htmlFor="prescriptionImage" className="mb-1 text-gray-600">Prescription Image</label>
                            <input
                                id="prescriptionImage"
                                type="file"
                                accept="image/*"
                                className="border-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                {...register('prescriptionImage')}
                                onChange={handleImageChange}
                            />
                            <p className="text-gray-500 mt-1 text-sm mb-4">Upload a prescription image (optional)</p>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#0cc0df] text-white font-medium py-2 rounded-md hover:bg-cyan-700 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
