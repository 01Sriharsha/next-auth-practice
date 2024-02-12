import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

type SocialProps = {};

export const Social = ({}: SocialProps) => {
  return (
    <div className="flex items-center justify-center gap-x-8 w-full">
      <button>
        <FcGoogle className="h-6 w-6" />
      </button>
      <button>
        <FaGithub className="h-6 w-6" />
      </button>
    </div>
  );
};
