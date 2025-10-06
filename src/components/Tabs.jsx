export default function Tabs({ tabs, activeTab, onChange }) {
  const formatLabel = (label) =>
    label.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className="w-full">
      <nav className="flex flex-wrap gap-2 justify-start sm:justify-start py-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => onChange(tab)}
              className={`
                px-4 py-2 text-sm font-medium rounded-full transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400
                ${isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"}
              `}
            >
              {formatLabel(tab)}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
