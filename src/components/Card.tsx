type Props = {
  title: string;
  subtitle?: string;
};

const Card = ({ title, subtitle }: Props) => {
  return (
    <article
      tabIndex={0}
      className="p-3 bg-white rounded border border-gray-200 shadow-sm transition-shadow duration-150 hover:shadow-md cursor-pointer">
      <div className="text-sm font-medium">{title}</div>
      {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
    </article>
  );
};

export default Card;
