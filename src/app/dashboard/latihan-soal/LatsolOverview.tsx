"use client";

import { ProgressBar } from "@/components/ui/progress-bar";
import { useGetHeadersDashboardQuery } from "@/redux/api/dashboardApi";
import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { DashboardBoxContainer } from "../elements/DashboardBoxContainer";

// Helper function to get streak image based on milestone
const getStreakImage = (streak: number): string => {
  if (streak >= 30) return "/30d streak.PNG";
  if (streak >= 20) return "/20d streak.PNG";
  if (streak >= 10) return "/10d streak.PNG";
  return "/under10d.PNG";
};

// Helper function to get the milestone tier for a given streak
const getMilestoneTier = (streak: number): number | null => {
  if (streak >= 30) return 30;
  if (streak >= 20) return 20;
  if (streak >= 10) return 10;
  return null;
};

// Confetti particle effect
const createConfetti = (container: HTMLElement, colors: string[]) => {
  const particleCount = 10;
  const particles: HTMLElement[] = [];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    const size = Math.random() * 8 + 4; // 4-12px
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.position = "absolute";
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = color;
    particle.style.borderRadius = "50%";
    particle.style.left = "50%";
    particle.style.top = "50%";
    particle.style.transform = "translate(-50%, -50%)";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "20";

    container.appendChild(particle);
    particles.push(particle);

    const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
    const distance = 60 + Math.random() * 40;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    gsap.fromTo(
      particle,
      {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
      },
      {
        x,
        y,
        opacity: 0,
        scale: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          particle.remove();
        },
      },
    );
  }
};

export const LatsolOverview = () => {
  const { data } = useGetHeadersDashboardQuery();
  const floatingImageRef = useRef<HTMLDivElement>(null);
  const previousStreakRef = useRef<number | null>(null);
  const [currentImageSrc, setCurrentImageSrc] = useState<string>("/under10d.PNG");
  const isInitialMount = useRef(true);

  const streak = data?.data.streak || 0;

  // Initialize image based on current streak (only on first load)
  useEffect(() => {
    if (data?.data.streak !== undefined && isInitialMount.current) {
      const initialImage = getStreakImage(streak);
      setCurrentImageSrc(initialImage);
      previousStreakRef.current = streak;
      isInitialMount.current = false;
    }
  }, [data?.data.streak, streak]);

  // Floating animation
  useEffect(() => {
    if (floatingImageRef.current) {
      gsap.to(floatingImageRef.current, {
        y: -8,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
    }
  }, []);

  // Milestone detection and animation
  useEffect(() => {
    // Skip on initial mount
    if (isInitialMount.current || previousStreakRef.current === null) {
      return;
    }

    const previousStreak = previousStreakRef.current;
    const currentStreak = streak;

    // Handle streak decrease (update image without animation)
    if (currentStreak < previousStreak) {
      const newImageSrc = getStreakImage(currentStreak);
      setCurrentImageSrc(newImageSrc);
      previousStreakRef.current = currentStreak;
      return;
    }

    // Only animate if streak increased and reached a new milestone
    if (currentStreak > previousStreak) {
      const previousMilestone = getMilestoneTier(previousStreak);
      const currentMilestone = getMilestoneTier(currentStreak);

      // Check if we crossed a milestone threshold (10, 20, or 30)
      const crossedMilestone =
        (previousStreak < 10 && currentStreak >= 10) ||
        (previousStreak < 20 && currentStreak >= 20) ||
        (previousStreak < 30 && currentStreak >= 30);

      // Check if we reached a new milestone tier
      if (currentMilestone !== null && currentMilestone !== previousMilestone && crossedMilestone) {
        const newImageSrc = getStreakImage(currentStreak);
        const container = floatingImageRef.current;

        if (container) {
          // Confetti colors based on milestone
          const confettiColors =
            currentMilestone === 30
              ? ["#a855f7", "#c084fc", "#d8b4fe"] // Purple shades
              : currentMilestone === 20
                ? ["#f97316", "#fb923c", "#fdba74"] // Orange shades
                : ["#f59e0b", "#fbbf24", "#fcd34d"]; // Amber shades

          // Create animation timeline
          const tl = gsap.timeline();

          // Shrink phase
          tl.to(container, {
            scale: 0,
            duration: 0.3,
            ease: "power2.in",
          })
            // Swap phase - change image src
            .call(() => {
              setCurrentImageSrc(newImageSrc);
            })
            // Pop phase - bounce animation
            .to(container, {
              scale: 1.2,
              duration: 0.2,
              ease: "power2.out",
            })
            .to(container, {
              scale: 1,
              duration: 0.2,
              ease: "back.out(1.7)",
            });

          // Create confetti effect
          createConfetti(container, confettiColors);
        }
      } else {
        // Streak increased but didn't cross milestone - just update image silently
        const newImageSrc = getStreakImage(currentStreak);
        if (newImageSrc !== currentImageSrc) {
          setCurrentImageSrc(newImageSrc);
        }
      }
    }

    // Update previous streak
    previousStreakRef.current = currentStreak;
  }, [streak]);

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      <DashboardBoxContainer className="col-span-1">
        <p className="font-medium">Latihan Soal Selesai</p>
        <div className="flex flex-row items-center justify-between">
          <p className="text-3xl font-bold">
            {data?.data.finished.percentage || 0}%
          </p>
        </div>
        <p className="text-slate-500">
          {data?.data.finished.done} / {data?.data.finished.total} soal
        </p>
        <ProgressBar progress={data?.data.finished.percentage || 0} />
      </DashboardBoxContainer>
      <DashboardBoxContainer className="col-span-1">
        <p className="font-medium">Akurasi</p>
        <div className="flex flex-row items-center justify-between">
          <p className="text-3xl font-bold">
            {data?.data.accuracy.percentage}%
          </p>
          {/* <div className="flex w-1/2 flex-row items-center gap-2">
          <ArrowUpIcon className="text-green-500" />
          <p className="text-wrap text-xs">+7% from the last average</p>
        </div> */}
        </div>
        <p className="text-slate-500">
          {data?.data.accuracy.correct_answers} /{" "}
          {data?.data.accuracy.total_attempted_question} soal benar
        </p>
        <ProgressBar progress={data?.data.accuracy.percentage || 0} />
      </DashboardBoxContainer>
      <DashboardBoxContainer className="col-span-2 md:col-span-1">
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="flex flex-col">
            <p className="flex flex-row items-center gap-3 font-medium">
              <Image
                src={"/icons/Fire.svg"}
                alt="fire"
                width={28}
                height={28}
              />
              Streak
            </p>
            <p className="text-3xl font-bold">{data?.data.streak || 0} Days</p>
          </div>
          <div className="relative mr-4 flex flex-shrink-0 items-center justify-center sm:mr-6 md:mr-6">
            <Image
              src={"/Book.PNG"}
              alt="book"
              width={160}
              height={160}
              className="z-0 mt-2 h-28 w-28 object-contain sm:h-32 sm:w-32 md:h-36 md:w-36"
            />
            <div
              ref={floatingImageRef}
              className="absolute z-10 mt-2 h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36"
            >
              <Image
                src={currentImageSrc}
                alt="streak on book"
                width={160}
                height={160}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      </DashboardBoxContainer>
    </div>
  );
};
