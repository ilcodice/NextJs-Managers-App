import Navbar from '../components/Navbar';
import ChallengesList from '../components/ChallengesList';

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto mt-8">
        <ChallengesList />
      </main>
    </>
  );
}
