"use client";

import { getSubjectIcon } from "@/lib/constants/subjectIcons";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface SubjectIconProps {
  iconUrl?: string | null;
  subjectName?: string | null;
  subjectSlug?: string | null;
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

const failedUrls = new WeakMap<object, Set<string>>();

export const SubjectIcon: React.FC<SubjectIconProps> = ({
  iconUrl,
  subjectName,
  subjectSlug,
  width = 20,
  height = 20,
  className,
  alt = "subject icon",
}) => {
  const [fallbackIcon, setFallbackIcon] = useState<string | null>(null);
  const instanceRef = useRef<object>({});

  const isValidUrl =
    iconUrl &&
    (iconUrl.startsWith("http://") || iconUrl.startsWith("https://"));
  const mappedIcon = getSubjectIcon(subjectName, subjectSlug);

  useEffect(() => {
    if (!isValidUrl) {
      setFallbackIcon(mappedIcon);
      return;
    }

    if (!failedUrls.has(instanceRef.current)) {
      failedUrls.set(instanceRef.current, new Set());
    }

    const failedSet = failedUrls.get(instanceRef.current);
    if (failedSet?.has(iconUrl)) {
      setFallbackIcon(mappedIcon);
    }
  }, [iconUrl, isValidUrl, mappedIcon]);

  const handleImageError = () => {
    const failedSet = failedUrls.get(instanceRef.current);
    if (iconUrl && failedSet) {
      failedSet.add(iconUrl);
    }
    setFallbackIcon(mappedIcon);
  };

  const src = fallbackIcon ?? iconUrl ?? mappedIcon;

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleImageError}
    />
  );
};
