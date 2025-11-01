import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Upload, X, ExternalLink, Trash2, Pencil, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PortfolioItem {
  id: string;
  title: string;
  description: string | null;
  image_urls: string[];
  project_url: string | null;
  technologies: string[] | null;
  category: string;
  featured: boolean;
  created_at: string;
}

export default function Portfolio() {
  const { user } = useAuth();
  const { isAdmin } = useUserRole(user?.id);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTechnology, setSelectedTechnology] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'featured' | 'name'>('featured');
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project_url: '',
    technologies: '',
    category: 'website',
    featured: false,
  });

  const categories = ['all', 'website', 'mobile', 'ecommerce', 'redesign'];

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPortfolio(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (url: string) => {
    setExistingImages(prev => prev.filter(img => img !== url));
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setExistingImages(item.image_urls);
    setFormData({
      title: item.title,
      description: item.description || '',
      project_url: item.project_url || '',
      technologies: item.technologies?.join(', ') || '',
      category: item.category,
      featured: item.featured,
    });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
    setExistingImages([]);
    setUploadedFiles([]);
    setFormData({
      title: '',
      description: '',
      project_url: '',
      technologies: '',
      category: 'website',
      featured: false,
    });
  };

  const openLightbox = (item: PortfolioItem, imageIndex: number = 0) => {
    setLightboxItem(item);
    setLightboxIndex(imageIndex);
    setLightboxOpen(true);
  };

  const handleDelete = async (id: string, imageUrls: string[]) => {
    if (!confirm('Are you sure you want to delete this portfolio item?')) return;

    try {
      // Delete all images from storage
      const imagePaths = imageUrls.map(url => url.split('/').pop()).filter(Boolean) as string[];
      if (imagePaths.length > 0) {
        await supabase.storage.from('portfolio-images').remove(imagePaths);
      }

      // Delete from database
      const { error } = await supabase.from('portfolio').delete().eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Portfolio item deleted successfully'
      });

      fetchPortfolio();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAdmin) {
      toast({
        title: 'Unauthorized',
        description: 'Only admins can manage portfolio items',
        variant: 'destructive'
      });
      return;
    }

    // For new items, require at least one image
    if (!editingItem && uploadedFiles.length === 0) {
      toast({
        title: 'Validation Error',
        description: 'Please upload at least one image',
        variant: 'destructive'
      });
      return;
    }

    // For editing, require at least one image (existing or new)
    if (editingItem && existingImages.length === 0 && uploadedFiles.length === 0) {
      toast({
        title: 'Validation Error',
        description: 'Please keep or upload at least one image',
        variant: 'destructive'
      });
      return;
    }

    try {
      let finalImageUrls = [...existingImages];

      // Upload new images if any
      if (uploadedFiles.length > 0) {
        const uploadPromises = uploadedFiles.map(async (file) => {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from('portfolio-images')
            .upload(fileName, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('portfolio-images')
            .getPublicUrl(fileName);

          return publicUrl;
        });

        const newImageUrls = await Promise.all(uploadPromises);
        finalImageUrls = [...finalImageUrls, ...newImageUrls];
      }

      const technologies = formData.technologies
        ? formData.technologies.split(',').map(t => t.trim())
        : null;

      if (editingItem) {
        // Delete removed images from storage
        const removedImages = editingItem.image_urls.filter(url => !existingImages.includes(url));
        if (removedImages.length > 0) {
          const imagePaths = removedImages.map(url => url.split('/').pop()).filter(Boolean) as string[];
          await supabase.storage.from('portfolio-images').remove(imagePaths);
        }

        // Update existing item
        const { error } = await supabase
          .from('portfolio')
          .update({
            title: formData.title,
            description: formData.description || null,
            image_urls: finalImageUrls,
            project_url: formData.project_url || null,
            technologies,
            category: formData.category,
            featured: formData.featured,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingItem.id);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Portfolio item updated successfully'
        });
      } else {
        // Insert new item
        const { error } = await supabase.from('portfolio').insert({
          title: formData.title,
          description: formData.description || null,
          image_urls: finalImageUrls,
          project_url: formData.project_url || null,
          technologies,
          category: formData.category,
          featured: formData.featured
        });

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Portfolio item added successfully'
        });
      }

      handleCloseDialog();
      fetchPortfolio();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  // Get unique technologies from all portfolio items
  const allTechnologies = Array.from(
    new Set(
      portfolio
        .flatMap(item => item.technologies || [])
        .filter(Boolean)
    )
  ).sort();

  // Filter and sort portfolio
  const filteredPortfolio = portfolio
    .filter(item => {
      // Category filter
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      
      // Technology filter
      const matchesTechnology = selectedTechnology === 'all' || 
        (item.technologies && item.technologies.includes(selectedTechnology));
      
      // Search filter
      const matchesSearch = searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.technologies?.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesTechnology && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'featured':
          if (a.featured === b.featured) {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          }
          return a.featured ? -1 : 1;
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Portfolio</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our latest projects and see how we turn ideas into reality
            </p>
          </div>

          {isAdmin && (
            <div className="flex justify-end mb-8">
              <Dialog open={isDialogOpen} onOpenChange={(open) => {
                if (!open) handleCloseDialog();
                else setIsDialogOpen(true);
              }}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-primary to-primary-glow">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingItem ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Project Title *</Label>
                      <Input
                        id="title"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <select
                        id="category"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                      >
                        <option value="website">Website</option>
                        <option value="mobile">Mobile App</option>
                        <option value="ecommerce">E-commerce</option>
                        <option value="redesign">Redesign</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="project_url">Project URL</Label>
                      <Input
                        id="project_url"
                        type="text"
                        placeholder="https://example.com"
                        value={formData.project_url}
                        onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="technologies">Technologies (comma separated)</Label>
                      <Input
                        id="technologies"
                        placeholder="React, TypeScript, Tailwind CSS"
                        value={formData.technologies}
                        onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="rounded"
                      />
                      <Label htmlFor="featured">Featured Project</Label>
                    </div>

                    <div>
                      <Label htmlFor="file_upload">
                        {editingItem ? 'Project Images' : 'Upload Images * (Multiple allowed)'}
                      </Label>
                      <div className="mt-2">
                        {/* Show existing images if editing */}
                        {editingItem && existingImages.length > 0 && (
                          <div className="mb-3 space-y-2">
                            <p className="text-sm text-muted-foreground">Existing Images:</p>
                            <div className="grid grid-cols-2 gap-2">
                              {existingImages.map((url, idx) => (
                                <div key={idx} className="relative group">
                                  <img 
                                    src={url} 
                                    alt={`Existing ${idx + 1}`} 
                                    className="w-full h-24 object-cover rounded border"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeExistingImage(url)}
                                    className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <input
                          id="file_upload"
                          type="file"
                          onChange={handleFileChange}
                          className="hidden"
                          accept="image/*"
                          multiple
                          required={!editingItem && uploadedFiles.length === 0}
                        />
                        <label
                          htmlFor="file_upload"
                          className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors glass"
                        >
                          <Upload className="h-5 w-5" />
                          <span className="text-sm">
                            {uploadedFiles.length > 0 
                              ? `${uploadedFiles.length} new file(s) selected` 
                              : editingItem 
                                ? 'Click to upload additional images'
                                : 'Click to upload project images'}
                          </span>
                        </label>
                        {uploadedFiles.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {uploadedFiles.map((file, idx) => (
                              <div key={idx} className="flex items-center justify-between gap-2 text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                                <span className="truncate">{file.name}</span>
                                <button
                                  type="button"
                                  onClick={() => removeFile(idx)}
                                  className="text-destructive hover:text-destructive/80 flex-shrink-0"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary-glow">
                      {editingItem ? 'Update Portfolio Item' : 'Add to Portfolio'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          )}

          {/* Search and Sort Controls */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search projects by title, description, or technology..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured First</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center gap-2 mb-4 flex-wrap">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(cat)}
                className="capitalize"
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Technology Filter */}
          {allTechnologies.length > 0 && (
            <div className="mb-8">
              <p className="text-sm text-muted-foreground text-center mb-3">Filter by Technology:</p>
              <div className="flex justify-center gap-2 flex-wrap">
                <Button
                  variant={selectedTechnology === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedTechnology('all')}
                  size="sm"
                >
                  All Technologies
                </Button>
                {allTechnologies.map((tech) => (
                  <Button
                    key={tech}
                    variant={selectedTechnology === tech ? 'default' : 'outline'}
                    onClick={() => setSelectedTechnology(tech)}
                    size="sm"
                  >
                    {tech}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Portfolio Grid */}
          {filteredPortfolio.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No projects found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPortfolio.map((item) => (
                <Card key={item.id} className="glass glass-hover overflow-hidden group">
                  <div className="relative aspect-video overflow-hidden cursor-pointer" onClick={() => openLightbox(item, 0)}>
                    {item.image_urls.length === 1 ? (
                      <img
                        src={item.image_urls[0]}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      <Carousel className="w-full h-full" onClick={(e) => e.stopPropagation()}>
                        <CarouselContent>
                          {item.image_urls.map((url, idx) => (
                            <CarouselItem key={idx} onClick={() => openLightbox(item, idx)}>
                              <img
                                src={url}
                                alt={`${item.title} - Image ${idx + 1}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-2" />
                        <CarouselNext className="right-2" />
                      </Carousel>
                    )}
                    {item.featured && (
                      <Badge className="absolute top-4 right-4 bg-accent z-10">Featured</Badge>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <Badge variant="outline" className="capitalize text-xs">
                        {item.category}
                      </Badge>
                    </div>
                    {item.description && (
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                    {item.technologies && item.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.technologies.map((tech, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2">
                      {item.project_url && (
                        <a
                          href={item.project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                        >
                          <Button variant="outline" className="w-full" size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Project
                          </Button>
                        </a>
                      )}
                      {isAdmin && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(item)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(item.id, item.image_urls)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="max-w-6xl max-h-[95vh] p-0">
            <div className="relative w-full h-full">
              {lightboxItem.image_urls.length === 1 ? (
                <div className="flex items-center justify-center p-4 bg-black/90">
                  <img
                    src={lightboxItem.image_urls[0]}
                    alt={lightboxItem.title}
                    className="max-w-full max-h-[85vh] object-contain"
                  />
                </div>
              ) : (
                <Carousel className="w-full" opts={{ startIndex: lightboxIndex }}>
                  <CarouselContent>
                    {lightboxItem.image_urls.map((url, idx) => (
                      <CarouselItem key={idx}>
                        <div className="flex items-center justify-center p-4 bg-black/90">
                          <img
                            src={url}
                            alt={`${lightboxItem.title} - Image ${idx + 1}`}
                            className="max-w-full max-h-[85vh] object-contain"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
                </Carousel>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{lightboxItem.title}</h3>
                {lightboxItem.description && (
                  <p className="text-white/80 text-sm">{lightboxItem.description}</p>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Footer />
    </div>
  );
}
