export function formatDate(date: Date) {
  return date.toLocaleDateString("en-CA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatLongDate(date: Date) {
  return date.toLocaleDateString("en-CA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateTime(date: Date) {
  return date.toLocaleString("en-CA", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}