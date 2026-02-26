"use client";

import { useEffect, useState } from "react";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Upload, 
  Plus, 
  Search, 
  Eye, 
  Pencil, 
  Trash2 
} from "lucide-react";
import { apiConfig } from "@/redux/api/config";
import { toast } from "react-hot-toast";

interface Content {
  content: string;
  isMedia: boolean;
}

interface Subject {
  id: string;
  name: string;
}

interface Question {
  id: string;
  question: Content[];
  topic_id: string | null;
  year: number;
  source: string;
  published: boolean;
  topic_name: string | null;
  subject_id: string | null;
  subject_name: string | null;
  type: string;
}

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const itemsPerPage = 20;

  useEffect(() => {
    fetchQuestions();
    fetchSubjects();
  }, [currentPage, subjectFilter, yearFilter]);

  async function fetchQuestions() {
    try {
      const token = localStorage.getItem('token');
      let url = `${apiConfig.baseUrl}/latihan-soal-cms/questions?page=${currentPage}&limit=${itemsPerPage}`;
      
      // Add filter params
      if (subjectFilter !== 'all') {
        // Find subject ID from subjects array
        const subject = subjects.find(s => s.name === subjectFilter);
        if (subject) {
          url += `&subjectId=${subject.id}`;
        }
      }
      
      if (yearFilter !== 'all') {
        url += `&year=${yearFilter}`;
      }
      
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch questions: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      // Handle NestJS response wrapper format
      let questionsArray: Question[] = [];
      let total = 0;
      
      if (Array.isArray(data)) {
        questionsArray = data;
      } else if (data?.data?.data && Array.isArray(data.data.data)) {
        questionsArray = data.data.data;
        total = data.data.total || 0;
      } else if (data?.data && Array.isArray(data.data)) {
        questionsArray = data.data;
        total = data.total || 0;
      } else if (data?.questions && Array.isArray(data.questions)) {
        questionsArray = data.questions;
      }
      
      console.log('📊 Backend response:', data);
      console.log('📦 Questions array length:', questionsArray.length);
      console.log('🔢 Total from backend:', total);
      
      setQuestions(questionsArray);
      
      // Calculate total pages if response includes pagination info
      if (total > 0) {
        console.log('✅ Using total from response:', total);
        setTotalQuestions(total);
        setTotalPages(Math.ceil(total / itemsPerPage));
      } else if (data?.total || data?.totalItems || data?.count) {
        const responseTotal = data.total || data.totalItems || data.count;
        console.log('✅ Using total from data object:', responseTotal);
        setTotalQuestions(responseTotal);
        setTotalPages(Math.ceil(responseTotal / itemsPerPage));
      } else {
        // Fallback
        console.log('⚠️ Using fallback pagination');
        if (questionsArray.length >= itemsPerPage) {
          setTotalPages(currentPage + 1);
        } else if (questionsArray.length > 0) {
          setTotalPages(currentPage);
        }
      }
      console.log('📄 Total pages:', Math.ceil(totalQuestions / itemsPerPage), 'Total questions:', totalQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
      toast.error("Failed to load questions");
    } finally {
      setLoading(false);
    }
  }

  async function fetchSubjects() {
    try {
      const token = localStorage.getItem('token');
      const url = `${apiConfig.baseUrl}/latihan-soal-cms/subjects`;
      
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch subjects');
      }

      const data = await response.json();
      const subjectsArray = Array.isArray(data) ? data : (data?.data || data?.subjects || []);
      setSubjects(subjectsArray);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  }

  async function deleteQuestion(questionId: string) {
    if (!confirm("Are you sure you want to delete this question? This action cannot be undone.")) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${apiConfig.baseUrl}/latihan-soal-cms/delete/${questionId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete question');
      }

      toast.success("Question deleted successfully");
      if (questions.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        fetchQuestions();
      }
    } catch (error) {
      console.error("Error deleting question:", error);
      toast.error("Failed to delete question");
    }
  }

  function getQuestionText(question: Content[]): string {
    if (!question || question.length === 0) return "";
    return question.map(q => q.content).join(" ");
  }

  function getSubjectCode(subjectName: string | null): string {
    if (!subjectName) return "";
    const codeMap: { [key: string]: string } = {
      "Kemampuan Memahami Bacaan dan Menulis": "PBM",
      "Kemampuan Penalaran Umum": "PU",
      "Pengetahuan Kuantitatif": "PK",
      "Penalaran Matematika": "MTK",
      "Pengetahuan dan Pemahaman Umum": "PPU",
      "Literasi dalam Bahasa Indonesia": "IND",
      "Literasi dalam Bahasa Inggris": "ENG",
      "UNDECIDED": "UND",
    };
    return codeMap[subjectName] || subjectName.substring(0, 3).toUpperCase();
  }

  function getSubjectColor(subjectName: string | null): string {
    if (!subjectName) return "#6b7280";
    const colorMap: { [key: string]: string } = {
      "Kemampuan Memahami Bacaan dan Menulis": "#dc2626",
      "Kemampuan Penalaran Umum": "#059669",
      "Pengetahuan Kuantitatif": "#2563eb",
      "Penalaran Matematika": "#7c3aed",
      "Pengetahuan dan Pemahaman Umum": "#f59e0b",
      "Literasi dalam Bahasa Indonesia": "#0891b2",
      "Literasi dalam Bahasa Inggris": "#ea580c",
      "UNDECIDED": "#6b7280",
    };
    return colorMap[subjectName] || "#6b7280";
  }

  const filteredQuestions = Array.isArray(questions) ? questions.filter((q) => {
    const questionText = getQuestionText(q.question);
    const matchesSearch =
      questionText.toLowerCase().includes(search.toLowerCase()) ||
      (q.topic_name?.toLowerCase() || "").includes(search.toLowerCase());
    return matchesSearch;
  }) : [];
  
  console.log('🔍 Search:', search, 'Filtered count:', filteredQuestions.length, 'Total questions:', totalQuestions);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Questions</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and organize your question bank.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-gray-200 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-colors"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload CSV
          </Button>
          <Link href="/admin/questions/new">
            <Button className="bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm">
              <Plus className="mr-2 h-4 w-4" />
              Add New Question
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="md:col-span-2">
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search questions or topics..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-gray-200 bg-gray-50 pl-10 text-gray-900 placeholder:text-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              Subject
            </label>
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="all">All Subjects</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.name}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">
              Year
            </label>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="all">All Years</option>
              {Array.from({ length: 14 }, (_, i) => 2024 - i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap lg:whitespace-normal">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Question
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Subject
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Topic
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Year
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredQuestions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-sm text-gray-500">
                    {loading ? (
                      "Loading questions..."
                    ) : (
                      "No questions found matching your criteria."
                    )}
                  </td>
                </tr>
              ) : (
                filteredQuestions.map((question) => (
                  <QuestionRow 
                    key={question.id} 
                    question={question} 
                    onDelete={deleteQuestion}
                    getQuestionText={getQuestionText}
                    getSubjectCode={getSubjectCode}
                    getSubjectColor={getSubjectColor}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, totalQuestions)} of {search ? filteredQuestions.length : totalQuestions} questions
              {search && ' (filtered from search)'}
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="w-10 h-10 p-0"
              >
                <span className="text-sm">&laquo;</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-10 h-10 p-0"
              >
                <span className="text-sm">&lsaquo;</span>
              </Button>
              
              <div className="flex items-center gap-1">
                {getPageNumbers().map((pageNum, index) => (
                  <React.Fragment key={index}>
                    {pageNum === '...' ? (
                      <span className="w-10 h-10 flex items-center justify-center text-gray-400">
                        ...
                      </span>
                    ) : (
                      <Button
                        variant={currentPage === pageNum ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum as number)}
                        className={`w-10 h-10 p-0 ${
                          currentPage === pageNum
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                            : 'hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200'
                        }`}
                      >
                        {pageNum}
                      </Button>
                    )}
                  </React.Fragment>
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-10 h-10 p-0"
              >
                <span className="text-sm">&rsaquo;</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="w-10 h-10 p-0"
              >
                <span className="text-sm">&raquo;</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  function getPageNumbers() {
    const pages: (number | string)[] = [];
    const maxVisible = 7;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  }
}

function QuestionRow({ 
  question, 
  onDelete,
  getQuestionText,
  getSubjectCode,
  getSubjectColor
}: { 
  question: Question; 
  onDelete: (id: string) => void;
  getQuestionText: (question: Content[]) => string;
  getSubjectCode: (subjectName: string | null) => string;
  getSubjectColor: (subjectName: string | null) => string;
}) {
  const subjectCode = getSubjectCode(question.subject_name);
  const subjectColor = getSubjectColor(question.subject_name);
  const questionText = getQuestionText(question.question);

  return (
    <tr className="transition-colors hover:bg-emerald-50/30">
      <td className="px-6 py-4">
        <span className="font-mono text-sm font-medium text-gray-500">
          #{question.id.substring(0, 8)}
        </span>
      </td>
      <td className="max-w-md px-6 py-4">
        <p className="line-clamp-2 text-sm text-gray-900">
          {questionText}
        </p>
      </td>
      <td className="px-6 py-4">
        <span
          className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
          style={{ 
            backgroundColor: `${subjectColor}15`, 
            color: subjectColor,
            border: `1px solid ${subjectColor}30`
          }}
        >
          {subjectCode}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm font-medium text-gray-600">{question.topic_name || "-"}</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-gray-600">{question.year}</span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
            question.published 
              ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
              : "bg-gray-50 text-gray-700 border-gray-200"
          }`}
        >
          {question.published ? "Published" : "Draft"}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-1">
          <Link href={`/admin/questions/${question.id}/edit`}>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-blue-600 hover:bg-blue-50">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50"
            onClick={() => onDelete(question.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
}