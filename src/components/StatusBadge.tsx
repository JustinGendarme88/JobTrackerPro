type StatusBadgeProps = {
  status: string;
};

function getStatusLabel(status: string) {
  const normalizedStatus = status.trim().toUpperCase().replaceAll(" ", "_");

  switch (normalizedStatus) {
    case "INTERESTED":
      return "Interested";
    case "APPLIED":
      return "Applied";
    case "HR_SCREEN":
      return "HR Screen";
    case "TECHNICAL_INTERVIEW":
      return "Technical Interview";
    case "FINAL_INTERVIEW":
      return "Final Interview";
    case "OFFER":
      return "Offer";
    case "REJECTED":
      return "Rejected";
    default:
      return status.replaceAll("_", " ");
  }
}

function getStatusClass(status: string) {
  const normalizedStatus = status.trim().toUpperCase().replaceAll(" ", "_");

  switch (normalizedStatus) {
    case "INTERESTED":
      return "bg-green-600 text-white";
    case "APPLIED":
      return "bg-blue-600 text-white";
    case "HR_SCREEN":
      return "bg-cyan-600 text-white";
    case "TECHNICAL_INTERVIEW":
      return "bg-yellow-500 text-black";
    case "FINAL_INTERVIEW":
      return "bg-orange-500 text-black";
    case "OFFER":
      return "bg-green-600 text-white";
    case "REJECTED":
      return "bg-red-600 text-white";
    default:
      return "bg-zinc-600 text-white";
  }
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold ${getStatusClass(
        status
      )}`}
    >
      {getStatusLabel(status)}
    </span>
  );
}