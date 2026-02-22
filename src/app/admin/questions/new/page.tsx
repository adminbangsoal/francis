"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/textarea";
import { ArrowLeft, Check, Save, Loader2 } from "lucide-react";

interface Subject {
  id: string;
  code: string;
  name: string;
  color: string;
}

interface Topic {
  id: string;
  name: string;
  subject_id: string;
}

export default function NewQuestionPage() {
  const router = useRouter();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");

  const [formData, setFormData] = useState({
    subject_id: "",
    topic_id: "",
    year: "",
    difficulty: "medium",
    question_text: "",
    correct_answer: "",
    explanation: "",
  });

  const [options, setOptions] = useState([
    { label: "A", text: "", is_correct: false },
    { label: "B", text: "", is_correct: false },
    { label: "C", text: "", is_correct: false },
    { label: "D", text: "", is_correct: false },
    { label: "E", text: "", is_correct: false },
  ]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      fetchTopics(selectedSubject);
    }
  }, [selectedSubject]);

  async function fetchSubjects() {
    try {
      // Mock data
      setSubjects([
        { id: "1", code: "PU", name: "Penalaran Umum", color: "#059669" },
        { id: "2", code: "PKPM", name: "Pengetahuan Kuantitatif", color: "#2563eb" },
        { id: "3", code: "PPU", name: "Penalaran Pemahaman Umum", color: "#059669" },
        { id: "4", code: "PBM", name: "Penalaran Bacaan & Menulis", color: "#d97706" },
      ]);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  }

  async function fetchTopics(subjectId: string) {
    try {
      // Mock data
      if (subjectId === "1") {
        setTopics([
          { id: "1", name: "Deduktif & Induktif", subject_id: "1" },
          { id: "2", name: "Penalaran Kuantitatif", subject_id: "1" },
          { id: "3", name: "Barisan Bilangan", subject_id: "1" },
        ]);
      } else {
        setTopics([]);
      }
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  }

  function handleOptionChange(index: number, field: "text" | "is_correct", value: string | boolean) {
    const newOptions = [...options] as Array<{ label: string; text: string; is_correct: boolean }>;
    newOptions[index][field] = value as never;
    
    // If setting is_correct to true, set all others to false
    if (field === "is_correct" && value === true) {
      newOptions.forEach((opt, i) => {
        if (i !== index) opt.is_correct = false;
      });
      setFormData({ ...formData, correct_answer: options[index].label });
    }
    
    setOptions(newOptions);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submitQuestion();
  }

  async function submitQuestion() {
    setLoading(true);

    try {
      const payload = {
        ...formData,
        year: parseInt(formData.year),
        options,
      };

      // Mock API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Submitting question:", payload);
      
      router.push("/admin/questions");
    } catch (error) {
      console.error("Error creating question:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/questions">
            <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Add New Question</h1>
            <p className="text-sm text-gray-500 mt-1">Create a new question for the question bank</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/questions">
            <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
              Cancel
            </Button>
          </Link>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Subject & Topic */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="mb-5 text-lg font-semibold text-gray-900">Subject & Topic</h3>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                Subject *
              </label>
              <select
                value={formData.subject_id}
                onChange={(e) => {
                  setSelectedSubject(e.target.value);
                  setFormData({ ...formData, subject_id: e.target.value, topic_id: "" });
                }}
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                required
              >
                <option value="">Select a subject</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name} ({subject.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                Topic *
              </label>
              <select
                value={formData.topic_id}
                onChange={(e) => setFormData({ ...formData, topic_id: e.target.value })}
                disabled={!selectedSubject}
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                required
              >
                <option value="">Select a topic</option>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                Year *
              </label>
              <Input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="e.g., 2023"
                className="border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                required
                min="2000"
                max="2024"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                Difficulty
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        {/* Question Text */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="mb-5 text-lg font-semibold text-gray-900">Question Content</h3>
          
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              Question Text *
            </label>
            <TextArea
              value={formData.question_text}
              onChange={(e) => setFormData({ ...formData, question_text: e.target.value })}
              placeholder="Enter the question text..."
              className="min-h-[120px] border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
              required
            />
          </div>

          {/* Options */}
          <div className="mt-8 space-y-4">
            <label className="block text-sm font-semibold text-gray-700">
              Options & Correct Answer *
            </label>
            {options.map((option, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-lg font-semibold text-gray-600">
                  {option.label}
                </div>
                <Input
                  type="text"
                  value={option.text}
                  onChange={(e) => handleOptionChange(index, "text", e.target.value)}
                  placeholder={`Enter text for Option ${option.label}`}
                  className="flex-1 h-12 border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleOptionChange(index, "is_correct", !option.is_correct)}
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border transition-all ${
                    option.is_correct
                      ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                      : "border-gray-200 bg-white text-gray-400 hover:border-emerald-200 hover:bg-emerald-50/50 hover:text-emerald-500"
                  }`}
                  title="Mark as correct answer"
                >
                  <Check className="h-5 w-5" strokeWidth={option.is_correct ? 3 : 2} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Explanation */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="mb-5 text-lg font-semibold text-gray-900">Explanation</h3>
          
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              Answer Explanation (Optional)
            </label>
            <TextArea
              value={formData.explanation}
              onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
              placeholder="Provide a step-by-step explanation for the correct answer..."
              className="min-h-[120px] border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            disabled={loading}
            size="lg"
            className="bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Saving Question...
              </div>
            ) : (
              <>
                <Save className="mr-2 h-5 w-5" />
                Save Question
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}