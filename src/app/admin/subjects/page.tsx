"use client";

import { useEffect, useState } from "react";
import { apiConfig } from "@/redux/api/config";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Brain,
  Calculator,
  Languages,
  Globe,
  Plus,
  BookOpenText,
  Layers,
  Files,
  TrendingUp,
  Search,
  Pencil,
  Trash2,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface Subject {
  id: string;
  name: string;
  icon: string | null;
  alternate_name: string;
  slug: string | null;
  year: string | null;
  topicCount: number;
  questionCount: number;
}

interface SubjectFormData {
  name: string;
  icon: string;
  alternate_name?: string;
  slug?: string;
  year?: string;
}

const ICON_MAP: Record<string, any> = {
  Brain,
  Calculator,
  Languages,
  Globe,
  BookOpenText,
  Layers,
  Files,
  TrendingUp,
};

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingSubject, setDeletingSubject] = useState<Subject | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<SubjectFormData>({
    name: "",
    icon: "Brain",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      setError(null);
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
      
      // Ensure data is an array before mapping
      if (!Array.isArray(data)) {
        throw new Error("Invalid data format received from API");
      }
      
      // Fetch topic and question counts for each subject
      const subjectsWithCounts = await Promise.all(
        data.map(async (subject: any) => {
          const topicsResponse = await fetch(
            `${apiConfig.baseUrl}/subjects-cms/topics`,
            { 
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const topicsData = await topicsResponse.json();
          // Extract data from wrapped response format { statusCode, message, data }
          const topicsArray = topicsData.data || topicsData;
          const topicCount = topicsArray.filter(
            (t: any) => t.subject_id === subject.id
          ).length;
          
          return {
            ...subject,
            topicCount,
            questionCount: Math.floor(Math.random() * 200) + 50, // TODO: Get actual count from questions
          };
        })
      );
      
      setSubjects(subjectsWithCounts);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      toast.error("Failed to load subjects");
      setError("Failed to load subjects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiConfig.baseUrl}/subjects-cms/subjects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create subject");
      }

      const newSubject = await response.json();
      setSubjects([...subjects, { ...newSubject, topicCount: 0, questionCount: 0 }]);
      setIsAddDialogOpen(false);
      setFormData({ name: "", icon: "Brain" });
      toast.success("Subject created successfully");
    } catch (error: any) {
      setError(error.message || "Failed to create subject");
      toast.error("Failed to create subject");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSubject) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${apiConfig.baseUrl}/subjects-cms/subjects/${editingSubject.id}`,
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
        throw new Error(errorData.message || "Failed to update subject");
      }

      const updatedSubject = await response.json();
      setSubjects(
        subjects.map((s) =>
          s.id === editingSubject.id ? { ...updatedSubject, topicCount: s.topicCount, questionCount: s.questionCount } : s
        )
      );
      setIsEditDialogOpen(false);
      setEditingSubject(null);
      setFormData({ name: "", icon: "Brain" });
      toast.success("Subject updated successfully");
    } catch (error: any) {
      setError(error.message || "Failed to update subject");
      toast.error("Failed to update subject");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSubject = async () => {
    if (!deletingSubject) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${apiConfig.baseUrl}/subjects-cms/subjects/${deletingSubject.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete subject");
      }

      setSubjects(subjects.filter((s) => s.id !== deletingSubject.id));
      setDeleteDialogOpen(false);
      setDeletingSubject(null);
      toast.success("Subject deleted successfully");
    } catch (error) {
      console.error("Error deleting subject:", error);
      setError("Failed to delete subject. Please try again.");
      toast.error("Failed to delete subject");
    }
  };

  const openEditDialog = (subject: Subject) => {
    setEditingSubject(subject);
    setFormData({
      name: subject.name,
      icon: subject.icon || "Brain",
      alternate_name: subject.alternate_name,
      slug: subject.slug || undefined,
      year: subject.year || undefined,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (subject: Subject) => {
    setDeletingSubject(subject);
    setDeleteDialogOpen(true);
  };

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Subjects</h2>
          <p className="mt-1 text-sm text-gray-500">Manage your subjects and their topics</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Subject
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Subject</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateSubject} className="space-y-4 py-4">
              {error && (
                <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Subject Name</label>
                <Input
                  placeholder="e.g., Mathematics"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border-gray-200 bg-gray-50 focus:border-emerald-500 focus:ring-emerald-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Icon</label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500"
                >
                  {Object.keys(ICON_MAP).map((iconName) => (
                    <option key={iconName} value={iconName}>
                      {iconName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Alternate Name</label>
                <Input
                  placeholder="e.g., Math"
                  value={formData.alternate_name || ""}
                  onChange={(e) => setFormData({ ...formData, alternate_name: e.target.value })}
                  className="border-gray-200 bg-gray-50 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAddDialogOpen(false);
                    setFormData({ name: "", icon: "Brain" });
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
                    "Save Subject"
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
              <BookOpenText className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Subjects</p>
              <p className="text-2xl font-bold text-gray-900">
                {subjects.length}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <Layers className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Topics</p>
              <p className="text-2xl font-bold text-gray-900">
                {subjects.reduce((sum, s) => sum + s.topicCount, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
              <Files className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Questions</p>
              <p className="text-2xl font-bold text-gray-900">
                {subjects.reduce((sum, s) => sum + s.questionCount, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50">
              <TrendingUp className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Now</p>
              <p className="text-2xl font-bold text-gray-900">
                {subjects.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Actions Area */}
      <div className="flex items-center gap-4">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-gray-200 bg-white focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Subjects Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-100 bg-gray-50/50 hover:bg-gray-50/50">
              <TableHead className="h-12 font-semibold text-gray-700">Subject</TableHead>
              <TableHead className="h-12 font-semibold text-gray-700">Topics</TableHead>
              <TableHead className="h-12 font-semibold text-gray-700">Questions</TableHead>
              <TableHead className="h-12 font-semibold text-gray-700">Alternate Name</TableHead>
              <TableHead className="h-12 font-semibold text-gray-700 text-right pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubjects.length > 0 ? (
              filteredSubjects.map((subject) => {
                const IconComponent = ICON_MAP[subject.icon || "Brain"] || Brain;
                return (
                  <TableRow key={subject.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <TableCell className="py-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 border border-emerald-100">
                          <IconComponent className="h-5 w-5 text-emerald-600" />
                        </div>
                        <span className="font-semibold text-gray-900">{subject.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 font-medium text-gray-600">{subject.topicCount}</TableCell>
                    <TableCell className="py-4 font-medium text-gray-600">{subject.questionCount}</TableCell>
                    <TableCell className="py-4 text-gray-500 text-sm">
                      {subject.alternate_name || "-"}
                    </TableCell>
                    <TableCell className="py-4 text-right pr-6">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(subject)}
                          className="h-8 w-8 text-gray-400 hover:bg-gray-100 hover:text-emerald-600 rounded-full transition-colors"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDeleteDialog(subject)}
                          className="h-8 w-8 text-gray-400 hover:bg-red-50 hover:text-red-600 rounded-full transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-gray-500">
                  {searchQuery ? "No subjects found matching your search." : "No subjects yet. Add your first subject!"}
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
            <DialogTitle>Edit Subject</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateSubject} className="space-y-4 py-4">
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Subject Name</label>
              <Input
                placeholder="e.g., Mathematics"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border-gray-200 bg-gray-50 focus:border-emerald-500 focus:ring-emerald-500"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Icon</label>
              <select
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500"
              >
                {Object.keys(ICON_MAP).map((iconName) => (
                  <option key={iconName} value={iconName}>
                    {iconName}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Alternate Name</label>
              <Input
                placeholder="e.g., Math"
                value={formData.alternate_name || ""}
                onChange={(e) => setFormData({ ...formData, alternate_name: e.target.value })}
                className="border-gray-200 bg-gray-50 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(false);
                  setEditingSubject(null);
                  setFormData({ name: "", icon: "Brain" });
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
                  "Update Subject"
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
              This action cannot be undone. This will permanently delete the subject{" "}
              <span className="font-semibold">{deletingSubject?.name}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteSubject}
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