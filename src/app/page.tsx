import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="sticky top-0 bg-gray-900/80 backdrop-blur border-b border-gray-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="font-serif text-2xl font-bold">Attendance Tracker</h1>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-1 flex-col items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="text-center space-y-8">
            <div>
              <h1 className="font-serif text-7xl font-bold mb-4">Attendance Tracker</h1>
              <p className="text-gray-400 text-xl">Manage meetings, members, and attendance with ease</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button className="px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700">
                  Admin Login
                </Button>
              </Link>
              <Link href="/clock">
                <Button className="px-8 py-6 text-lg" variant="outline">
                  World Clock
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <div className="text-3xl mb-2">📅</div>
                <h3 className="font-bold mb-2">Meeting Management</h3>
                <p className="text-gray-400 text-sm">Create, edit, and delete meetings easily</p>
              </div>

              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <div className="text-3xl mb-2">👥</div>
                <h3 className="font-bold mb-2">Member Management</h3>
                <p className="text-gray-400 text-sm">Add, remove, and manage team members</p>
              </div>

              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <div className="text-3xl mb-2">📊</div>
                <h3 className="font-bold mb-2">Export Data</h3>
                <p className="text-gray-400 text-sm">Export attendance data as CSV or JSON</p>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 max-w-2xl mx-auto">
              <h3 className="font-bold text-lg mb-4">Demo Credentials</h3>
              <div className="space-y-2 text-left font-mono text-sm bg-gray-800 p-4 rounded">
                <div>Email: <span className="text-green-400">admin@attendance.local</span></div>
                <div>Password: <span className="text-green-400">admin123</span></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
