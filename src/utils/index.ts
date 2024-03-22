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

export const formattedPrice = (value: string) => {
  const parts = value.split("");
  // reduceRight akan mulai membaca elemen dari belakang
  const result = parts.reduceRight((acc, curr, index) => {
    if ((parts.length - index) % 3 === 0 && index !== 0) {
      return "." + curr + acc;
    }
    return curr + acc;
  }, "");
  return result;
};

export function getTimeOfDay() {
  const now = new Date();
  const hours = now.getHours();

  if (hours >= 5 && hours < 12) {
    return "Selamat Pagi";
  } else if (hours >= 12 && hours < 18) {
    return "Selamat Sore";
  } else {
    return "Selamat Malam";
  }
}

export function setLocalStorage(key: string, value: string) {
  if(typeof window !== 'undefined') {
    localStorage.setItem(key, value);
    return;
  }
  return 'not-supported'
}

export function getLocalStorage(key: string): string {
  if(typeof window !== 'undefined') {
    return localStorage.getItem(key) || "";
  }
  return 'not-supported'
}

// Example usage
// const targetDate = '2023-12-31';
// console.log(calculateDaysLeft(targetDate));
// Output: Number of days left until the target date
