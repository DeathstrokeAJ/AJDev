"use client"

import { useEffect, useState } from "react"
import { auth, provider, firestore } from "@/lib/firebase"
import { signInWithPopup, signOut } from "firebase/auth"
import { collection, addDoc, updateDoc, deleteDoc, doc, Timestamp, query, orderBy, onSnapshot } from "firebase/firestore"
import { Search, Plus, Edit3, Trash2, Heart, Share2, BookOpen, X, ChevronDown, Filter, Clock, User, Camera, Send, Sparkles, Terminal, LogOut } from "lucide-react"

const AJ_EMAIL = "adithyaj2910@gmail.com"

export default function NerdNotesPage() {
  const [user, setUser] = useState<any>(null)
  const [showLogin, setShowLogin] = useState(false)
  const [error, setError] = useState("")
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showWrite, setShowWrite] = useState(false)
  const [editBlog, setEditBlog] = useState<any>(null)
  const [newBlog, setNewBlog] = useState({ title: "", content: "", image: "", tags: "" })
  const [submitting, setSubmitting] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  // Google login
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      if (result.user.email !== AJ_EMAIL) {
        setError("Sorry, only AJ is allowed to write/manage blogs.")
        await signOut(auth)
        setUser(null)
        setShowLogin(false)
        return
      }
      setUser(result.user)
      setShowLogin(false)
      setError("")
    } catch (err) {
      setError("Login failed. Try again!")
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
    setUser(null)
  }

  // Real-time Firestore listener
  useEffect(() => {
    setLoading(true)
    const q = query(collection(firestore, "blogs"), orderBy("date", "desc"))
    const unsubscribe = onSnapshot(q, (snap) => {
      setBlogs(snap.docs.map(doc => {
        const data = doc.data()
        return {
          ...data,
          id: doc.id,
          date: data.date?.toDate ? data.date.toDate() : new Date(),
          tags: Array.isArray(data.tags) ? data.tags : [],
          likes: typeof data.likes === "number" ? data.likes : 0,
        }
      }))
      setError("")
      setLoading(false)
    }, (err) => {
      setError("Failed to load blogs. Try again later.")
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  // Filter blogs based on search and tags
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         blog.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = !selectedTag || blog.tags?.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  // Get all unique tags
  const allTags = [...new Set(blogs.flatMap(blog => blog.tags || []))]

  const handleBlogChange = (e: any) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value })
  }

  const handleBlogSubmit = async (e: any) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const blogData = {
        ...newBlog,
        author: user?.displayName || "AJ",
        date: Timestamp.now(),
        email: user?.email,
        tags: newBlog.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean),
        likes: editBlog ? editBlog.likes : 0,
      }
      if (editBlog) {
        await updateDoc(doc(firestore, "blogs", editBlog.id), blogData)
      } else {
        await addDoc(collection(firestore, "blogs"), blogData)
      }
      setNewBlog({ title: "", content: "", image: "", tags: "" })
      setShowWrite(false)
      setEditBlog(null)
    } catch (err) {
      setError("Failed to post blog. Try again!")
    }
    setSubmitting(false)
  }

  const handleEdit = (blog: any) => {
    setEditBlog(blog)
    setNewBlog({ 
      title: blog.title, 
      content: blog.content, 
      image: blog.image || "",
      tags: blog.tags?.join(', ') || ""
    })
    setShowWrite(true)
  }

  const handleDelete = async (blogId: string) => {
    if (!window.confirm("Delete this nerd note? This action cannot be undone!")) return
    try {
      await deleteDoc(doc(firestore, "blogs", blogId))
    } catch (err) {
      setError("Failed to delete blog. Try again!")
    }
  }

  const handleLike = async (blogId: string) => {
    try {
      const blog = blogs.find(b => b.id === blogId)
      if (!blog) return
      await updateDoc(doc(firestore, "blogs", blogId), { likes: (blog.likes || 0) + 1 })
    } catch (err) {
      setError("Failed to like blog. Try again!")
    }
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header Section */}
      <div className="border-b border-purple-500/20 bg-black/20 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div >
                
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                   NerdNotes
                </h1>
                <p className="text-purple-300">A GenZ dev blog for the terminally online ✨</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-black/40 border border-purple-500/30 rounded-xl px-4 py-2">
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm font-medium text-purple-300">
                      Welcome, {user.displayName}!
                    </span>
                  </div>
                  {user.email === AJ_EMAIL && (
                    <button
                      onClick={() => setShowWrite(true)}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-4 py-2 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-purple-500/25"
                    >
                      <Plus className="w-4 h-4" />
                      Drop Knowledge
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="bg-black/40 border border-purple-500/30 hover:border-purple-500/50 px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-purple-500/25"
                >
                  <span className="text-lg">🔐</span>
                  Are you AJ? Prove it
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-900 to-purple-900 border border-purple-500/30 rounded-xl p-8 shadow-2xl max-w-md w-full relative">
            <button 
              className="absolute top-4 right-4 text-purple-400 hover:text-purple-300 transition-colors duration-200" 
              onClick={() => setShowLogin(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-xl w-fit mx-auto mb-4">
                <Terminal className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Are you really AJ? 👀</h2>
              <p className="text-purple-300">Verify with Google to enter the secret blog lair.</p>
            </div>
            <button 
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/25" 
              onClick={handleLogin}
            >
              <span className="text-lg">🔐</span>
              Sign in with Google
            </button>
            {error && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-center text-sm">
                {error}
              </div>
            )}
          </div>
        </div>
      )}
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search the nerd-verse..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-black/40 border border-purple-500/30 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 bg-black/40 border border-purple-500/30 rounded-xl hover:border-purple-500 transition-all duration-200 flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
        {/* Tag Filters */}
        {showFilters && (
          <div className="mb-6 p-4 bg-black/40 border border-purple-500/30 rounded-xl">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag("")}
                className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${!selectedTag ? 'bg-purple-500 text-white' : 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30'}`}
              >
                All
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${selectedTag === tag ? 'bg-purple-500 text-white' : 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30'}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-black/40 border border-purple-500/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{blogs.length}</div>
            <div className="text-sm text-purple-300">Total Notes</div>
          </div>
          <div className="bg-black/40 border border-purple-500/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-pink-400">{blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0)}</div>
            <div className="text-sm text-purple-300">Total Likes</div>
          </div>
          <div className="bg-black/40 border border-purple-500/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{allTags.length}</div>
            <div className="text-sm text-purple-300">Topics</div>
          </div>
          <div className="bg-black/40 border border-purple-500/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">24/7</div>
            <div className="text-sm text-purple-300">Coding Mode</div>
          </div>
        </div>
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-center">
            {error}
          </div>
        )}
        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-purple-300">Loading the nerd-verse...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBlogs.length === 0 ? (
              <div className="text-center py-12 bg-black/40 border border-purple-500/30 rounded-xl">
                <BookOpen className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <p className="text-purple-300 text-lg">No notes found in the nerd-verse</p>
                <p className="text-purple-400 text-sm">Try adjusting your search or filters</p>
              </div>
            ) : (
              filteredBlogs.map((blog) => (
                <div key={blog.id} className="group bg-black/40 border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Image */}
                    {blog.image && (
                      <div className="lg:w-72 h-48 rounded-lg overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex-shrink-0">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h2 className="text-xl lg:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-200">
                          {blog.title}
                        </h2>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleLike(blog.id)}
                            className="flex items-center gap-1 text-purple-400 hover:text-pink-400 transition-colors duration-200"
                          >
                            <Heart className="w-4 h-4" />
                            <span className="text-sm">{blog.likes || 0}</span>
                          </button>
                          <button className="text-purple-400 hover:text-pink-400 transition-colors duration-200">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-purple-300 mb-4">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{blog.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{blog.date?.toLocaleDateString ? blog.date.toLocaleDateString() : blog.date}</span>
                        </div>
                      </div>
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {blog.content}
                      </p>
                      {/* Tags */}
                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {blog.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                      {/* Actions */}
                      {user && user.email === AJ_EMAIL && (
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleEdit(blog)}
                            className="flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors duration-200"
                          >
                            <Edit3 className="w-4 h-4" />
                            <span className="text-sm">Edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(blog.id)}
                            className="flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="text-sm">Delete</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
        {/* Write/Edit Modal */}
        {user && user.email === AJ_EMAIL && showWrite && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-slate-900 to-purple-900 border border-purple-500/30 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  {editBlog ? "Edit Nerd Note" : "Drop Some Knowledge"}
                </h3>
                <button
                  onClick={() => {
                    setShowWrite(false)
                    setEditBlog(null)
                    setNewBlog({ title: "", content: "", image: "", tags: "" })
                  }}
                  className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleBlogSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="What's the big idea?"
                    value={newBlog.title}
                    onChange={handleBlogChange}
                    className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">
                    Content
                  </label>
                  <textarea
                    name="content"
                    placeholder="Share your nerd wisdom with the world..."
                    value={newBlog.content}
                    onChange={handleBlogChange}
                    rows={8}
                    className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 text-white resize-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">
                    Image URL
                  </label>
                  <div className="relative">
                    <Camera className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                    <input
                      type="url"
                      name="image"
                      placeholder="https://example.com/image.jpg"
                      value={newBlog.image}
                      onChange={handleBlogChange}
                      className="w-full pl-10 pr-4 py-3 bg-black/40 border border-purple-500/30 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    placeholder="React, TypeScript, Web Dev (comma separated)"
                    value={newBlog.tags}
                    onChange={handleBlogChange}
                    className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 text-white"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                      {editBlog ? "Saving..." : "Publishing..."}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {editBlog ? "Save Changes" : "Publish Note"}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}