import { TimeZoneClock } from "@/components/TimeZoneClock";

export default function TimeZonePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="sticky top-0 bg-gray-900/80 backdrop-blur border-b border-gray-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="font-serif text-2xl font-bold">Attendance Tracker</h1>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TimeZoneClock />
      </main>
    </div>
  );
}
