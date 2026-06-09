"use client";

import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 px-4">
      <div className="w-full max-w-md">
        <div className="mb-12 text-center">
          <h1 className="font-serif text-5xl font-bold mb-2">Attendance Tracker</h1>
          <p className="text-gray-400">Admin Portal</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
