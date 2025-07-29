import ChallengeFormEdit from "../../../components/layout/ChallangesForm"; // adjust path if needed

export default function EditChallengePage({ params }) {
  const { id } = params;

  return (
    <div className="p-6">
      <ChallengeFormEdit challengeId={id} />
    </div>
  );
}
