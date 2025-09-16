import React from "react";

interface Repo {
  name: string;
  stargazerCount: number;
  stargazers: { nodes: { login: string }[] };
  defaultBranchRef?: {
    target?: { history?: { totalCount: number } };
  };
  createdAt: string;
  updatedAt: string;
  url: string;
}

const RepoCard: React.FC<{ repo: Repo }> = ({ repo }) => {
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="max-w-md w-full bg-slate-900 rounded-xl shadow-lg p-6 space-y-4">
      {/* Repo name */}
      <h1 className="text-2xl font-semibold text-white">📂 {repo.name}</h1>

      {/* Stars count */}
      <p className="text-slate-300">
        ⭐ <span className="font-medium">{repo.stargazerCount}</span> Stars
      </p>

      {/* Top star gazers (only if stars exist) */}
      {repo.stargazerCount > 0 && (
        <div>
          <p className="text-slate-200 font-medium mb-2">Top 5 Star Gazers:</p>
          <ul className="space-y-2">
            {repo.stargazers.nodes.map((user, i) => (
              <li
                key={i}
                className="flex items-center gap-3 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                {/* Rank */}
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white text-sm font-bold">
                  {i + 1}
                </span>

                {/* Username */}
                <span className="text-slate-200 font-medium">
                  @{user.login}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Commits */}
      <p className="text-slate-300">
        📝 Commits:{" "}
        <span className="font-medium">
          {repo.defaultBranchRef?.target?.history?.totalCount ?? 0}
        </span>
      </p>

      {/* Dates */}
      <p className="text-slate-300">
        📅 Created:{" "}
        <span className="font-medium">{formatDate(repo.createdAt)}</span>
      </p>
      <p className="text-slate-300">
        🔄 Updated:{" "}
        <span className="font-medium">{formatDate(repo.updatedAt)}</span>
      </p>

      {/* Repo link */}
      <p className="text-slate-300">
        🔗 Link:{" "}
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-400 hover:underline inline-block max-w-[220px]  truncate align-bottom"
          title={repo.url} // shows full URL on hover
        >
          {repo.url}
        </a>
      </p>
    </div>
  );
};

export default RepoCard;
