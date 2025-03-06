"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import '../dashboard/dashboard.css';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from 'next/navigation';
import LoadingSpinner from '../../components/loading';
import Image from 'next/image';

// Define the type for a session
interface Session {
  id: number;
  doctorname: string;
  diagnosis: string;
  date: string; // Keep this as a string for displaying in dd-mm-yyyy format
  note?: string; // Note is optional
  fileUrl?: string; // Add fileUrl for the prescription image
}

export default function Dashboard() {
  const [sessions, setSessions] = useState<Session[]>([]); // Specify the state type as an array of Session
  const [selectedSession, setSelectedSession] = useState<Session | null>(null); // Track the selected session for the modal
  const { isAuthenticated, isLoading } = useKindeBrowserClient(); // Add isLoading to check loading state
  const router = useRouter();

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

  // Redirect if not authenticated and loading is complete
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/'); // Use router.push instead of redirect
    }
  }, [isLoading, isAuthenticated, router]);

  // Show a loading indicator while checking authentication
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Function to handle row click and open modal
  const handleRowClick = (session: Session) => {
    setSelectedSession(session);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedSession(null);
  };

  return (
    <div className='bg-white w-full min-h-screen h-full'>
      <div id='head'>
        <meta name="viewport" content="device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="mainlogo.png" type="image/x-icon" />
        <title>Healbook: Your Health Data Vault</title>
      </div>
      <div>
        <div id="header" className="w-full bg-white min-h-[4rem] shadow flex justify-between items-center px-4 border-b-2">
          <Link href="/dashboard" className="w-1/12 ml-2 sm:ml-4 min-w-32">
            <img src="logomainwhite.png" id="logo" alt="logo" />
          </Link>
          <Link href="/profile" className="inline-flex mr-2 sm:mx-4">
            <img src="10061438.png" id="pfp" alt="profile" className="w-8 hover:w-8" />
          </Link>
        </div>
        <div className='flex w-full justify-end px-7 py-10'><Link href='/dashboard/createSession'><button id='createSession' className='font-bold text-lg w-48 h-12 rounded-[12px] bg-[#0cc0df] text-white hover:bg-white hover:border-[#0cc0df] border-2 hover:text-[#0cc0df] transition-all'>
          + New Session
        </button></Link></div>
        <div className='flex flex-col flex-grow items-center border border-[#dddddd] p-7 m-7 rounded-[12px] bg-[#f2f2f2]'>
        <div className='flex justify-between items-center w-full pb-6 py-2'>
        <form className='space-x-2 left-8 hidden md:block'>
          <input id='searchdocordiag' placeholder='Enter Doctor name or Diagnosis' className='border-2 text-base w-72 h-10 shadow p-2'></input>
          <button type="submit" className='border-2 font-medium text-black bg-white w-20 h-10 shadow rounded-lg hover:border-2 hover:border-black transition-colors'>submit</button>
        </form>
        <button id='Sort' className='border-2 font-medium text-black bg-white w-20 h-10 shadow rounded-lg hover:text-black hover:border-2 hover:border-black transition-colors right-8 hidden md:block'>Sort</button>
        </div>
        <div className='min-h-96 bg-white border-[#e0e0e0] border border-r-6 w-full'>
          <table className='min-w-full'>
            <thead>
              <tr>
                <th className=' bg-gray-100 border-opacity-40 px-4 py-2 text-center'>Doctor Name</th>
                <th className=' bg-gray-100 border-opacity-40 px-4 py-2 text-center'>Diagnosis</th>
                <th className=' bg-gray-100 border-opacity-40 px-4 py-2 text-center'>Date</th>
                <th className=' bg-gray-100 border-opacity-40 px-4 py-2 text-center'>Note</th>
                <th className=' bg-gray-100 border-opacity-40 px-4 py-2 text-center'>Image</th>
              </tr>
            </thead>
            <tbody>
              {sessions.length > 0 ? (
                sessions.map((session) => (
                  <tr key={session.id} onClick={() => handleRowClick(session)} className='cursor-pointer hover:bg-gray-50'>
                    <td className=' border-b px-4 py-2 text-center'>{session.doctorname}</td>
                    <td className=' border-b px-4 py-2 text-center'>{session.diagnosis}</td>
                    <td className=' border-b px-4 py-2 text-center'>{session.date}</td>
                    <td className=' border-b px-4 py-2 text-center max-w-48'>{session.note || 'N/A'}</td>
                    <td className=' border-b px-4 py-2 text-center flex gap-6 justify-center items-center'>
                      {session.fileUrl ? (
                        <Image src={session.fileUrl} alt="Attachment" width={40} height={40} className='rounded-md min-h-16 w-auto max-h-24' />
                      ) : (
                        'No attachment'
                      )}
                      {session.fileUrl ? (
                        "Attached file"
                      ) : (
                        'No attachment'
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className='border px-4 py-2 text-center'>No sessions found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div></div>
      </div>

      {/* Modal for displaying session details */}
      {selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full mx-4 flex">
            {/* Image Section */}
            <div className="w-1/2 flex items-center justify-center">
              {selectedSession.fileUrl ? (
                <Image
                  src={selectedSession.fileUrl}
                  alt="Prescription"
                  width={400}
                  height={400}
                  className="rounded-lg"
                />
              ) : (
                <p className="text-gray-500">No image available</p>
              )}
            </div>
            {/* Data Section */}
            <div className="w-1/2 pl-6">
            <div className='flex justify-between items-center mb-8'>
              <h2 className="text-2xl font-bold">Session Details </h2> <button
                onClick={closeModal}
                className=" bg-[#0cc0df] text-white px-4 py-2 rounded-lg hover:bg-[#0aa8c7] transition-colors"
              >
                Close
              </button>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Doctor Name:</p>
                  <p className="font-semibold">{selectedSession.doctorname}</p>
                </div>
                <div>
                  <p className="text-gray-600">Diagnosis:</p>
                  <p className="font-semibold">{selectedSession.diagnosis}</p>
                </div>
                <div>
                  <p className="text-gray-600">Date:</p>
                  <p className="font-semibold">{selectedSession.date}</p>
                </div>
                <div>
                  <p className="text-gray-600">Note:</p>
                  <p className="font-semibold">{selectedSession.note || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}