import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GripVertical } from 'lucide-react';

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

interface SortablePortfolioCardProps {
  item: PortfolioItem;
}

export default function SortablePortfolioCard({ item }: SortablePortfolioCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="glass overflow-hidden cursor-move"
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img
          src={item.image_urls[0]}
          alt={item.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {item.featured && (
          <Badge className="absolute top-4 right-4 bg-accent z-10">Featured</Badge>
        )}
        
        {/* Drag Handle Overlay */}
        <div
          {...attributes}
          {...listeners}
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity"
        >
          <div className="bg-background/90 p-3 rounded-lg">
            <GripVertical className="h-8 w-8" />
          </div>
        </div>
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
          <div className="flex flex-wrap gap-2">
            {item.technologies.map((tech, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
