import { FiX, FiArrowRight } from "react-icons/fi";

type Props = {
  title: string;
  subtitle?: string;
  onDelete?: () => void;
};

const Card = ({ title, subtitle, onDelete }: Props) => {
  return (
    <article
      tabIndex={0}
      className="group relative p-3 bg-white rounded border border-gray-200 shadow-sm transition-shadow duration-150 hover:shadow-md cursor-pointer">
      <a
        href="https://interxlab.career.greetinghr.com/ko/interxlab"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="상세보기"
        onPointerDown={(e) => e.stopPropagation()}
        className="absolute bottom-2 right-2 flex items-center gap-1 border border-gray-300 rounded-md p-1 opacity-0 group-hover:opacity-100">
        <span className="text-xs text-gray-500">상세보기</span>
        <FiArrowRight className="w-4 h-4 text-gray-400" />
      </a>
      {onDelete && (
        <button
          type="button"
          aria-label="삭제"
          onPointerDown={(e) => {
            e.stopPropagation();
          }}
          onClick={onDelete}
          className="absolute top-2 right-2">
          <FiX className="w-4 h-4 text-gray-400 hover:text-blue-500" />
        </button>
      )}

      <div className="text-sm font-medium">{title}</div>
      {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
    </article>
  );
};

export default Card;
