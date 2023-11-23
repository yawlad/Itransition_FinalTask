interface UniversalItemRowProps {
  name: string;
  value: any;
}

const UniversalItemRow = ({ name, value }: UniversalItemRowProps) => {
  return (
    <div className="flex">
      <div className="w-1/2 border-b-2 bg-gray-50 p-2 break-all">{name}:</div>
      <div className="w-1/2 border-b-2 p-2 flex justify-end items-center break-all">
        {value}
      </div>
    </div>
  );
};

export default UniversalItemRow;
