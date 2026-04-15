import { FiLoader } from "react-icons/fi";

const Loader = ({ message = "Loading…" }) => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
      {/* Spinner */}
      <FiLoader className="h-10 w-10 animate-spin text-primary" />

      {/* Message */}
      <p className="mt-4 text-sm font-medium text-muted-foreground">
        {message}
      </p>
    </div>
  );
};

export default Loader;
