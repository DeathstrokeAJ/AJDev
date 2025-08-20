"use client"

import { useEffect, useState } from "react"
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  User
} from "firebase/auth"
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  orderBy, 
  query,
  Timestamp,
  QueryDocumentSnapshot,
  DocumentData
} from "firebase/firestore"
import { auth, firestore, provider } from "@/lib/firebase"
import { Search, Plus, Edit3, Trash2, Heart, Share2, BookOpen, X, ChevronDown, Filter, Clock, User as UserIcon, Camera, Send, Sparkles, LogOut, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface BlogPost {
  id: string
  title: string
  content: string
  author: string
  date: Date
  tags: string[]
  likes: number
  image?: string
  email: string
}

const AJ_EMAIL = "adithyaj2910@gmail.com"

export default function NerdNotesPage() {
  const [user, setUser] = useState<User | null>(null)
  const [showLogin, setShowLogin] = useState(false)
  const [error, setError] = useState("")
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [showWrite, setShowWrite] = useState(false)
  const [editBlog, setEditBlog] = useState<BlogPost | null>(null)
  const [newBlog, setNewBlog] = useState({ title: "", content: "", image: "", tags: "" })
  const [submitting, setSubmitting] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setError("")
    })
    return () => unsubscribe()
  }, [])

  // Real Firebase login handler
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
      setShowLogin(false)
      setError("")
    } catch (err: any) {
      console.error("Login error:", err)
      setError(`Login failed: ${err.message}`)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setShowMobileMenu(false)
      setError("")
    } catch (err: any) {
      console.error("Logout error:", err)
      setError(`Logout failed: ${err.message}`)
    }
  }

  // Real Firestore listener for blogs
  useEffect(() => {
    setLoading(true)
    const blogsRef = collection(firestore, "blogs")
    const q = query(blogsRef, orderBy("date", "desc"))
    
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        try {
          const blogData: BlogPost[] = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
            const data = doc.data()
            return {
              id: doc.id,
              title: data.title || "",
              content: data.content || "",
              author: data.author || "Unknown",
              date: data.date?.toDate() || new Date(),
              tags: Array.isArray(data.tags) ? data.tags : [],
              likes: typeof data.likes === "number" ? data.likes : 0,
              image: data.image || "",
              email: data.email || ""
            }
          })
          setBlogs(blogData)
          setError("")
        } catch (err: any) {
          console.error("Error processing blog data:", err)
          setError("Error loading blogs. Please try again.")
        } finally {
          setLoading(false)
        }
      },
      (error) => {
        console.error("Firestore listener error:", error)
        setError(`Failed to load blogs: ${error.message}`)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  // Filter blogs
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         blog.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = !selectedTag || blog.tags?.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  // Get all unique tags
  const allTags = [...new Set(blogs.flatMap(blog => blog.tags || []))]

  const handleBlogChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value })
  }

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      setError("You must be logged in to post.")
      return
    }

    setSubmitting(true)
    try {
      const blogData = {
        title: newBlog.title.trim(),
        content: newBlog.content.trim(),
        author: user.displayName || "AJ",
        date: Timestamp.fromDate(new Date()),
        email: user.email,
        tags: newBlog.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean),
        likes: editBlog ? editBlog.likes : 0,
        image: newBlog.image.trim() || ""
      }
      
      if (editBlog) {
        const blogRef = doc(firestore, "blogs", editBlog.id)
        await updateDoc(blogRef, blogData)
      } else {
        await addDoc(collection(firestore, "blogs"), blogData)
      }
      
      setNewBlog({ title: "", content: "", image: "", tags: "" })
      setShowWrite(false)
      setEditBlog(null)
      setError("")
    } catch (err: any) {
      console.error("Error saving blog:", err)
      setError(`Failed to ${editBlog ? 'update' : 'create'} blog: ${err.message}`)
    }
    setSubmitting(false)
  }

  const handleEdit = (blog: BlogPost) => {
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
      setError("")
    } catch (err: any) {
      console.error("Error deleting blog:", err)
      setError(`Failed to delete blog: ${err.message}`)
    }
  }

  const handleLike = async (blogId: string) => {
    try {
      const blog = blogs.find(b => b.id === blogId)
      if (!blog) return
      
      const blogRef = doc(firestore, "blogs", blogId)
      await updateDoc(blogRef, { 
        likes: (blog.likes || 0) + 1 
      })
      setError("")
    } catch (err: any) {
      console.error("Error liking blog:", err)
      setError(`Failed to like blog: ${err.message}`)
    }
  }

  const handleShare = async (blog: BlogPost) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: blog.title,
          text: blog.content.substring(0, 100) + "...",
          url: window.location.href
        })
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href)
        // You could show a toast notification here
      }
    } catch (err) {
      console.error("Error sharing:", err)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="flex-shrink-0">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl md:text-3xl font-bold gradient-text truncate">
                  NerdNotes
                </h1>
                <p className="text-sm text-muted-foreground hidden sm:block truncate">
                  A GenZ dev blog for the terminally online
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-muted/50 border border-border rounded-xl px-3 py-2">
                    <img 
                      src={user.photoURL || "/api/placeholder/32/32"} 
                      alt={user.displayName || "User"}
                      className="w-6 h-6 rounded-full flex-shrink-0"
                    />
                    <span className="text-sm font-medium text-foreground hidden xl:inline truncate max-w-32">
                      Welcome, {user.displayName?.split(' ')[0]}!
                    </span>
                  </div>
                  {user.email === AJ_EMAIL && (
                    <Button
                      onClick={() => setShowWrite(true)}
                      className="px-3 py-2 text-sm"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      <span className="hidden xl:inline">Drop Knowledge</span>
                      <span className="xl:hidden">Write</span>
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="px-3 py-2 text-sm"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    <span className="hidden xl:inline">Logout</span>
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setShowLogin(true)} className="text-sm">
                  <span className="text-lg mr-2">🔐</span>
                  <span className="hidden xl:inline">Are you AJ? Prove it</span>
                  <span className="xl:hidden">Login</span>
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowMobileMenu(!showMobileMenu)
                }}
              >
                <Menu className="w-6 h-6" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <Card className="lg:hidden mt-3">
              <CardContent className="p-3">
                <div className="flex flex-col gap-2">
                  {user ? (
                    <>
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                        <img 
                          src={user.photoURL || "/api/placeholder/32/32"} 
                          alt={user.displayName || "User"}
                          className="w-8 h-8 rounded-full flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <span className="text-sm font-medium block truncate">
                            {user.displayName}
                          </span>
                          <span className="text-xs text-muted-foreground block truncate">
                            {user.email}
                          </span>
                        </div>
                      </div>
                      {user.email === AJ_EMAIL && (
                        <Button
                          onClick={() => {
                            setShowWrite(true)
                            setShowMobileMenu(false)
                          }}
                          className="w-full"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Drop Some Knowledge
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        onClick={handleLogout}
                        className="w-full"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => {
                        setShowLogin(true)
                        setShowMobileMenu(false)
                      }}
                      className="w-full"
                    >
                      <span className="text-lg mr-2">🔐</span>
                      Are you AJ? Prove it
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md relative">
            <Button 
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4" 
              onClick={() => setShowLogin(false)}
            >
              <X className="w-5 h-5" />
            </Button>
            <CardContent className="p-6 pt-12">
              <div className="text-center mb-6">
                <div className="bg-primary p-4 rounded-xl w-fit mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Are you really AJ?</h2>
                <p className="text-muted-foreground">Verify with Google to enter the secret blog lair.</p>
              </div>
              <Button onClick={handleLogin} className="w-full" disabled={loading}>
                <span className="text-lg mr-2">🔐</span>
                {loading ? "Signing in..." : "Sign in with Google"}
              </Button>
              {error && (
                <div className="mt-4 p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-center text-sm">
                  {error}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
        {/* Search and Filters */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search the nerd-verse..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="w-full sm:w-auto"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters & Tags
            <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </Button>
        </div>

        {/* Tag Filters */}
        {showFilters && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Filter by topics:</h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={!selectedTag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag("")}
                >
                  All Topics
                </Button>
                {allTags.map(tag => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTag(tag)}
                  >
                    #{tag}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary mb-1">{blogs.length}</div>
              <div className="text-sm text-muted-foreground">Total Notes</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary mb-1">{blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0)}</div>
              <div className="text-sm text-muted-foreground">Total Likes</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary mb-1">{allTags.length}</div>
              <div className="text-sm text-muted-foreground">Topics</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Coding Mode</div>
            </CardContent>
          </Card>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-xl text-destructive text-center">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin w-10 h-10 border-3 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading the nerd-verse...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBlogs.length === 0 ? (
              <Card className="text-center py-16">
                <CardContent>
                  <BookOpen className="w-20 h-20 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No notes found in the nerd-verse</h3>
                  <p className="text-muted-foreground">
                    {searchTerm || selectedTag ? "Try adjusting your search or filters" : "Be the first to drop some knowledge!"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredBlogs.map((blog) => (
                <Card key={blog.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4">
                      {/* Blog Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h2 className="text-xl lg:text-2xl font-bold leading-tight mb-2">
                            {blog.title}
                          </h2>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <UserIcon className="w-4 h-4" />
                              <span>{blog.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>
                                {blog.date.toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(blog.id)}
                            className="text-muted-foreground hover:text-primary"
                          >
                            <Heart className="w-4 h-4 mr-1" />
                            {blog.likes || 0}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-muted-foreground hover:text-primary"
                            onClick={() => handleShare(blog)}
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Image */}
                      {blog.image && (
                        <div className="w-full h-64 lg:h-72 rounded-lg overflow-hidden">
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className="prose prose-neutral dark:prose-invert max-w-none">
                        <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                          {blog.content}
                        </p>
                      </div>
                      
                      {/* Tags */}
                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {blog.tags.map((tag: string) => (
                            <Button
                              key={tag}
                              variant="secondary"
                              size="sm"
                              onClick={() => setSelectedTag(tag)}
                              className="text-xs"
                            >
                              #{tag}
                            </Button>
                          ))}
                        </div>
                      )}
                      
                      {/* Admin Actions */}
                      {user && user.email === AJ_EMAIL && (
                        <div className="flex gap-3 pt-3 border-t border-border">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(blog)}
                          >
                            <Edit3 className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(blog.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>

      {/* Write/Edit Modal */}
      {user && user.email === AJ_EMAIL && showWrite && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start sm:items-center justify-center z-50 p-4 overflow-y-auto">
          <Card className="w-full max-w-2xl my-4 sm:my-0 max-h-[95vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 sticky top-0 bg-card z-10">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                {editBlog ? "Edit Nerd Note" : "Drop Some Knowledge"}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowWrite(false)
                  setEditBlog(null)
                  setNewBlog({ title: "", content: "", image: "", tags: "" })
                }}
              >
                <X className="w-5 h-5" />
              </Button>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleBlogSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <Input
                    type="text"
                    name="title"
                    placeholder="What's the big idea?"
                    value={newBlog.title}
                    onChange={handleBlogChange}
                    required
                    maxLength={150}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Content *</label>
                  <Textarea
                    name="content"
                    placeholder="Share your nerd wisdom with the world..."
                    value={newBlog.content}
                    onChange={handleBlogChange}
                    rows={8}
                    required
                    maxLength={5000}
                    className="resize-none"
                  />
                  <div className="text-right text-xs text-muted-foreground mt-1">
                    {newBlog.content.length}/5000 characters
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <div className="relative">
                    <Camera className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      type="url"
                      name="image"
                      placeholder="https://example.com/image.jpg"
                      value={newBlog.image}
                      onChange={handleBlogChange}
                      className="pl-10"
                    />
                  </div>
                  {newBlog.image && (
                    <div className="mt-3 rounded-lg overflow-hidden max-h-48">
                      <img
                        src={newBlog.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none'
                        }}
                      />
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Tags</label>
                  <Input
                    type="text"
                    name="tags"
                    placeholder="React, TypeScript, Web Dev (comma separated)"
                    value={newBlog.tags}
                    onChange={handleBlogChange}
                    maxLength={200}
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    Separate tags with commas. Perfect for organizing your content!
                  </div>
                  {newBlog.tags && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {newBlog.tags.split(',').map((tag, index) => tag.trim() && (
                        <span
                          key={index}
                          className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
                        >
                          #{tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={submitting || !newBlog.title.trim() || !newBlog.content.trim()}
                    className="flex-1"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                        {editBlog ? "Saving Changes..." : "Publishing Note..."}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        {editBlog ? "Save Changes" : "Publish Note"}
                      </>
                    )}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowWrite(false)
                      setEditBlog(null)
                      setNewBlog({ title: "", content: "", image: "", tags: "" })
                    }}
                    className="sm:w-auto"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Floating Action Button for Mobile */}
      {user && user.email === AJ_EMAIL && !showWrite && (
        <Button
          onClick={() => setShowWrite(true)}
          className="lg:hidden fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-2xl z-20"
          size="icon"
        >
          <Plus className="w-6 h-6" />
        </Button>
      )}
    </div>
  )
}