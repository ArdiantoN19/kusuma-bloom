import { dataColors } from "./data";

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

export const calculateDaysLeft = (targetDate: string) => {
  const currentDate = new Date();
  const target = new Date(targetDate);
  const timeDifference = target.getTime() - currentDate.getTime();
  const dayDifference = timeDifference / (1000 * 3600 * 24);
  return Math.ceil(dayDifference);
};

export const printColor = () => {
  const random = Math.floor(Math.random() * 10) + 1; // akan menghasilkan random angka antara 1 sampai 15
  return `bg-[${dataColors[random]}]`;
};

// Example usage
// const targetDate = '2023-12-31';
// console.log(calculateDaysLeft(targetDate));
// Output: Number of days left until the target date
