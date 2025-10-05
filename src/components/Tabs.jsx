export default function Tabs({ tabs, activeTab, onChange }) {
  const formatLabel = (label) => {
    return label
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="w-full">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex gap-6 overflow-x-auto" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onChange(tab)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-sm
                focus:outline-none transition-colors duration-200
                ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              {formatLabel(tab)}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}