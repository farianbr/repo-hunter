import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client/react";
import { GET_USER_REPOS } from "../graphql/queries";
import SearchBar from "../components/SearchBar";
import RepoCard from "../components/RepoCard";
import Modal from "../components/Modal";
import { TracingBeam } from "../components/ui/tracing-beam";
import Title from "@/components/Title";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { LoaderOne } from "@/components/ui/loader";

interface Repo {
  name: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  stargazerCount: number;
  stargazers: { nodes: { login: string }[] };
  defaultBranchRef?: {
    target?: { history?: { totalCount: number } };
  };
}

interface UserReposData {
  user: {
    repositories: {
      nodes: Repo[];
    };
  };
}

interface UserReposVars {
  username: string;
}

const Home: React.FC = () => {
  const [username, setUsername] = useState("");
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);

  const [getRepos, { loading, data, error }] = useLazyQuery<
    UserReposData,
    UserReposVars
  >(GET_USER_REPOS);

  const repoCount = data?.user?.repositories?.nodes?.length || 0;

  const words = [
    { text: "Found", className: "text-white" },
    {
      text: String(repoCount),
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: repoCount === 1 ? "repository" : "repositories",
      className: "text-white",
    },
    { text: "from", className: "text-white" },
    {
      text: username,
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  const handleSearch = (user: string) => {
    setUsername(user);
    getRepos({ variables: { username: user } });
  };

  return (
    <TracingBeam
      key={username + (data?.user?.repositories?.nodes?.length || 0)}
      className="px-6"
    >
      <div className="w-full max-w-5xl mx-auto antialiased pt-4 relative">
        <Title />

        <SearchBar onSearch={handleSearch} />

        {loading && (
          <div className="text-gray-400 my-4">
            <LoaderOne />
          </div>
        )}
        {error && <p className="text-red-500">Error: {error.message}</p>}

        {data && (
          <TypewriterEffectSmooth words={words} className="justify-center" />
        )}

        <div
          className={`
    w-full max-w-3xl mx-auto antialiased pt-4 relative
    grid gap-4
    ${repoCount > 5 ? "grid-cols-2" : "grid-cols-1"}
  `}
        >
          {repoCount > 0
            ? data!.user!.repositories!.nodes!.map((repo, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedRepo(repo)}
                  className="bg-gray-800 border border-gray-700 text-white p-5 rounded-xl 
                   cursor-pointer hover:bg-gray-700 hover:shadow-lg 
                   transition duration-200 ease-in-out flex flex-col"
                >
                  {/* Label */}
                  <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">
                    Repository
                  </p>

                  {/* Repo name */}
                  <p className="md:text-lg text-sm font-semibold break-words mb-3">
                    {repo.name}
                  </p>

                  {/* Creation date */}
                  <p className="md:text-sm text-xs text-gray-400 mt-auto">
                    Created on{" "}
                    <span className="text-gray-300 font-medium md:text-sm text-xs">
                      {new Date(repo.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </p>
                </div>
              ))
            : username &&
              !loading && (
                <p className="text-gray-400">
                  No repositories found for {username}
                </p>
              )}
        </div>

        {/* Modal with Repo details */}
        <Modal isOpen={!!selectedRepo} onClose={() => setSelectedRepo(null)}>
          {selectedRepo && <RepoCard repo={selectedRepo} />}
        </Modal>
      </div>
    </TracingBeam>
  );
};

export default Home;
