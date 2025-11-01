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
import { Plus, Upload, X, ExternalLink, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

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
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
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
        description: 'Only admins can add portfolio items',
        variant: 'destructive'
      });
      return;
    }

    if (uploadedFiles.length === 0) {
      toast({
        title: 'Validation Error',
        description: 'Please upload at least one image',
        variant: 'destructive'
      });
      return;
    }

    try {
      // Upload all images
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

      const imageUrls = await Promise.all(uploadPromises);

      // Insert into database
      const technologies = formData.technologies
        ? formData.technologies.split(',').map(t => t.trim())
        : null;

      const { error } = await supabase.from('portfolio').insert({
        title: formData.title,
        description: formData.description || null,
        image_urls: imageUrls,
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

      // Reset form
      setFormData({
        title: '',
        description: '',
        project_url: '',
        technologies: '',
        category: 'website',
        featured: false,
      });
      setUploadedFiles([]);
      setIsDialogOpen(false);
      fetchPortfolio();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const filteredPortfolio = selectedCategory === 'all'
    ? portfolio
    : portfolio.filter(item => item.category === selectedCategory);

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
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-primary to-primary-glow">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Portfolio Item</DialogTitle>
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
                        type="url"
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
                      <Label htmlFor="file_upload">Upload Images * (Multiple allowed)</Label>
                      <div className="mt-2">
                        <input
                          id="file_upload"
                          type="file"
                          onChange={handleFileChange}
                          className="hidden"
                          accept="image/*"
                          multiple
                          required
                        />
                        <label
                          htmlFor="file_upload"
                          className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors glass"
                        >
                          <Upload className="h-5 w-5" />
                          <span className="text-sm">
                            {uploadedFiles.length > 0 ? `${uploadedFiles.length} file(s) selected` : 'Click to upload project images'}
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
                      Add to Portfolio
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          )}

          {/* Category Filter */}
          <div className="flex justify-center gap-2 mb-12 flex-wrap">
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

          {/* Portfolio Grid */}
          {filteredPortfolio.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No projects found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPortfolio.map((item) => (
                <Card key={item.id} className="glass glass-hover overflow-hidden group">
                  <div className="relative aspect-video overflow-hidden">
                    {item.image_urls.length === 1 ? (
                      <img
                        src={item.image_urls[0]}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <Carousel className="w-full h-full">
                        <CarouselContent>
                          {item.image_urls.map((url, idx) => (
                            <CarouselItem key={idx}>
                              <img
                                src={url}
                                alt={`${item.title} - Image ${idx + 1}`}
                                className="w-full h-full object-cover"
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
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(item.id, item.image_urls)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
