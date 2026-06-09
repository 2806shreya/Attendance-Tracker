"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  createMeeting,
  getMeetings,
  deleteMeeting,
  updateMeeting,
} from "@/lib/store";
import type { Meeting } from "@/types/auth";

export function MeetingManagement() {
  const [meetings, setMeetings] = useState<Meeting[]>(getMeetings());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddMeeting = () => {
    if (!title.trim() || !date || !startTime || !endTime) return;

    const newMeeting = createMeeting({
      title,
      description,
      date: new Date(date),
      startTime,
      endTime,
      location,
      createdBy: "admin@attendance.local",
    });
    setMeetings([...meetings, newMeeting]);
    resetForm();
  };

  const handleDeleteMeeting = (id: string) => {
    if (confirm("Are you sure you want to delete this meeting?")) {
      deleteMeeting(id);
      setMeetings(meetings.filter((m) => m.id !== id));
    }
  };

  const handleEditMeeting = (meeting: Meeting) => {
    setEditingId(meeting.id);
    setTitle(meeting.title);
    setDescription(meeting.description);
    setDate(meeting.date.toISOString().split("T")[0]);
    setStartTime(meeting.startTime);
    setEndTime(meeting.endTime);
    setLocation(meeting.location);
  };

  const handleSaveEdit = (id: string) => {
    const updated = updateMeeting(id, {
      title,
      description,
      date: new Date(date),
      startTime,
      endTime,
      location,
    });
    if (updated) {
      setMeetings(meetings.map((m) => (m.id === id ? updated : m)));
      setEditingId(null);
      resetForm();
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setStartTime("");
    setEndTime("");
    setLocation("");
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">
          {editingId ? "Edit Meeting" : "Create New Meeting"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Meeting Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="md:col-span-2"
          />
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <Input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <div className="md:col-span-2 flex gap-2">
            <Button
              onClick={editingId ? () => handleSaveEdit(editingId) : handleAddMeeting}
              className="flex-1"
            >
              {editingId ? "Update Meeting" : "Create Meeting"}
            </Button>
            {editingId && (
              <Button
                variant="outline"
                onClick={() => {
                  setEditingId(null);
                  resetForm();
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {meetings.map((meeting) => (
          <div
            key={meeting.id}
            className="bg-gray-900 border border-gray-700 rounded-lg p-4 hover:border-blue-500 transition"
          >
            <h3 className="text-lg font-bold mb-2">{meeting.title}</h3>
            {meeting.description && (
              <p className="text-gray-400 text-sm mb-3">{meeting.description}</p>
            )}
            <div className="space-y-2 text-sm text-gray-400 mb-4">
              <div>📅 {new Date(meeting.date).toLocaleDateString()}</div>
              <div>
                🕐 {meeting.startTime} - {meeting.endTime}
              </div>
              {meeting.location && <div>📍 {meeting.location}</div>}
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEditMeeting(meeting)}
                className="flex-1"
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDeleteMeeting(meeting.id)}
                className="flex-1"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {meetings.length === 0 && !editingId && (
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-12 text-center">
          <p className="text-gray-400">No meetings scheduled yet</p>
        </div>
      )}
    </div>
  );
}
