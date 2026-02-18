"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProgressBar } from "@/components/ui/progress-bar";
import { useGetDashboardQuery } from "@/redux/api/dashboardApi";
import { AlertTriangle, TrendingDown, BookOpen, GraduationCap, TrendingUp, AlertCircle } from "lucide-react";
import Link from "next/link";
import { DashboardBoxContainer } from "../elements/DashboardBoxContainer";

interface SubjectAnalysis {
  subject: string;
  icon: string;
  slug: string;
  accuracy: number;
  totalAttempted: number;
  correctAnswers: number;
  weakTopics: {
    topic: string;
    accuracy: number;
    correct: number;
    total: number;
  }[];
}

const AnalysisCardSkeleton = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="skeleton relative h-6 w-48 rounded bg-surface-300 from-surface-300 via-surface-100 to-surface-300 mb-4"></div>
      <div className="skeleton relative h-32 w-full rounded bg-surface-300 from-surface-300 via-surface-100 to-surface-300"></div>
    </div>
  );
};

export const PerformanceAnalysis = () => {
  const { data, isLoading, error } = useGetDashboardQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <AnalysisCardSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <DashboardBoxContainer variant="primary" className="rounded-2xl">
        <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
          <AlertCircle className="h-12 w-12 text-slate-400" />
          <p className="font-medium text-gray-900">
            Gagal memuat data analisis
          </p>
          <p className="text-sm text-gray-600">
            Silakan refresh halaman atau coba lagi nanti
          </p>
        </div>
      </DashboardBoxContainer>
    );
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <DashboardBoxContainer variant="primary" className="rounded-2xl">
        <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
          <BookOpen className="h-12 w-12 text-slate-400" />
          <p className="font-medium text-slate-600">
            Belum ada data analisis
          </p>
          <p className="text-sm text-slate-500">
            Mulai latihan soal untuk melihat analisis performa kamu
          </p>
        </div>
      </DashboardBoxContainer>
    );
  }

  // Calculate analysis data
  // Now we have total_attempt from backend, so we can calculate accurate accuracy
  const subjectAnalyses: SubjectAnalysis[] = data.data.map((subjectData) => {
    // Calculate total attempted and correct for this subject
    let totalAttempted = 0;
    let totalCorrect = 0;
    const weakTopics: SubjectAnalysis["weakTopics"] = [];

    subjectData.topics.forEach((topic) => {
      // Only process topics that have been attempted
      if (topic.total_attempt > 0) {
        // Calculate accurate accuracy: correct / total_attempt
        const topicAccuracy =
          topic.total_attempt > 0
            ? (topic.correct / topic.total_attempt) * 100
            : 0;

        // Include topics with accuracy < 70% as weak topics
        if (topicAccuracy < 70) {
          weakTopics.push({
            topic: topic.topic,
            accuracy: topicAccuracy,
            correct: topic.correct,
            total: topic.total_attempt, // Use total_attempt, not total_question
          });
        }

        // For subject-level calculation, sum up attempts and correct answers
        totalAttempted += topic.total_attempt;
        totalCorrect += topic.correct;
      }
    });

    // Sort weak topics by accuracy (lowest first)
    weakTopics.sort((a, b) => a.accuracy - b.accuracy);

    // Calculate subject-level accuracy
    const accuracy =
      totalAttempted > 0 ? (totalCorrect / totalAttempted) * 100 : 0;

    return {
      subject: subjectData.subject,
      icon: subjectData.icon,
      slug: subjectData.slug,
      accuracy,
      totalAttempted,
      correctAnswers: totalCorrect,
      weakTopics: weakTopics.slice(0, 5), // Top 5 weakest topics
    };
  });

  // Sort subjects by accuracy (lowest first) - weakest subjects first
  const sortedSubjects = [...subjectAnalyses].sort(
    (a, b) => a.accuracy - b.accuracy,
  );

  // Get top 3 weakest subjects
  const weakestSubjects = sortedSubjects
    .filter((s) => s.totalAttempted > 0)
    .slice(0, 3);

  // Get all weak topics across all subjects, sorted by accuracy
  const allWeakTopics = subjectAnalyses
    .flatMap((subject) =>
      subject.weakTopics.map((topic) => {
        // Calculate how many correct answers needed to reach 70% accuracy
        // If current accuracy is X% and we want 70%, we need:
        // (correct + needed) / (total_attempt + needed) = 0.7
        // Solving: needed = (0.7 * total_attempt - correct) / 0.3
        const questionsNeeded = Math.max(
          0,
          Math.ceil((topic.total * 0.7 - topic.correct) / 0.3),
        );
        
        return {
          ...topic,
          subjectName: subject.subject,
          subjectSlug: subject.slug,
          subjectIcon: subject.icon,
          questionsNeeded,
        };
      }),
    )
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 8); // Top 8 weakest topics overall

  // Get motivational message based on performance
  const getMotivationalMessage = () => {
    if (weakestSubjects.length === 0 && allWeakTopics.length === 0) {
      return {
        message: "Performa Kamu Bagus!",
        subMessage: "Terus pertahankan dengan rutin latihan soal",
        color: "green",
      };
    }
    
    const lowestAccuracy = Math.min(
      ...weakestSubjects.map((s) => s.accuracy),
      ...allWeakTopics.map((t) => t.accuracy),
    );

    if (lowestAccuracy < 30) {
      return {
        message: "Jangan Menyerah!",
        subMessage: "Fokus latihan di area yang lemah, kamu pasti bisa!",
        color: "green",
      };
    } else if (lowestAccuracy < 50) {
      return {
        message: "Tingkatkan Lagi!",
        subMessage: "Konsisten latihan akan meningkatkan performa kamu",
        color: "gray",
      };
    } else {
      return {
        message: "Sedikit Lagi!",
        subMessage: "Kamu sudah di jalur yang benar, terus semangat!",
        color: "gray",
      };
    }
  };

  const motivation = getMotivationalMessage();

  return (
    <div className="flex flex-col gap-4">
      {/* Weak Subjects Section */}
      {weakestSubjects.length > 0 && (
        <DashboardBoxContainer
          variant="primary"
          className="rounded-2xl border border-slate-200"
        >
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="subjects" className="border-none">
              <AccordionTrigger className="hover:no-underline py-2">
                <div className="flex flex-row items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-slate-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Mata Pelajaran yang Perlu Diperbaiki
                  </h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <p className="text-sm text-gray-600 mb-4">
                  Fokus latihan di mata pelajaran berikut untuk meningkatkan
                  performa kamu
                </p>
                <div className="flex flex-col gap-3">
                  {weakestSubjects.map((subject, idx) => (
                    <Link
                      key={idx}
                      href={`/latihan-soal/${subject.slug}`}
                      className="group rounded-xl bg-white border border-slate-200 p-4 transition-all hover:shadow-md"
                    >
                      <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-50">
                            <GraduationCap className="h-5 w-5 text-slate-600" />
                          </div>
                          <div className="flex flex-col">
                            <p className="font-medium text-gray-900">
                              {subject.subject}
                            </p>
                            <p className="text-xs text-gray-500">
                              {subject.correctAnswers} dari {subject.totalAttempted}{" "}
                              soal benar
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <p className="text-2xl font-bold text-gray-900">
                            {subject.accuracy.toFixed(1)}%
                          </p>
                          <p className="text-xs text-gray-500">Akurasi</p>
                          <div className="w-20 mt-1">
                            <ProgressBar progress={subject.accuracy} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </DashboardBoxContainer>
      )}

      {/* Weak Topics Section */}
      {allWeakTopics.length > 0 && (
        <DashboardBoxContainer
          variant="primary"
          className="rounded-2xl border border-slate-200"
        >
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="topics" className="border-none">
              <AccordionTrigger className="hover:no-underline py-2">
                <div className="flex flex-row items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-slate-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Topik yang Sering Salah
                  </h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <p className="text-sm text-gray-600 mb-4">
                  Topik-topik berikut perlu lebih banyak latihan
                </p>
                <div className="flex flex-col gap-2">
                  {allWeakTopics.map((topic, idx) => (
                    <div
                      key={idx}
                      className="flex flex-row items-center justify-between rounded-lg bg-white border border-slate-200 px-4 py-3"
                    >
                      <div className="flex flex-row items-center gap-3 flex-1 min-w-0">
                        <div className="flex flex-col min-w-0 flex-1">
                          <p className="font-medium text-sm text-gray-900 truncate">
                            {topic.topic}
                          </p>
                          <p className="text-xs text-gray-500">
                            {topic.subjectName}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row items-center gap-4 ml-4">
                        <div className="flex flex-col items-end">
                          <p className="text-sm font-semibold text-gray-700">
                            {topic.correct}/{topic.total}
                          </p>
                          <p className="text-xs text-gray-500">soal benar</p>
                          {topic.questionsNeeded > 0 && (
                            <span className="mt-1 inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                              +{topic.questionsNeeded} soal
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-1 w-20">
                          <p className="text-lg font-bold text-gray-900">
                            {topic.accuracy.toFixed(0)}%
                          </p>
                          <div className="w-full">
                            <ProgressBar progress={topic.accuracy} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </DashboardBoxContainer>
      )}

      {/* Motivational Message */}
      <DashboardBoxContainer
        variant="primary"
        className={`rounded-2xl ${
          motivation.color === "green" 
            ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200" 
            : ""
        }`}
      >
        <div className="flex flex-row items-center gap-3">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
            motivation.color === "green" ? "bg-green-100" : "bg-slate-100"
          }`}>
            {motivation.color === "green" && (
              <TrendingUp className="h-6 w-6 text-green-600" />
            )}
            {motivation.color === "gray" && (
              <TrendingDown className="h-6 w-6 text-slate-600" />
            )}
          </div>
          <div className="flex flex-col">
            <p className={`font-semibold ${
              motivation.color === "green" ? "text-green-900" : "text-gray-900"
            }`}>
              {motivation.message}
            </p>
            <p className={`text-sm ${
              motivation.color === "green" ? "text-green-700" : "text-gray-600"
            }`}>
              {motivation.subMessage}
            </p>
          </div>
        </div>
      </DashboardBoxContainer>
    </div>
  );
};
