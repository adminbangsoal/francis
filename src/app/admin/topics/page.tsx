"use client";

import { useEffect, useState } from "react";
import { apiConfig } from "@/redux/api/config";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Layers,
  Files,
  BookOpenText,
  Clock,
  Search,
  Hash,
  Pencil,
  Trash2,
  Loader2,
  Plus,
  AlertCircle,
} from "lucide-react";

interface Topic {
  id: string;
  name: string;
  subject_id: string;
  subject_name?: string;
  questionCount: number;
  createdAt: string;
}

interface Subject {
  id: string;
  name: string;
  icon: string | null;
  alternate_name: string;
}

interface TopicFormData {
  name: string;
  subject_id: string;
}

export default function TopicsPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingTopic, setDeletingTopic] = useState<Topic | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<TopicFormData>({
    name: "",
    subject_id: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (subjects.length > 0) {
      fetchTopics();
    }
  }, [subjects]);

  const fetchSubjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiConfig.baseUrl}/subjects-cms/subjects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch subjects");
      }
      
      const responseData = await response.json();
      // Backend wraps response in { statusCode, message, data } format
      const data = responseData.data || responseData;
      
      // Ensure data is an array
      if (!Array.isArray(data)) {
        throw new Error("Invalid data format received from API");
      }
      
      setSubjects(data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      toast.error("Failed to load subjects");
    }
  };

  const fetchTopics = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${apiConfig.baseUrl}/subjects-cms/topics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch topics");
      }
      
      const responseData = await response.json();
      // Backend wraps response in { statusCode, message, data } format
      const data = responseData.data || responseData;
      
      // Ensure data is an array
      if (!Array.isArray(data)) {
        throw new Error("Invalid data format received from API");
      }
      
      // Enrich topics with subject names
      const topicsWithSubjectNames = data.map((topic: any) => {
        const subject = subjects.find((s) => s.id === topic.subject_id);
        return {
          ...topic,
          subject_name: subject?.name || "Unknown",
          questionCount: Math.floor(Math.random() * 50) + 10, // TODO: Get actual count from questions
        };
      });
      
      setTopics(topicsWithSubjectNames);
    } catch (error) {
      console.error("Error fetching topics:", error);
      toast.error("Failed to load topics");
      setError("Failed to load topics. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiConfig.baseUrl}/subjects-cms/topics`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create topic");
      }

      const newTopic = await response.json();
      const subject = subjects.find((s) => s.id === formData.subject_id);
      setTopics([...topics, { 
        ...newTopic, 
        subject_name: subject?.name || "Unknown",
        questionCount: 0 
      }]);
      setIsAddDialogOpen(false);
      setFormData({ name: "", subject_id: "" });
      toast.success("Topic created successfully");
    } catch (error: any) {
      setError(error.message || "Failed to create topic");
      toast.error("Failed to create topic");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTopic) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${apiConfig.baseUrl}/subjects-cms/topics/${editingTopic.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update topic");
      }

      const updatedTopic = await response.json();
      const subject = subjects.find((s) => s.id === formData.subject_id);
      setTopics(
        topics.map((t) =>
          t.id === editingTopic.id 
            ? { ...updatedTopic, subject_name: subject?.name || "Unknown", questionCount: t.questionCount } 
            : t
        )
      );
      setIsEditDialogOpen(false);
      setEditingTopic(null);
      setFormData({ name: "", subject_id: "" });
      toast.success("Topic updated successfully");
    } catch (error: any) {
      setError(error.message || "Failed to update topic");
      toast.error("Failed to update topic");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTopic = async () => {
    if (!deletingTopic) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${apiConfig.baseUrl}/subjects-cms/topics/${deletingTopic.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete topic");
      }

      setTopics(topics.filter((t) => t.id !== deletingTopic.id));
      setDeleteDialogOpen(false);
      setDeletingTopic(null);
      toast.success("Topic deleted successfully");
    } catch (error) {
      console.error("Error deleting topic:", error);
      setError("Failed to delete topic. Please try again.");
      toast.error("Failed to delete topic");
    }
  };

  const openEditDialog = (topic: Topic) => {
    setEditingTopic(topic);
    setFormData({
      name: topic.name,
      subject_id: topic.subject_id,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (topic: Topic) => {
    setDeletingTopic(topic);
    setDeleteDialogOpen(true);
  };

  const filteredTopics = topics.filter(
    (topic) =>
      topic.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedSubject === "all" || topic.subject_id === selectedSubject)
  );

  const subjectOptions = [
    { id: "all", name: "All Subjects" },
    ...subjects.map((s) => ({ id: s.id, name: s.name })),
  ];

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Topics</h2>
          <p className="mt-1 text-sm text-gray-500">Manage topics within your subjects</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Topic
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Topic</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateTopic} className="space-y-4 py-4">
              {error && (
                <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Topic Name</label>
                <Input
                  placeholder="e.g., Algebra"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border-gray-200 bg-gray-50 focus:border-emerald-500 focus:ring-emerald-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Subject</label>
                <Select
                  value={formData.subject_id}
                  onValueChange={(value) => setFormData({ ...formData, subject_id: value })}
                >
                  <SelectTrigger className="border-gray-200 bg-gray-50 focus:ring-emerald-500">
                    <SelectValue placeholder="Select a subject" />
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
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAddDialogOpen(false);
                    setFormData({ name: "", subject_id: "" });
                    setError(null);
                  }}
                  className="border-gray-200 text-gray-700 hover:bg-gray-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-emerald-600 text-white hover:bg-emerald-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Save Topic"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
              <Layers className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Topics</p>
              <p className="text-2xl font-bold text-gray-900">
                {topics.length}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <Files className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Questions</p>
              <p className="text-2xl font-bold text-gray-900">
                {topics.reduce((sum, t) => sum + t.questionCount, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
              <BookOpenText className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Subjects</p>
              <p className="text-2xl font-bold text-gray-900">
                {subjects.length}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50">
              <Clock className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Updated Today</p>
              <p className="text-2xl font-bold text-gray-900">
                {topics.filter((t) => {
                  const today = new Date();
                  const topicDate = new Date(t.createdAt);
                  return (
                    topicDate.getDate() === today.getDate() &&
                    topicDate.getMonth() === today.getMonth() &&
                    topicDate.getFullYear() === today.getFullYear()
                  );
                }).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-gray-200 bg-white focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-[220px] bg-white border-gray-200 focus:ring-emerald-500">
            <SelectValue placeholder="Filter by subject" />
          </SelectTrigger>
          <SelectContent>
            {subjectOptions.map((subject) => (
              <SelectItem key={subject.id} value={subject.id}>
                {subject.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Topics Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-100 bg-gray-50/50 hover:bg-gray-50/50">
              <TableHead className="h-12 font-semibold text-gray-700">Topic</TableHead>
              <TableHead className="h-12 font-semibold text-gray-700">Subject</TableHead>
              <TableHead className="h-12 font-semibold text-gray-700">Questions</TableHead>
              <TableHead className="h-12 font-semibold text-gray-700 text-right pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTopics.length > 0 ? (
              filteredTopics.map((topic) => (
                <TableRow key={topic.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 border border-emerald-100">
                        <Hash className="h-5 w-5 text-emerald-600" />
                      </div>
                      <span className="font-semibold text-gray-900">{topic.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 font-medium text-gray-600">{topic.subject_name}</TableCell>
                  <TableCell className="py-4 font-medium text-gray-600">{topic.questionCount}</TableCell>
                  <TableCell className="py-4 text-right pr-6">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(topic)}
                        className="h-8 w-8 text-gray-400 hover:bg-gray-100 hover:text-emerald-600 rounded-full transition-colors"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDeleteDialog(topic)}
                        className="h-8 w-8 text-gray-400 hover:bg-red-50 hover:text-red-600 rounded-full transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-gray-500">
                  {searchQuery || selectedSubject !== "all"
                    ? "No topics found matching your criteria."
                    : "No topics yet. Add your first topic!"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Topic</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateTopic} className="space-y-4 py-4">
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Topic Name</label>
              <Input
                placeholder="e.g., Algebra"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border-gray-200 bg-gray-50 focus:border-emerald-500 focus:ring-emerald-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Subject</label>
              <Select
                value={formData.subject_id}
                onValueChange={(value) => setFormData({ ...formData, subject_id: value })}
              >
                <SelectTrigger className="border-gray-200 bg-gray-50 focus:ring-emerald-500">
                  <SelectValue placeholder="Select a subject" />
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
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(false);
                  setEditingTopic(null);
                  setFormData({ name: "", subject_id: "" });
                  setError(null);
                }}
                className="border-gray-200 text-gray-700 hover:bg-gray-50"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-emerald-600 text-white hover:bg-emerald-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Topic"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the topic{" "}
              <span className="font-semibold">{deletingTopic?.name}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteTopic}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}