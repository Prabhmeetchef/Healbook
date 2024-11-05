"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import '../dashboard/dashboard.css';

// Define the type for a session
interface Session {
    id: number;
    doctorname: string;
    diagnosis: string;
    date: string; // Keep this as a string for displaying in dd-mm-yyyy format
    note?: string; // Note is optional
}

export default function Dashboard() {
    const [sessions, setSessions] = useState<Session[]>([]); // Specify the state type as an array of Session

    // Fetch sessions data when the component mounts
    useEffect(() => {
        fetch('/api/sessions')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setSessions(data))
            .catch(error => console.error('Error fetching sessions:', error));
    }, []);

    return (
        <div className='bg-white w-full min-h-screen h-full'>
            <div id='head'>
                <meta
                    name="viewport"
                    content="device-width, initial-scale=1.0"
                />
                <link rel="shortcut icon" href="mainlogo.png" type="image/x-icon" />
                <title>Healbook: Your Health Data Vault</title>
            </div>
            <div>
                <div id="header" className="w-full bg-white min-h-[4rem] shadow flex justify-between items-center px-4 border-b-2">
                    <a href="/" className="w-1/12 ml-2 sm:ml-4">
                        <img src="logomainwhite.png" id="logo" alt="logo" />
                    </a>
                    <a href="profile" className="inline-flex mr-2 sm:mr-4">
                        <img src="10061438.png" id="pfp" alt="profile" className="w-8 hover:w-8" />
                    </a>
                </div>
                <form className='space-x-2 absolute top-52 left-8'>
                    <input id='searchdocordiag' placeholder='Enter Doctor name or Diagnosis' className='border-2 text-base w-72 h-10 shadow p-2'></input>
                    <button type="submit" className='border-2 font-medium text-black bg-white w-20 h-10 shadow rounded-lg hover:border-2 hover:border-black transition-colors'>submit</button>
                </form>
                <button id='Sort' className='border-2 font-medium text-black bg-white w-20 h-10 shadow rounded-lg hover:text-black hover:border-2 hover:border-black transition-colors absolute top-52 right-8'>Sort</button>
                <button id='createSession' className=' font-bold text-lg w-48 h-12 rounded-full bg-[#0cc0df] text-white hover:bg-white hover:border-[#0cc0df] border-2 hover:text-[#0cc0df] transition-all absolute top-32 right-6'>
                    <Link href='/dashboard/createSession'> + New Session</Link>
                </button>
                <div className='min-h-96 bg-white relative top-52' style={{ width: '96vw', left: '2vw' }}>
    <table className='min-w-full'>
        <thead>
            <tr>
                <th className=' border border-black px-4 py-2 text-center'>Doctor Name</th>
                <th className=' border border-black px-4 py-2 text-center'>Diagnosis</th>
                <th className=' border border-black px-4 py-2 text-center'>Date</th>
                <th className=' border border-black px-4 py-2 text-center'>Note</th>
            </tr>
        </thead>
        <tbody>
            {sessions.length > 0 ? (
                sessions.map((session) => (
                    <tr key={session.id}>
                        <td className=' border-b px-4 py-2 text-center'>{session.doctorname}</td>
                        <td className=' border-b px-4 py-2 text-center'>{session.diagnosis}</td>
                        <td className=' border-b px-4 py-2 text-center'>{session.date}</td>
                        <td className=' border-b px-4 py-2 text-center max-w-48'>{session.note || 'N/A'}</td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="5" className='border  px-4 py-2 text-center'>No sessions found</td>
                </tr>
            )}
        </tbody>
    </table>
    <div className='relative top-8 left-1/2 w-40 p-2'>Take Care!</div>
</div>

            </div>
        </div>
    );
}