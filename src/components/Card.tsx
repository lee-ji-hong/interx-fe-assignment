import { FiX } from "react-icons/fi";

type Props = {
  title: string;
  subtitle?: string;
  onDelete?: () => void;
};

const Card = ({ title, subtitle, onDelete }: Props) => {
  return (
    <article
      tabIndex={0}
      className="relative p-3 bg-white rounded border border-gray-200 shadow-sm transition-shadow duration-150 hover:shadow-md cursor-pointer">
      <button
        type="button"
        aria-label="삭제"
        onPointerDown={(e) => {
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
          onDelete?.();
        }}
        className="absolute top-2 right-2">
        <FiX className="w-4 h-4 text-gray-400 hover:text-blue-500" />
      </button>

      <div className="text-sm font-medium">{title}</div>
      {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
    </article>
  );
};

export default Card;
