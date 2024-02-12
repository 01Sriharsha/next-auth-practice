type HeaderProps = {
  label: string;
};

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="flex justify-center items-center gap-x-2">
      <h1 className="text-3xl font-semibold">{label}</h1>
    </div>
  );
};
