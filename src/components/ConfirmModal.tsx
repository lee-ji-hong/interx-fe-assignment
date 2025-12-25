type Props = {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal = ({ open, message, onConfirm, onCancel }: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-md w-80 shadow-lg overflow-hidden flex flex-col">
        <div className="px-6 py-10 text-center">
          <p className="text-sm text-gray-800 leading-relaxed">{message}</p>
        </div>

        <div className="flex border-t">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 text-sm text-gray-600 hover:bg-gray-200 transition">
            아니요
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-3 text-sm text-white bg-blue-500 hover:bg-blue-300 transition">
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
