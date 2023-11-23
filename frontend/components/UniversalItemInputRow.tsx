interface UniversalItemInputRowProps {
  name: string;
  value: string;
  type: string;
  onChange: (value: string) => void;
}

const UniversalItemInputRow = ({
  name,
  value,
  onChange,
}: UniversalItemInputRowProps) => {
  return (
    <div className="flex">
      <div className="w-1/2 border-b-2 bg-gray-50 p-2 hyphens-auto">
        {name}:
      </div>
      <input
        className="w-1/2 border-b-2 p-2 flex justify-end items-center break-all"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default UniversalItemInputRow;
