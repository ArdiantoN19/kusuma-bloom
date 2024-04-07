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
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
    return;
  }
  return "not-supported";
}

export function getLocalStorage(key: string): string {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key) || "";
  }
  return "not-supported";
}

export function createQueryString(
  redirectUrl: string,
  searchParams?: { key: string; value: string }[]
) {
  const url = new URL(redirectUrl, process.env.NEXT_PUBLIC_BASE_URL);
  if (searchParams?.length) {
    searchParams.forEach((params: { key: string; value: string }) => {
      url.searchParams.set(params.key, params.value);
    });
  }
  return url.toString();
}

export function createTemplateSlug(slug: string) {
  return slug.trim().split(" ").join("-");
}

export function encodeTemplateSlug(slug: string) {
  return slug.trim().split("-").join(" ");
}

export async function copyContent(content: string) {
  try {
    await navigator.clipboard.writeText(content);
    return true;
  } catch (err) {
    console.error("Failed to copy: ", err);
    return false;
  }
}

export function hiddenTextFormatter(value: string) {
  const result = value.slice(0, 10) + "*".repeat(4) + value.slice(-3);
  return result;
}

export const transformMonthFromIndex: Record<number, string> = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

// Example usage
// const targetDate = '2023-12-31';
// console.log(calculateDaysLeft(targetDate));
// Output: Number of days left until the target date
