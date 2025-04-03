
import { useState } from "react";
import { ExternalLink, Edit, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LinkItem } from "@/utils/linkUtils";

interface LinkCardProps {
  link: LinkItem;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<LinkItem>) => void;
  categories: string[];
}

const LinkCard = ({ link, onDelete, onEdit, categories }: LinkCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(link.title);
  const [editedCategory, setEditedCategory] = useState(link.category);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleEdit = () => {
    onEdit(link.id, { 
      title: editedTitle,
      category: editedCategory
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(link.title);
    setEditedCategory(link.category);
    setIsEditing(false);
  };

  const domain = new URL(link.url).hostname.replace('www.', '');

  return (
    <div className="link-card glass rounded-xl overflow-hidden animate-scale-in">
      {isEditing ? (
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            {link.favicon && (
              <img 
                src={link.favicon} 
                alt=""
                className="w-6 h-6 rounded-sm object-contain"
                onLoad={() => setImageLoaded(true)}
              />
            )}
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="flex-1"
              autoFocus
            />
          </div>
          
          <Select 
            value={editedCategory} 
            onValueChange={setEditedCategory}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex justify-end gap-2 pt-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleCancel}
              className="gap-1"
            >
              <X className="h-3.5 w-3.5" />
              <span>Cancel</span>
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={handleEdit}
              className="gap-1"
            >
              <Check className="h-3.5 w-3.5" />
              <span>Save</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded flex items-center justify-center shrink-0 ${!imageLoaded ? 'favicon-loading bg-muted' : ''}`}>
              {link.favicon && (
                <img 
                  src={link.favicon} 
                  alt=""
                  className="w-8 h-8 object-contain" 
                  onLoad={() => setImageLoaded(true)}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    setImageLoaded(true);
                  }}
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm mb-1 truncate">{link.title}</h3>
              <p className="text-xs text-muted-foreground truncate">{domain}</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-3 pt-2 border-t border-border/30">
            <div>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground">
                {link.category}
              </span>
            </div>
            
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="icon"
                className="h-7 w-7"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-3.5 w-3.5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-7 w-7"
                onClick={() => onDelete(link.id)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-7 w-7"
                asChild
              >
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkCard;
