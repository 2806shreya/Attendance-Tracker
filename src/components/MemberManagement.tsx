"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createMember, getMembers, deleteMember, updateMember } from "@/lib/store";
import type { Member } from "@/types/auth";

export function MemberManagement() {
  const [members, setMembers] = useState<Member[]>(getMembers());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const handleAddMember = () => {
    if (!name.trim() || !email.trim()) return;

    const newMember = createMember({ name, email });
    setMembers([...members, newMember]);
    setName("");
    setEmail("");
  };

  const handleDeleteMember = (id: string) => {
    if (confirm("Are you sure you want to delete this member?")) {
      deleteMember(id);
      setMembers(members.filter((m) => m.id !== id));
    }
  };

  const handleEditMember = (member: Member) => {
    setEditingId(member.id);
    setEditName(member.name);
    setEditEmail(member.email);
  };

  const handleSaveEdit = (id: string) => {
    if (!editName.trim() || !editEmail.trim()) return;

    const updated = updateMember(id, { name: editName, email: editEmail });
    if (updated) {
      setMembers(members.map((m) => (m.id === id ? updated : m)));
      setEditingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Add New Member</h2>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Member Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={handleAddMember} className="w-full">
            Add Member
          </Button>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800 border-b border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Joined</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr
                  key={member.id}
                  className="border-b border-gray-700 hover:bg-gray-800 transition"
                >
                  {editingId === member.id ? (
                    <>
                      <td className="px-6 py-3">
                        <Input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="h-8"
                        />
                      </td>
                      <td className="px-6 py-3">
                        <Input
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                          className="h-8"
                        />
                      </td>
                      <td className="px-6 py-3 text-gray-400">
                        {new Date(member.joinedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-3 flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleSaveEdit(member.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </Button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-3">{member.name}</td>
                      <td className="px-6 py-3 text-gray-400">{member.email}</td>
                      <td className="px-6 py-3 text-gray-400">
                        {new Date(member.joinedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-3 flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditMember(member)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteMember(member.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-gray-400 text-sm">
        Total Members: <span className="font-bold">{members.length}</span>
      </div>
    </div>
  );
}
