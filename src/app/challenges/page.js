'use client';

import ChallengeForm from '@/components/layout/ChallangesForm';
import Navbar from '@/components/layout/Navbar';

export default function ChallengesPage() {
  return (
    <div className="p-8">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Create new challenge</h1>
      <ChallengeForm />
    </div>
  );
}
