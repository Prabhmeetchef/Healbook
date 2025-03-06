"use client";
import "../profile/profile.css";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingSpinner from "../../components/loading";
import Link from "next/link";

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useKindeBrowserClient();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
    <div id="header" className="w-full bg-white min-h-[4rem] shadow flex justify-between items-center px-4 border-b-2">
          <Link href="/dashboard" className="w-1/12 ml-2 sm:ml-4 min-w-32">
            <img src="logomainwhite.png" id="logo" alt="logo" />
          </Link>
          <Link href="/profile" className="inline-flex my-2 sm:mx-4">
            <img src="10061438.png" id="pfp" alt="profile" className="w-8 hover:w-8" />
          </Link>
        </div>
    <section className="flex flex-col items-center justify-center bg-gray-100 p-6 h-[calc(100vh-4rem)]">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile</h1>


        <p className="text-xl font-semibold text-gray-700">{user?.given_name} {user?.family_name}</p>
        <p className="text-gray-500">{user?.email}</p>

        <a
          href="/dashboard"
          className="my-6 inline-block bg-[#0aa8c7] text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-[#49dcf9] transition-all font-bold"
        >
          Go to Dashboard
        </a>
      </div>
    </section>
    </>
  );
}