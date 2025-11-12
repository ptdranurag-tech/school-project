
import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// 🎯 Role-based category options
const categoryOptions = {
  owner: [
    "New Policy Announcement",
    "Financial Updates",
    "Important Circulars",
    "System Maintenance",
  ],
  principal: [
    "School Rules Update",
    "Exam Schedule",
    "Result Announcement",
    "Parent Meeting",
  ],
  vicePrincipal: [
    "Timetable Changes",
    "Staff Coordination Meeting",
    "Academic Calendar Update",
  ],
  management: [
    "Admission Notice",
    "Holiday Announcement",
    "Fee Reminder",
    "Infrastructure Update",
  ],
  teacher: [
    "Staff Meeting",
    "Exam Duties",
    "Class Substitution",
    "Training Workshop",
  ],
  student: [
    "Holiday Notice",
    "Exam Schedule",
    "Result Declaration",
    "Uniform / Dress Code Update",
    "PTM Reminder",
  ],
};

const EmergencyNoticeDialog = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    roles: [],
    category: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Text field handler
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ✅ Handle multi-role toggle
  const handleRoleSelect = (role) => {
    setFormData((prev) => {
      const exists = prev.roles.includes(role);
      return {
        ...prev,
        roles: exists
          ? prev.roles.filter((r) => r !== role)
          : [...prev.roles, role],
        category: "", // reset category when roles change
      };
    });
  };

  // ✅ Merge categories from selected roles
  const availableCategories = [
    ...new Set(formData.roles.flatMap((r) => categoryOptions[r] || [])),
  ];

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/admin/createEmergencyNotice", formData);
      alert("✅ Notice created successfully!");
      onClose();
    } catch (error) {
      console.error(error);
      alert("❌ Failed to create notice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white/90 backdrop-blur-lg border border-purple-100/60 rounded-2xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-700">
            📢 Create School Notice
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-3">
          {/* Title */}
          <div className="grid gap-2">
            <Label htmlFor="title">Notice Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g. Exam Schedule, Holiday Update"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role Selection */}
          <div className="grid gap-2">
            <Label>Target Roles</Label>
            <div className="flex flex-wrap gap-2">
              {[
                "owner",
                "principal",
                "vicePrincipal",
                "management",
                "teacher",
                "student",
              ].map((role) => (
                <Button
                  key={role}
                  type="button"
                  variant={
                    formData.roles.includes(role) ? "default" : "outline"
                  }
                  className="capitalize rounded-full"
                  onClick={() => handleRoleSelect(role)}
                >
                  {role}
                </Button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="grid gap-2">
            <Label>Category</Label>
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
              value={formData.category}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {availableCategories.length > 0 ? (
                  availableCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled>No categories available</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <Label htmlFor="description">Details</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter details of the notice..."
              rows={3}
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" /> Creating...
                </>
              ) : (
                "Create Notice"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmergencyNoticeDialog;
