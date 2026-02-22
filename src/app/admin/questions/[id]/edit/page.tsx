"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-hot-toast";
import { apiConfig } from "@/redux/api/config";
import { Loader2, Save, ArrowLeft } from "lucide-react";

interface Content {
  content: string;
  isMedia: boolean;
}

interface Subject {
  id: string;
  name: string;
}

interface Topic {
  id: string;
  name: string;
  subject_id: string;
}

interface Option {
  id: string;
  content: string;
  is_true: boolean;
  key: string;
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
  answers: Content[];
  filled_answer: string[];
  options?: Option[];
}

export default function EditQuestionPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  
  const [question, setQuestion] = useState<Question | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    source: "",
    year: 2024,
    subject_id: "",
    topic_id: "",
    type: "multiple-choice",
    published: true,
  });
  
  const [questionContent, setQuestionContent] = useState("");
  const [answerContent, setAnswerContent] = useState("");
  const [filledAnswers, setFilledAnswers] = useState<string[]>([""]);
  const [options, setOptions] = useState<Option[]>([
    { id: "1", content: "", is_true: false, key: "A" },
    { id: "2", content: "", is_true: false, key: "B" },
    { id: "3", content: "", is_true: false, key: "C" },
    { id: "4", content: "", is_true: false, key: "D" },
  ]);

  useEffect(() => {
    if (id) {
      fetchQuestion();
      fetchSubjects();
    }
  }, [id]);

  useEffect(() => {
    if (formData.subject_id) {
      fetchTopics(formData.subject_id);
    } else {
      setTopics([]);
    }
  }, [formData.subject_id]);

  async function fetchQuestion() {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // First get the question details
      const questionResponse = await fetch(
        `${apiConfig.baseUrl}/latihan-soal/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (!questionResponse.ok) {
        throw new Error("Failed to fetch question");
      }
      
      const questionData = await questionResponse.json();
      console.log("Question data:", questionData);
      
      setQuestion(questionData);
      
      // Set form data
      setFormData({
        source: questionData.source || "",
        year: questionData.year || 2024,
        subject_id: questionData.subject_id || "",
        topic_id: questionData.topic_id || "",
        type: questionData.type || "multiple-choice",
        published: questionData.published || false,
      });
      
      // Set content
      setQuestionContent(questionData.question?.[0]?.content || "");
      setAnswerContent(questionData.answers?.[0]?.content || "");
      
      // Set filled answers
      if (questionData.filled_answer && questionData.filled_answer.length > 0) {
        setFilledAnswers(questionData.filled_answer);
      }
      
      // Set options
      if (questionData.options && questionData.options.length > 0) {
        setOptions(questionData.options.map((opt: any) => ({
          ...opt,
          id: opt.id || Math.random().toString(36).substr(2, 9)
        })));
      }
      
      // Fetch topics for the subject
      if (questionData.subject_id) {
        fetchTopics(questionData.subject_id);
      }
    } catch (error) {
      console.error("Error fetching question:", error);
      setError("Failed to load question");
      toast.error("Failed to load question");
    } finally {
      setLoading(false);
    }
  }

  async function fetchSubjects() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiConfig.baseUrl}/latihan-soal-cms/subjects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch subjects");
      }

      const data = await response.json();
      setSubjects(Array.isArray(data) ? data : (data?.data || []));
    } catch (error) {
      console.error("Error fetching subjects:", error);
      toast.error("Failed to load subjects");
    }
  }

  async function fetchTopics(subjectId: string) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiConfig.baseUrl}/subjects-cms/topics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch topics");
      }

      const data = await response.json();
      const topicsArray = Array.isArray(data) ? data : (data?.data || []);
      
      // Filter topics by subject
      const filteredTopics = topicsArray.filter((topic: Topic) => topic.subject_id === subjectId);
      setTopics(filteredTopics);
    } catch (error) {
      console.error("Error fetching topics:", error);
      toast.error("Failed to load topics");
    }
  }

  function handleOptionChange(index: number, field: keyof Option, value: string | boolean) {
    const newOptions = [...options];
    newOptions[index] = { ...newOptions[index], [field]: value };
    setOptions(newOptions);
  }

  function handleAddOption() {
    const keys = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const nextKey = keys[options.length] || String(options.length + 1);
    
    setOptions([
      ...options,
      {
        id: Math.random().toString(36).substr(2, 9),
        content: "",
        is_true: false,
        key: nextKey
      }
    ]);
  }

  function handleRemoveOption(index: number) {
    if (options.length <= 2) {
      toast.error("Minimum 2 options required");
      return;
    }
    
    const newOptions = options.filter((_, i) => i !== index);
    // Renumber keys
    const keys = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const renumberedOptions = newOptions.map((opt, i) => ({
      ...opt,
      key: keys[i] || String(i + 1)
    }));
    
    setOptions(renumberedOptions);
  }

  function handleAddFilledAnswer() {
    setFilledAnswers([...filledAnswers, ""]);
  }

  function handleFilledAnswerChange(index: number, value: string) {
    const newFilledAnswers = [...filledAnswers];
    newFilledAnswers[index] = value;
    setFilledAnswers(newFilledAnswers);
  }

  function handleRemoveFilledAnswer(index: number) {
    if (filledAnswers.length <= 1) {
      toast.error("Minimum 1 answer required");
      return;
    }
    
    setFilledAnswers(filledAnswers.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      
      // Prepare the data
      const updateData = {
        id: id as string,
        source: formData.source,
        year: formData.year,
        subject_id: formData.subject_id,
        topic_id: formData.topic_id,
        type: formData.type,
        published: formData.published,
        question: [
          {
            content: questionContent,
            isMedia: false
          }
        ],
        answers: [
          {
            content: answerContent,
            isMedia: false
          }
        ],
        filled_answer: filledAnswers,
        options: formData.type === "multiple-choice" || formData.type === "multiple-answer" ? options : undefined
      };

      const response = await fetch(`${apiConfig.baseUrl}/latihan-soal-cms/soal/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update question");
      }

      toast.success("Question updated successfully");
      router.push("/admin/questions");
    } catch (error: any) {
      console.error("Error updating question:", error);
      setError(error.message || "Failed to update question");
      toast.error("Failed to update question");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Question</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => router.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.back()}
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Edit Question</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Question Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="source">Source</Label>
                <Input
                  id="source"
                  value={formData.source}
                  onChange={(e) => setFormData({...formData, source: e.target.value})}
                  placeholder="e.g., UTBK 2023"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: parseInt(e.target.value) || 2024})}
                  min="1900"
                  max="2100"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Subject</Label>
                <Select
                  value={formData.subject_id}
                  onValueChange={(value) => setFormData({...formData, subject_id: value, topic_id: ""})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Topic</Label>
                <Select
                  value={formData.topic_id || ""}
                  onValueChange={(value) => setFormData({...formData, topic_id: value})}
                  disabled={!formData.subject_id}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {topics.map((topic) => (
                      <SelectItem key={topic.id} value={topic.id}>
                        {topic.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({...formData, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                    <SelectItem value="multiple-answer">Multiple Answer</SelectItem>
                    <SelectItem value="fill-in">Fill In</SelectItem>
                    <SelectItem value="table-choice">Table Choice</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 flex items-end">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) => setFormData({...formData, published: e.target.checked})}
                    className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <Label htmlFor="published">Published</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Question Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="question">Question</Label>
              <TextArea
                id="question"
                value={questionContent}
                onChange={(e) => setQuestionContent(e.target.value)}
                placeholder="Enter to question content"
                required
              />
            </div>
          </CardContent>
        </Card>

        {(formData.type === "multiple-choice" || formData.type === "multiple-answer") && (
          <Card>
            <CardHeader>
              <CardTitle>Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {options.map((option, index) => (
                <div key={option.id} className="flex items-start gap-3">
                  <div className="flex items-center gap-2 pt-2">
                    <span className="font-medium text-gray-700">{option.key}.</span>
                    <input
                      type="radio"
                      name="correct-answer"
                      checked={option.is_true}
                      onChange={() => {
                        const newOptions = options.map((opt, i) => ({
                          ...opt,
                          is_true: i === index
                        }));
                        setOptions(newOptions);
                      }}
                      disabled={formData.type === "multiple-answer"}
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                    />
                    {formData.type === "multiple-answer" && (
                      <input
                        type="checkbox"
                        checked={option.is_true}
                        onChange={(e) => handleOptionChange(index, "is_true", e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <Input
                      value={option.content}
                      onChange={(e) => handleOptionChange(index, "content", e.target.value)}
                      placeholder={`Option ${option.key}`}
                      required
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveOption(index)}
                    disabled={options.length <= 2}
                  >
                    <span className="text-red-500">×</span>
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={handleAddOption}
                className="w-full"
              >
                Add Option
              </Button>
            </CardContent>
          </Card>
        )}

        {formData.type === "fill-in" && (
          <Card>
            <CardHeader>
              <CardTitle>Fill-In Answers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {filledAnswers.map((answer, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-1">
                    <Input
                      value={answer}
                      onChange={(e) => handleFilledAnswerChange(index, e.target.value)}
                      placeholder={`Answer ${index + 1}`}
                      required
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveFilledAnswer(index)}
                    disabled={filledAnswers.length <= 1}
                  >
                    <span className="text-red-500">×</span>
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={handleAddFilledAnswer}
                className="w-full"
              >
                Add Answer
              </Button>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Explanation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="explanation">Explanation</Label>
              <TextArea
                id="explanation"
                value={answerContent}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAnswerContent(e.target.value)}
                placeholder="Enter to explanation/answer content"
                required
              />
            </div>
          </CardContent>
        </Card>

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={saving}
            className="bg-emerald-600 text-white hover:bg-emerald-700"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}