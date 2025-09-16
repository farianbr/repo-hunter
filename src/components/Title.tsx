import { SparklesCore } from "./ui/sparkles";

const Title = () => {
  return (
    <div className="h-100 md:h-130 w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      {/* Title with logo */}
      <div className="flex items-center gap-3">
        <img
          src="/logo.svg"
          alt="Repo Hunter Logo"
          className="h-10 w-10 md:h-14 md:w-14"
        />
        <h1 className="md:text-5xl text-3xl font-bold text-center text-white relative">
          Repo Hunter
        </h1>
      </div>

      {/* Sparkles effect */}
      <div className="w-[40rem] h-40 relative mt-6">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core sparkles */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={400}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial mask */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
};

export default Title;
