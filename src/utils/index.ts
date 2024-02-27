export const rupiahFormatter = (value: number) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  return formatter.format(value);
};

export const dateFormatter = (dateString: string) => {
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  return formatter.format(date);
};

export const startWithRequirePath = (requirePaths: string[], path: string) => {
  return requirePaths.some((pattern) => {
    if (pattern.endsWith("**")) {
      const prefix = pattern.slice(0, -2);
      return path.startsWith(prefix);
    } else {
      return (
        path === pattern ||
        (path.startsWith(pattern) && path[pattern.length] === "/")
      );
    }
  });
};
