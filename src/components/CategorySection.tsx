
import { useState } from "react";
import { LinkItem } from "@/utils/linkUtils";
import LinkCard from "./LinkCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, ChevronDown, ChevronUp, Edit, X } from "lucide-react";

interface CategorySectionProps {
  category: string;
  links: LinkItem[];
  onDeleteLink: (id: string) => void;
  onEditLink: (id: string, updates: Partial<LinkItem>) => void;
  onRenameCategory: (oldName: string, newName: string) => void;
  categories: string[];
}

const CategorySection = ({
  category,
  links,
  onDeleteLink,
  onEditLink,
  onRenameCategory,
  categories
}: CategorySectionProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState(category);

  const handleRename = () => {
    if (newCategoryName.trim() && newCategoryName !== category) {
      onRenameCategory(category, newCategoryName.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewCategoryName(category);
    setIsEditing(false);
  };

  return (
    <div className="mb-8 animate-fade-in-up">
      <div className="flex items-center justify-between mb-4">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="max-w-[200px]"
              autoFocus
            />
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleCancel}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleRename}
              className="h-8 w-8"
            >
              <Check className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-medium">{category}</h2>
            <div className="text-xs px-2 py-1 bg-secondary rounded-full text-muted-foreground">
              {links.length}
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsEditing(true)}
              className="h-7 w-7"
            >
              <Edit className="h-3.5 w-3.5" />
            </Button>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8"
        >
          {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </Button>
      </div>

      {!isCollapsed && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {links.map((link) => (
            <LinkCard
              key={link.id}
              link={link}
              onDelete={onDeleteLink}
              onEdit={onEditLink}
              categories={categories}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySection;
