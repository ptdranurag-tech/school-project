import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const ContactTable = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContacts, setSelectedContacts] = useState(new Set());
  const itemsPerPage = 10;

  // ✅ Fetch Data with Error Handling
  const fetchContacts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/admin/getInTouchContactAllData",
        { timeout: 10000 }
      );
      if (data.success && Array.isArray(data.data)) {
        setContacts(data.data);
      } else {
        throw new Error("Invalid data format");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.response?.data?.message || "Failed to load messages. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // ✅ Enhanced Delete with Toast Notification
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/deleteContact/${id}`);
      setContacts((prev) => prev.filter((item) => item._id !== id));
      setSelectedContacts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete message. Please try again.");
    }
  };

  // ✅ Bulk Delete
  const handleBulkDelete = async () => {
    if (selectedContacts.size === 0) return;
    if (!window.confirm(`Delete ${selectedContacts.size} selected messages?`)) return;
    
    try {
      await Promise.all(
        Array.from(selectedContacts).map((id) =>
          axios.delete(`http://localhost:5000/api/admin/deleteContact/${id}`)
        )
      );
      setContacts((prev) => prev.filter((item) => !selectedContacts.has(item._id)));
      setSelectedContacts(new Set());
    } catch (error) {
      console.error("Bulk delete failed:", error);
      alert("Failed to delete some messages. Please try again.");
    }
  };

  // ✅ Search Filter
  const filteredContacts = contacts.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.message?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ Sorting Logic
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (sortConfig.key === "createdAt") {
      return sortConfig.direction === "asc"
        ? new Date(aValue) - new Date(bValue)
        : new Date(bValue) - new Date(aValue);
    }
    
    if (typeof aValue === "string") {
      return sortConfig.direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    return 0;
  });

  // ✅ Pagination
  const totalPages = Math.ceil(sortedContacts.length / itemsPerPage);
  const paginatedContacts = sortedContacts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ✅ Sort Handler
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // ✅ Select All Toggle
  const handleSelectAll = () => {
    if (selectedContacts.size === paginatedContacts.length) {
      setSelectedContacts(new Set());
    } else {
      setSelectedContacts(new Set(paginatedContacts.map((item) => item._id)));
    }
  };

  // ✅ Toggle Individual Selection
  const toggleSelect = (id) => {
    setSelectedContacts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="mt-10 bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-purple-100">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          📩 Contact Messages
        </h2>
        
        {/* Search & Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full sm:w-64 px-4 py-2 pl-10 text-sm border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
              aria-label="Search contact messages"
            />
            <svg
              className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          
          {selectedContacts.size > 0 && (
            <button
              onClick={handleBulkDelete}
              className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
            >
              🗑 Delete ({selectedContacts.size})
            </button>
          )}
          
          <button
            onClick={fetchContacts}
            disabled={loading}
            className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Refresh messages"
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <span className="text-red-500 text-xl">⚠️</span>
          <div className="flex-1">
            <p className="text-red-700 text-sm font-medium">Error</p>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
          <button
            onClick={fetchContacts}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Retry
          </button>
        </div>
      )}

      {/* Stats Bar */}
      {!loading && !error && (
        <div className="mb-4 flex flex-wrap gap-4 text-sm text-gray-600">
          <span className="px-3 py-1 bg-purple-50 rounded-full">
            Total: <strong>{contacts.length}</strong>
          </span>
          <span className="px-3 py-1 bg-indigo-50 rounded-full">
            Showing: <strong>{paginatedContacts.length}</strong>
          </span>
          {searchQuery && (
            <span className="px-3 py-1 bg-green-50 rounded-full">
              Filtered: <strong>{filteredContacts.length}</strong>
            </span>
          )}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600 mb-4"></div>
          <p className="text-gray-500 text-sm">Loading messages...</p>
        </div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-gray-500 text-sm">No messages found.</p>
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-500 text-sm">No results found for "{searchQuery}"</p>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto overflow-y-auto max-h-[500px] border rounded-2xl shadow-inner">
            <table className="min-w-full text-left text-sm border-collapse">
              <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white sticky top-0 z-10">
                <tr>
                  <th className="px-5 py-3 font-medium">
                    <input
                      type="checkbox"
                      checked={selectedContacts.size === paginatedContacts.length && paginatedContacts.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 cursor-pointer accent-white"
                      aria-label="Select all messages"
                    />
                  </th>
                  <th
                    className="px-5 py-3 font-medium cursor-pointer hover:bg-white/10 transition-colors select-none"
                    onClick={() => handleSort("name")}
                  >
                    Name {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="px-5 py-3 font-medium cursor-pointer hover:bg-white/10 transition-colors select-none"
                    onClick={() => handleSort("email")}
                  >
                    Email {sortConfig.key === "email" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="px-5 py-3 font-medium">Message</th>
                  <th
                    className="px-5 py-3 font-medium cursor-pointer hover:bg-white/10 transition-colors select-none"
                    onClick={() => handleSort("createdAt")}
                  >
                    Created At {sortConfig.key === "createdAt" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="px-5 py-3 font-medium text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white/60">
                {paginatedContacts.map((item) => (
                  <tr
                    key={item._id}
                    className={`hover:bg-purple-50/70 transition-all duration-200 ${
                      selectedContacts.has(item._id) ? "bg-purple-100/50" : ""
                    }`}
                  >
                    <td className="px-5 py-3">
                      <input
                        type="checkbox"
                        checked={selectedContacts.has(item._id)}
                        onChange={() => toggleSelect(item._id)}
                        className="w-4 h-4 cursor-pointer accent-purple-600"
                        aria-label={`Select message from ${item.name}`}
                      />
                    </td>
                    <td className="px-5 py-3 text-gray-700 font-medium">{item.name}</td>
                    <td className="px-5 py-3 text-gray-700">
                      <a
                        href={`mailto:${item.email}`}
                        className="text-indigo-600 hover:text-indigo-800 hover:underline"
                      >
                        {item.email}
                      </a>
                    </td>
                    <td className="px-5 py-3 text-gray-700 max-w-xs">
                      <div className="line-clamp-2" title={item.message}>
                        {item.message}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-600 text-xs whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="px-5 py-3 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="px-3 py-1.5 text-xs rounded-lg bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
                          aria-label={`Delete message from ${item.name}`}
                        >
                          🗑
                        </button>
                        <a
                          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${item.email}&su=Re: Your Contact Message&body=Hi ${item.name},%0D%0A%0D%0AThank you for reaching out!`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 text-xs rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
                          aria-label={`Send email to ${item.name}`}
                        >
                          ✉
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-600">
                Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm rounded-lg bg-white border border-purple-200 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  ← Previous
                </button>
                
                {/* Page Numbers */}
                <div className="hidden sm:flex gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-2 text-sm rounded-lg transition-all ${
                          currentPage === pageNum
                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                            : "bg-white border border-purple-200 hover:bg-purple-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm rounded-lg bg-white border border-purple-200 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ContactTable;
