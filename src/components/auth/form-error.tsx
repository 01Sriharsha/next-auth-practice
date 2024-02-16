import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

type FormErrorProps = {
  error: string;
};

export const FormError = ({ error }: FormErrorProps) => {
  return (
    <div className="w-full bg-red-500/10 text-red-600 h-8 rounded-md flex items-center justify-center">
      <p className="text-sm flex items-center gap-1">
        <ExclamationTriangleIcon />
        {error}
      </p>
    </div>
  );
};
