"use client";
import '../createSession/sessioncss.css'
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';



interface SessionForm{
    doctorname: string;
    diagnosis: string;
    date: Date;
    note: string;
}
export default function CreateSession(){
    const {register, handleSubmit} = useForm<SessionForm>();
    const router = useRouter();
    return(
    <div className='bg-[#0cc0df] w-full min-h-screen h-full'>
    <div id='head'>
    <meta
      name="viewport"
      content="device-width,
    initial-scale=1.0"
    />
    <link rel="shortcut icon" href="mainlogo.png" type="image/x-icon" />
    <title>Healbook: Your Health Data Vault</title>
    </div>
    <div>
    <div id="header" className="w-full bg-white min-h-[6rem] shadow flex justify-between items-center px-4">
        <Link href="/" className="w-1/6 ml-2 sm:ml-4">
        <img src="/logomainwhite.png" id="logo" alt="logo"/>
        </Link>
        <a href="profile" className="inline-flex mr-2 sm:mr-4"><img src="/10061438.png" id="pfp" alt="profile" className="w-10"/></a>
    </div>
    <div className='min-h-100 w-1/2 bg-white absolute top-48 left-1/4 justify-center'>
    <form
    className='relative left-6 top-12 space-y-6' 
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
    <div className='flex items-center space-x-2'>
        <label htmlFor="doctorName">Doctor&apos;s Name</label>
        <input 
            id="doctorName" 
            placeholder='Can only be 10 letters long' 
            maxLength={10} 
            required 
            className='border-2 p-1 w-64'
            {...register('doctorname')}
        />
    </div>
    <div className='flex items-center space-x-11'>
        <label htmlFor="diagnosis">Diagnosis</label>
        <input 
            id="diagnosis" 
            placeholder='Can only be 20 letters long' 
            maxLength={20} 
            required
            className='border-2 p-1 w-64'
            {...register('diagnosis')}
        />
    </div>
    <div className='flex items-center space-x-20'>
        <label htmlFor="date">Date</label>
        <input 
            id="date" 
            type="date" 
            required 
            className='border-2 p-1 w-64'
            {...register('date')}
        />
    </div>
    <div className='flex items-center space-x-20'>
        <label htmlFor="note">Note</label>
        <textarea 
            id="note" 
            placeholder='Enter any additional notes here' 
            rows={1} 
            maxLength={100} 
            className='border-2 p-1 w-64'
            {...register('note')}
        />
    </div>
    <button type="submit" className='bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-colors rounded p-2 w-32 relative left-60 top-4'>Submit</button>
</form>
    </div>
    </div>
    </div>
    );
}
