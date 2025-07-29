"use client";

import Link from 'next/link';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css'; // Import styles for toastify

export default function ChallengesList() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadChallenges() {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_JSON_SERVER_URL}/challenges`);
      if (!res.ok) throw new Error('Failed to fetch challenges');
      const data = await res.json();
      setChallenges(data);
    } catch (e) {
      toast.error('Fehler beim Laden der Challenges');
    }
    setLoading(false);
  }

  useEffect(() => {
    loadChallenges();
  }, []);

  async function deleteChallenge(id) {
    if (!confirm('Bist du sicher, dass du die Challenge löschen willst?')) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_JSON_SERVER_URL}/challenges/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Fehler beim Löschen');
      toast.success('Challenge erfolgreich gelöscht');
      loadChallenges();
    } catch (e) {
      toast.error('Fehler beim Löschen der Challenge');
    }
  }

  if (loading) return <p>Lädt...</p>;

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <Link
          href="/challenge-form"
          className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 transition"
        >
          Neue Challenge
        </Link>
      </div>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Title</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Level</th>
            <th className="border p-2">Created at</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {challenges.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4">
                Keine Challenges gefunden
              </td>
            </tr>
          ) : (
            challenges.map(({ id, title, category, level, createdAt }) => (
              <tr key={id} className="hover:bg-gray-50">
                <td className="border p-2">{title}</td>
                <td className="border p-2">{category}</td>
                <td className="border p-2">{level}</td>
                <td className="border p-2">{createdAt}</td>
                <td className="border p-2 space-x-2">
                  <Link
                    href={`/challenge-edit/${id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteChallenge(id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
