import { CheckCircledIcon } from "@radix-ui/react-icons";

type FormErrorProps = {
  success: string;
};

export const FormSuccess = ({ success }: FormErrorProps) => {
  return (
    <div className="w-full bg-emerald-500/10 text-emerald-600 h-8 rounded-md flex items-center justify-center">
      <p className="text-sm flex items-center gap-1">
        <CheckCircledIcon />
        {success}
      </p>
    </div>
  );
};
