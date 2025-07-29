// This is a Server Component
import Navbar from "../../components/layout/Navbar";
import ChallengesList from "../../components/layout/ChallengesList";

export default function DashboardPage() {
  return (
    <div>
      <Navbar />
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Challenges</h1>
        <ChallengesList />
      </main>
    </div>
  );
}
