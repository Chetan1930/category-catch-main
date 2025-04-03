
import { Link, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onAddClick: () => void;
}

const EmptyState = ({ onAddClick }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] p-6 animate-fade-in-up">
      <div className="glass p-12 rounded-2xl flex flex-col items-center max-w-md text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <Link className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-medium mb-2">No links saved yet</h2>
        <p className="text-muted-foreground mb-6">
          Add your first link to start organizing your web collection.
        </p>
        <Button onClick={onAddClick} className="flex items-center gap-2 animate-pulse">
          <PlusCircle className="w-4 h-4" />
          <span>Add your first link</span>
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;
