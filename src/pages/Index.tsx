import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useLinks } from "@/hooks/useLinks";
import { groupLinksByCategory } from "@/utils/linkUtils";
import LinkForm from "@/components/LinkForm";
import CategorySection from "@/components/CategorySection";
import EmptyState from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { BookmarkPlus, Search, X, LogOut, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

const Index = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const { links, loading: linksLoading, addLink, deleteLink, editLink, renameCategory } = useLinks();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  // Redirect to auth if not logged in
  if (!authLoading && !user) {
    navigate("/auth");
    return null;
  }

  if (authLoading || linksLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const filteredLinks = links.filter((link) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      link.title.toLowerCase().includes(query) ||
      link.url.toLowerCase().includes(query) ||
      link.category.toLowerCase().includes(query)
    );
  });

  const linksByCategory = groupLinksByCategory(filteredLinks);
  const categories = [...new Set(links.map((link) => link.category))].sort();

  const handleAddLink = (link: { url: string; title: string; favicon: string; category: string }) => {
    addLink({
      url: link.url,
      title: link.title,
      favicon: link.favicon,
      category: link.category,
    });
  };

  const handleEditLink = (id: string, updates: Partial<{ title: string; url: string; category: string; favicon: string }>) => {
    editLink(id, updates);
  };

  const toggleSearch = () => {
    setIsSearching(!isSearching);
    if (isSearching) {
      setSearchQuery("");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/50 px-4 md:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-semibold mb-1">LinkVault</h1>
            <p className="text-muted-foreground">Your personal link management system</p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            {isSearching ? (
              <div className="relative w-full md:w-auto animate-slide-in-right">
                <Input
                  type="text"
                  placeholder="Search links..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-8 w-full md:w-64"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => {
                    setSearchQuery("");
                    toggleSearch();
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="icon"
                onClick={toggleSearch}
                className="animate-fade-in"
              >
                <Search className="h-4 w-4" />
              </Button>
            )}

            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-1">
                  <BookmarkPlus className="h-4 w-4" />
                  <span className="hidden sm:inline">Add Link</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <LinkForm addLink={handleAddLink} isPopover categories={categories} />
              </DialogContent>
            </Dialog>

            <Button variant="outline" size="icon" onClick={handleSignOut} title="Sign out">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {links.length === 0 ? (
          <EmptyState
            onAddClick={() =>
              document.querySelector<HTMLButtonElement>("[data-state='closed']")?.click()
            }
          />
        ) : (
          <>
            {Object.keys(linksByCategory).length > 0 ? (
              Object.entries(linksByCategory)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([category, categoryLinks]) => (
                  <CategorySection
                    key={category}
                    category={category}
                    links={categoryLinks}
                    onDeleteLink={deleteLink}
                    onEditLink={handleEditLink}
                    onRenameCategory={renameCategory}
                    categories={categories}
                  />
                ))
            ) : (
              <div className="glass p-8 rounded-2xl text-center animate-fade-in-up">
                <p className="text-lg">No links match your search for "{searchQuery}"</p>
                <Button variant="outline" onClick={() => setSearchQuery("")} className="mt-4">
                  Clear search
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
