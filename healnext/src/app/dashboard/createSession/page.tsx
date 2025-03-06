"use client";
import '../createSession/sessioncss.css';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

interface SessionForm {
  doctorname: string;
  diagnosis: string;
  date: string;
  note?: string;
}

export default function CreateSession() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SessionForm>();
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Handle image selection with preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      // Validate file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setSubmitError("Image size must be less than 5MB");
        setImageFile(null);
        setImagePreview(null);
        e.target.value = '';
        return;
      }
      
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/heic'];
      if (!validTypes.includes(file.type)) {
        setSubmitError("Please upload a valid image file (JPEG, PNG, GIF, WEBP, HEIC)");
        setImageFile(null);
        setImagePreview(null);
        e.target.value = '';
        return;
      }
      
      setImageFile(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const onSubmit = async (data: SessionForm) => {
    try {
      setSubmitError(null);
      setUploadProgress(0);
      
      // Convert date to 'dd-mm-yyyy' format
      const date = new Date(data.date);
      const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
      
      // Create FormData object for multipart/form-data submission
      const formData = new FormData();
      formData.append('doctorname', data.doctorname);
      formData.append('diagnosis', data.diagnosis);
      formData.append('date', formattedDate);
      
      if (data.note) {
        formData.append('note', data.note);
      }
      
      // Append the image file if it exists
      if (imageFile) {
        formData.append('prescriptionImage', imageFile);
        
        // Add upload progress tracking with fetch
        const xhr = new XMLHttpRequest();
        
        // Track upload progress
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const percentComplete = Math.round((event.loaded / event.total) * 100);
            setUploadProgress(percentComplete);
          }
        });
        
        // Set up promise to handle the XHR response
        const uploadPromise = new Promise((resolve, reject) => {
          xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
              try {
                const response = JSON.parse(xhr.responseText);
                resolve(response);
              } catch (e: Error | unknown) {
                if (e instanceof Error) {
                  reject(new Error('Invalid response format: ' + e.message));
                } else {
                  reject(new Error('Invalid response format'));
                }
              }
            } else {
              reject(new Error(`Upload failed with status ${xhr.status}`));
            }
          };
          
          xhr.onerror = function() {
            reject(new Error('Network error during upload'));
          };
        });
        
        // Configure and send the request
        xhr.open('POST', '/api/sessions', true);
        xhr.send(formData);
        
        // Wait for the upload to complete
        await uploadPromise;
      } else {
        // If no image, use regular fetch without progress tracking
        const response = await fetch('/api/sessions', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create session');
        }
      }
      
      // Redirect to dashboard on success
      router.push('/dashboard');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error instanceof Error ? error.message : 'An unknown error occurred');
      setUploadProgress(0);
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
          <Link href="/dashboard" className="w-1/12 ml-2 sm:ml-4 min-w-32"><img src="/logomainwhite.png" id="logo" alt="logo" /></Link>
          <a href="/profile" className="inline-flex mx-2 sm:mx-4"><img src="/10061438.png" id="pfp" alt="profile" className="w-8 hover:w-8" /></a>
        </div>
      </div>
      <div className="pt-24 flex flex-col items-center justify-center flex-1 px-4 py-8">
        <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 space-y-6">
          <h1 className="text-xl font-bold mb-4 text-gray-700">Create a New Session</h1>
          
          {submitError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{submitError}</span>
              <button 
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                onClick={() => setSubmitError(null)}
              >
                <span className="text-xl">&times;</span>
              </button>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <label htmlFor="doctorName" className="mb-1 text-gray-600">Doctor&apos;s Name</label>
              <input
                id="doctorName"
                placeholder="Can only be 10 letters long"
                maxLength={10}
                disabled={isSubmitting}
                className="border-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                {...register('doctorname', { required: "Doctor's name is required" })}
              />
              {errors.doctorname && <p className="text-red-500 text-sm py-1">{errors.doctorname.message}</p>}
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="diagnosis" className="mb-1 text-gray-600">Diagnosis</label>
              <input
                id="diagnosis"
                placeholder="Can only be 20 letters long"
                maxLength={20}
                disabled={isSubmitting}
                className="border-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                {...register('diagnosis', { required: "Diagnosis is required" })}
              />
              {errors.diagnosis && <p className="text-red-500 text-sm mt-1">{errors.diagnosis.message}</p>}
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="date" className="mb-1 text-gray-600">Date</label>
              <input
                id="date"
                type="date"
                disabled={isSubmitting}
                className="border-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                {...register('date', { required: "Date is required" })}
              />
              {errors.date && <p className="text-red-500 text-sm my-1">{errors.date.message}</p>}
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="note" className="mb-1 text-gray-600">Note</label>
              <textarea
                id="note"
                placeholder="Enter any additional notes here"
                rows={3}
                maxLength={100}
                disabled={isSubmitting}
                className="border-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                {...register('note')}
              />
            </div>

            {/* Image Upload Section with Preview */}
            <div className="flex flex-col">
              <label htmlFor="prescriptionImage" className="mb-1 text-gray-600">Prescription Image</label>
              <input
                id="prescriptionImage"
                type="file"
                accept="image/*"
                disabled={isSubmitting}
                className="border-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                onChange={handleImageChange}
              />
              <p className="text-gray-500 mt-1 text-sm">Upload a prescription image (optional, max 5MB)</p>
              
              {/* Upload Progress */}
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div 
                    className="bg-cyan-600 h-2.5 rounded-full" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}
              
              {/* Image Preview */}
              {imagePreview && (
                <div className="py-2">
                  <p className="text-gray-600 mb-1">Image Preview:</p>
                  <img 
                    src={imagePreview} 
                    alt="Prescription preview" 
                    className="max-w-full h-auto max-h-48 border rounded-md"
                  />
                </div>
              )}
            </div>

            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-md border border-blue-200">
              <p className="font-medium">HIPAA Compliance Notice:</p>
              <p>Images uploaded are encrypted and stored securely following HIPAA guidelines. Only you and authorized healthcare providers can access this information.</p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-[#0cc0df] text-white font-medium py-2 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-cyan-700'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}