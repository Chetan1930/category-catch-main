
import { useState } from "react";
import { Link, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { isValidUrl, normalizeUrl, LinkItem, getFaviconUrl, detectCategory, fetchPageTitle } from "@/utils/linkUtils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface LinkFormProps {
  addLink: (link: LinkItem) => void;
  onClose?: () => void;
  isPopover?: boolean;
  categories?: string[];
}

const LinkForm = ({ addLink, onClose, isPopover = false, categories = [] }: LinkFormProps) => {
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [manualCategory, setManualCategory] = useState<string | null>(null);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast.error("Please enter a URL");
      return;
    }
    
    const normalizedUrl = normalizeUrl(url.trim());
    
    if (!isValidUrl(normalizedUrl)) {
      toast.error("Please enter a valid URL");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const title = await fetchPageTitle(normalizedUrl);
      let selectedCategory = manualCategory;
      
      // If creating a new category
      if (isCreatingCategory && newCategory.trim()) {
        selectedCategory = newCategory.trim();
      }
      
      const detectedCategory = detectCategory(normalizedUrl);
      
      const newLink: LinkItem = {
        id: crypto.randomUUID(),
        url: normalizedUrl,
        title: title,
        favicon: getFaviconUrl(normalizedUrl),
        category: selectedCategory || detectedCategory,
        createdAt: Date.now()
      };
      
      addLink(newLink);
      setUrl("");
      setManualCategory(null);
      setIsCreatingCategory(false);
      setNewCategory("");
      toast.success("Link added successfully");
      if (onClose) onClose();
    } catch (error) {
      console.error("Error adding link:", error);
      toast.error("Failed to add link");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${isPopover ? "" : "glass p-6 rounded-2xl animate-fade-in-up mb-8"}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium flex items-center gap-2">
          <Link className="w-5 h-5" />
          <span>Add New Link</span>
        </h2>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-3">
          <Input
            type="text"
            placeholder="Paste or type URL here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
            disabled={isSubmitting}
          />
          
          {isCreatingCategory ? (
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter new category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="flex-1"
                autoFocus
              />
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                onClick={() => setIsCreatingCategory(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Select 
                onValueChange={(value) => setManualCategory(value)} 
                value={manualCategory || ""}
                disabled={isCreatingCategory}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                type="button" 
                variant="outline" 
                size="icon"
                onClick={() => setIsCreatingCategory(true)}
                className="flex-shrink-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="transition-all"
          >
            {isSubmitting ? "Adding..." : "Add Link"}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          {isCreatingCategory 
            ? "Creating a new category for this link." 
            : manualCategory 
              ? `This link will be added to the "${manualCategory}" category.` 
              : categories.length > 0 
                ? "Select an existing category or create a new one."
                : "Links will be automatically categorized based on the URL."}
        </p>
      </form>
    </div>
  );
};

export default LinkForm;
