export default function Tabs({ tabs, activeTab, onChange, data }) {
  const formatLabel = (label) =>
    label.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

  // Safely calculate counts
  const tabCounts = tabs.reduce((acc, tab) => {
    acc[tab] = data && data[tab] ? data[tab].length : 0;
    return acc;
  }, {});

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <nav className="flex gap-2 py-2 mx-2 min-w-max">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => onChange(tab)}
              className={`
                relative px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400
                ${isActive
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30 scale-105"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:scale-102"}
              `}
            >
              <span className="flex items-center gap-2">
                {formatLabel(tab)}
                {tabCounts[tab] > 0 && (
                  <span
                    className={`
                      text-xs px-2 py-0.5 rounded-full font-bold
                      ${isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"}
                    `}
                  >
                    {tabCounts[tab]}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
