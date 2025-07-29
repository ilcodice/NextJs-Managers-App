import ChallengeForm from "../../components/ChallengeForm";

export default function NewChallenge() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Neue Challenge erstellen</h1>
      <ChallengeForm />
    </main>
  );
}
