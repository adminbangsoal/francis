import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge, twJoin } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      shadow: [{ shadow: ["highlight"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}

export function join(...inputs: ClassValue[]) {
  return twJoin(clsx(inputs));
}

export function shuffle(array: any[]) {
  return array.sort(() => Math.random() - 0.5);
}

export const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

import { QueryParams, SelectedSubjectType } from "@/types";
import toast from "react-hot-toast";

export const copyToClipboard = (text?: string) => {
  try {
    navigator.clipboard.writeText(text ?? window.location.href);
    toast.success("Copied to clipboard");
  } catch (err) {
    toast.error("Your browser doesn't support copying to clipboard");
  }
};
export const replaceSubjectName = (subjectName: string) => {
  return subjectName.replace("Literasi dalam ", "") as SelectedSubjectType;
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getKeyByValue = (map: any, value: string): string | undefined => {
  return Object.keys(map).find((key) => map[key] === value);
};

export const calculateTimeLeftV2 = (
  endTime: Date,
  type: "mins" | "hours" = "hours",
) => {
  const now = new Date();
  const timeDifference = endTime.getTime() - now.getTime();

  if (timeDifference <= 0) {
    return {
      seconds: 0,
      minutes: 0,
      hours: 0,
      text: type === "hours" ? "00:00:00" : "00:00",
      timeIsUp: true,
    };
  }

  const seconds = Math.floor((timeDifference / 1000) % 60);
  const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const formattedTime =
    type === "hours"
      ? `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      : `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return { seconds, minutes, hours, text: formattedTime, timeIsUp: false };
};

export const formatDateToIndonesian = (dateString: string) => {
  // Parse the input date string into a Date object
  const dateObj = new Date(dateString);

  // Define month names in Indonesian
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  // Extract day, month, and year components from the date object
  const day = dateObj.getDate();
  const monthIndex = dateObj.getMonth(); // Month index starts from 0
  const year = dateObj.getFullYear();

  // Format the date in the desired format
  const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;

  return formattedDate;
};

export const calculateTimeLeft = (
  endTime: Date,
  handleSubmit: () => void,
  setTimeLeft: React.Dispatch<
    React.SetStateAction<{
      seconds: number;
      minutes: number;
      hours: number;
      text: string;
    }>
  >,
  type: "mins" | "hours" = "hours",
) => {
  const now = new Date();
  const timeDifference = endTime.getTime() - now.getTime();
  if (timeDifference <= 0) {
    handleSubmit();
    setTimeLeft({
      seconds: 0,
      minutes: 0,
      hours: 0,
      text: type == "hours" ? "00:00:00" : "00:00",
    });
    return;
  }

  const seconds = Math.floor((timeDifference / 1000) % 60);
  const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const formattedTime =
    type === "hours"
      ? `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      : `${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`;

  setTimeLeft({ seconds, minutes, hours, text: formattedTime });
};

export const updateQueryParams = (queryParams: QueryParams) => {
  const params = new URLSearchParams();

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value != "" && value !== null && value !== undefined) {
      params.set(key, value.toString());
    }
  });

  const queryString = params.toString();
  return queryString;
};

export const validateUUID = (
  value: string | null | undefined,
): string | null | undefined => {
  const uuidV4Regex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

  return uuidV4Regex.test(value ?? "") ? value : undefined;
};
export const joinAcceptedExtensions = (acceptTypes: Record<string, string[]>) =>
  Object.values(acceptTypes)
    .reduce(
      (acc, ext) => acc.concat(ext.map((e) => e.slice(1).toUpperCase())),
      [],
    )
    .join(", ");
