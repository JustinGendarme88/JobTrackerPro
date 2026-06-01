"use client";

type DeleteButtonProps = {
  label?: string;
  message?: string;
};

export default function DeleteButton({
  label = "Delete",
  message = "Are you sure you want to delete this item?",
}: DeleteButtonProps) {
  return (
    <button
      type="submit"
      onClick={(event) => {
        const confirmed = window.confirm(message);

        if (!confirmed) {
          event.preventDefault();
        }
      }}
      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-500"
    >
      {label}
    </button>
  );
}