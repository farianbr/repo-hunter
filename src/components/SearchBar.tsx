import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

interface Props {
  onSearch: (username: string) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const match = url.match(/github\.com\/([^/]+)/);
    if (match) {
      onSearch(match[1]); // Extract username
    } else {
      alert("Enter a valid GitHub URL");
    }
  };

  return (
    <form className="flex md:flex-row md:justify-center items-center flex-col" onSubmit={handleSubmit}>
      <div className="w-full md:w-3/4 mx-6">
        <LabelInputContainer>
        <Input
          className="bg-zinc-800 text-white"
          id="firstname"
          placeholder="Enter GitHub page link"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </LabelInputContainer>
      </div>
      <div className="my-4 md:my-0 ">
        <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="bg-black text-center  text-white flex items-center py-1 space-x-2"
      >
        <span>Find Repos</span>
      </HoverBorderGradient>
      </div>
    </form>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

export default SearchBar;
