import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CalendarDays, Trash2, Edit } from "lucide-react";


const ViewEventsDialog = ({ onClose }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    organizer: "",
    category: "",
    description: "",
  });


  // ✅ Fetch events on mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/viewAllEvents");
        setEvents(res.data.events || []);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);


  // ✅ Delete event handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/deleteEvent/${id}`);
      setEvents(events.filter((event) => event._id !== id));
      alert("✅ Event deleted successfully!");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("❌ Failed to delete event");
    }
  };


  // ✅ Open edit dialog
  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      organizer: event.organizer,
      category: event.category,
      description: event.description,
    });
  };


  // ✅ Update event handler
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5000/api/admin/updateEvent/${editingEvent._id}`,
        formData
      );
      // Update events list with updated event
      setEvents(events.map((event) => 
        event._id === editingEvent._id ? res.data.event : event
      ));
      setEditingEvent(null);
      alert("✅ Event updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      alert("❌ Failed to update event");
    }
  };


  // ✅ Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  return (
    <>
      {/* Main View Events Dialog */}
      <Dialog open={!editingEvent} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-7xl max-h-[90vh] bg-white/90 backdrop-blur-xl border border-purple-100/50 rounded-2xl shadow-2xl overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-purple-700 flex items-center gap-2">
              <CalendarDays className="h-6 w-6 text-purple-600" /> View All Events
            </DialogTitle>
          </DialogHeader>


          {loading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="animate-spin h-6 w-6 text-purple-500" />
              <span className="ml-2 text-gray-600">Loading events...</span>
            </div>
          ) : events.length === 0 ? (
            <p className="text-center text-gray-600 py-10">No events found.</p>
          ) : (
            <div className="overflow-x-auto overflow-y-auto max-h-[65vh] mt-4 border rounded-xl">
              <table className="w-full text-xs border-collapse">
                <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white sticky top-0 z-10">
                  <tr>
                    <th className="py-3 px-4 text-left font-semibold min-w-[150px]">Title</th>
                    <th className="py-3 px-4 text-left font-semibold min-w-[120px]">Date</th>
                    <th className="py-3 px-4 text-left font-semibold min-w-[100px]">Time</th>
                    <th className="py-3 px-4 text-left font-semibold min-w-[140px]">Location</th>
                    <th className="py-3 px-4 text-left font-semibold min-w-[130px]">Organizer</th>
                    <th className="py-3 px-4 text-left font-semibold min-w-[110px]">Category</th>
                    <th className="py-3 px-4 text-left font-semibold min-w-[200px] max-w-[300px]">Description</th>
                    <th className="py-3 px-4 text-center font-semibold min-w-[180px] sticky right-0 bg-gradient-to-r from-purple-600 to-indigo-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 bg-white">
                  {events.map((event, index) => (
                    <tr
                      key={event._id}
                      className={`border-b hover:bg-purple-50 transition-all ${
                        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                      }`}
                    >
                      <td className="py-3 px-4 font-medium">{event.title}</td>
                      <td className="py-3 px-4">{event.date}</td>
                      <td className="py-3 px-4">{event.time}</td>
                      <td className="py-3 px-4">{event.location}</td>
                      <td className="py-3 px-4">{event.organizer}</td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                          {event.category}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="line-clamp-2" title={event.description}>
                          {event.description}
                        </div>
                      </td>
                      <td className="py-3 px-4 sticky right-0 bg-inherit">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-lg flex items-center gap-1 text-xs h-8 border-blue-300 text-blue-600 hover:bg-blue-50"
                            onClick={() => handleEdit(event)}
                          >
                            <Edit className="h-3 w-3" /> Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="rounded-lg flex items-center gap-1 text-xs h-8"
                            onClick={() => handleDelete(event._id)}
                          >
                            <Trash2 className="h-3 w-3" /> Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}


          <div className="flex justify-end mt-6">
            <Button
              onClick={onClose}
              variant="outline"
              className="rounded-xl border-purple-300 text-purple-700 hover:bg-purple-100"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>


      {/* Edit Event Dialog */}
      {editingEvent && (
        <Dialog open={true} onOpenChange={() => setEditingEvent(null)}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-white/90 backdrop-blur-xl border border-purple-100/50 rounded-2xl shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-purple-700 flex items-center gap-2">
                <Edit className="h-6 w-6 text-purple-600" /> Edit Event
              </DialogTitle>
            </DialogHeader>


            <form onSubmit={handleUpdate} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title" className="text-sm font-medium">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="date" className="text-sm font-medium">Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="time" className="text-sm font-medium">Time</Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="organizer" className="text-sm font-medium">Organizer</Label>
                  <Input
                    id="organizer"
                    name="organizer"
                    value={formData.organizer}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="category" className="text-sm font-medium">Category</Label>
                  <Input
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="mt-1"
                />
              </div>


              <div className="flex justify-end gap-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingEvent(null)}
                  className="rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="rounded-xl bg-purple-600 hover:bg-purple-700"
                >
                  Update Event
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};


export default ViewEventsDialog;
