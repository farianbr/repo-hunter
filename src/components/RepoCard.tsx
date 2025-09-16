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
    <div
      className="
        w-full max-w-md bg-slate-900 rounded-xl shadow-lg 
        p-4 sm:p-6 space-y-3 sm:space-y-4
      "
    >
      {/* Repo name */}
      <h1 className="text-xl sm:text-2xl font-semibold text-white break-words">
        📂 {repo.name}
      </h1>

      {/* Stars count */}
      <p className="text-slate-300 text-sm sm:text-base">
        ⭐ <span className="font-medium">{repo.stargazerCount}</span> Stars
      </p>

      {/* Top star gazers */}
      {repo.stargazerCount > 0 && (
        <div>
          <p className="text-slate-200 font-medium mb-1 sm:mb-2 text-sm sm:text-base">
            Top 5 Star Gazers:
          </p>
          <ul className="space-y-1 sm:space-y-2">
            {repo.stargazers.nodes.map((user, i) => (
              <li
                key={i}
                className="flex items-center gap-2 sm:gap-3 p-1 sm:p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                {/* Rank */}
                <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-indigo-600 text-white text-xs sm:text-sm font-bold">
                  {i + 1}
                </span>

                {/* Username */}
                <span className="text-slate-200 font-medium text-sm sm:text-base truncate">
                  @{user.login}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Commits */}
      <p className="text-slate-300 text-sm sm:text-base">
        📝 Commits:{" "}
        <span className="font-medium">
          {repo.defaultBranchRef?.target?.history?.totalCount ?? 0}
        </span>
      </p>

      {/* Dates */}
      <p className="text-slate-300 text-sm sm:text-base">
        📅 Created:{" "}
        <span className="font-medium">{formatDate(repo.createdAt)}</span>
      </p>
      <p className="text-slate-300 text-sm sm:text-base">
        🔄 Updated:{" "}
        <span className="font-medium">{formatDate(repo.updatedAt)}</span>
      </p>

      {/* Repo link */}
      <p className="text-slate-300 text-sm sm:text-base">
        🔗 Link:{" "}
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="
            text-indigo-400 hover:underline 
            inline-block max-w-full truncate align-bottom
          "
          title={repo.url}
        >
          {repo.url}
        </a>
      </p>
    </div>
  );
};

export default RepoCard;
