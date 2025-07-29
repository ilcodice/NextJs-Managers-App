"use client";

const PenIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M12.146.854a.5.5 0 0 1 .708 0l2.292 2.292a.5.5 0 0 1 0 .708l-8.5 8.5a.5.5 0 0 1-.168.11l-4 1.5a.5.5 0 0 1-.65-.65l1.5-4a.5.5 0 0 1 .11-.168l8.5-8.5zM11.207 2L3 10.207V12h1.793L14 4.793 11.207 2z" />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M5.5 5.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0v-6a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0v-6a.5.5 0 0 1 .5-.5z" />
    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1 0-2h3.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1H14a1 1 0 0 1 1 1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118z" />
  </svg>
);

export default function DashboardList({ challenges }) {
  return (
    <>
      {/* Header */}
      <div className="hidden md:flex font-bold border-b border-gray-300 pb-2 mb-4">
        <div className="flex-1">Title</div>
        <div className="flex-1">Category</div>
        <div className="flex-1">Difficulty</div>
        <div className="flex-1">Created At</div>
        <div className="w-24 text-center">Actions</div>
      </div>

      {/* Rows */}
      {challenges.map(({ id, title, category, difficulty, createdAt }) => (
        <div
          key={id}
          className="flex flex-col md:flex-row items-start md:items-center border-b border-gray-200 py-3"
        >
          <div className="flex-1 mb-1 md:mb-0 font-medium">{title}</div>
          <div className="flex-1 mb-1 md:mb-0">{category}</div>
          <div className="flex-1 mb-1 md:mb-0">{difficulty}</div>
          <div className="flex-1 mb-1 md:mb-0">
            {new Date(createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
          <div className="w-24 flex justify-center space-x-4">
            <button
              aria-label={`Edit challenge ${title}`}
              className="text-blue-600 hover:text-blue-800"
              onClick={() => alert(`Edit challenge ${id}`)}
            >
              <PenIcon />
            </button>
            <button
              aria-label={`Delete challenge ${title}`}
              className="text-red-600 hover:text-red-800"
              onClick={() => alert(`Delete challenge ${id}`)}
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
