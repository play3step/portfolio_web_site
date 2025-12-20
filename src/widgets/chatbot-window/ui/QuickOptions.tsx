import { QuickOption } from "@/src/entities";

interface QuickOptionsProps {
  options: QuickOption[];
  onSelect: (option: QuickOption) => void;
  disabled?: boolean;
}

export const QuickOptions = ({
  options,
  onSelect,
  disabled = false,
}: QuickOptionsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option)}
          disabled={disabled}
          className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-50 transition-all shadow-sm  disabled:cursor-not-allowed"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
