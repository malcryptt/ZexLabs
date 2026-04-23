import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Checkbox } from '@/components/ui/checkbox';
import { ExternalLink, Trash2, Pencil } from 'lucide-react';

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
  display_order: number | null;
}

interface PortfolioCardProps {
  item: PortfolioItem;
  isAdmin: boolean;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onEdit: (item: PortfolioItem) => void;
  onDelete: (id: string, imageUrls: string[]) => void;
  onImageClick: (item: PortfolioItem, index: number) => void;
}

export default function PortfolioCard({
  item,
  isAdmin,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onImageClick,
}: PortfolioCardProps) {
  return (
    <Card className="glass glass-hover overflow-hidden group relative">
      {isAdmin && (
        <div className="absolute top-4 left-4 z-10">
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onSelect(item.id)}
            className="bg-background/80 backdrop-blur-sm"
          />
        </div>
      )}
      
      <div className="relative aspect-video overflow-hidden cursor-pointer" onClick={() => onImageClick(item, 0)}>
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
                <CarouselItem key={idx} onClick={() => onImageClick(item, idx)}>
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
              href={item.project_url.startsWith('http://') || item.project_url.startsWith('https://') 
                ? item.project_url 
                : `https://${item.project_url}`}
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
                onClick={() => onEdit(item)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(item.id, item.image_urls)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
