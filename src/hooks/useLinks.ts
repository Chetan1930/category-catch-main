import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

export interface LinkItem {
  id: string;
  url: string;
  title: string;
  favicon: string | null;
  category: string;
  createdAt: string;
}

interface DbLink {
  id: string;
  user_id: string;
  title: string;
  url: string;
  category: string;
  favicon: string | null;
  created_at: string;
  updated_at: string;
}

export function useLinks() {
  const { user } = useAuth();
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLinks = useCallback(async () => {
    if (!user) {
      setLinks([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("links")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const mappedLinks: LinkItem[] = (data as DbLink[]).map((link) => ({
        id: link.id,
        url: link.url,
        title: link.title,
        favicon: link.favicon,
        category: link.category,
        createdAt: link.created_at,
      }));

      setLinks(mappedLinks);
    } catch (error) {
      console.error("Error fetching links:", error);
      toast.error("Failed to load links");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  const addLink = async (link: Omit<LinkItem, "id" | "createdAt">) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("links")
        .insert({
          user_id: user.id,
          title: link.title,
          url: link.url,
          category: link.category,
          favicon: link.favicon,
        })
        .select()
        .single();

      if (error) throw error;

      const newLink: LinkItem = {
        id: (data as DbLink).id,
        url: (data as DbLink).url,
        title: (data as DbLink).title,
        favicon: (data as DbLink).favicon,
        category: (data as DbLink).category,
        createdAt: (data as DbLink).created_at,
      };

      setLinks((prev) => [newLink, ...prev]);
      toast.success("Link saved");
    } catch (error) {
      console.error("Error adding link:", error);
      toast.error("Failed to save link");
    }
  };

  const deleteLink = async (id: string) => {
    try {
      const { error } = await supabase.from("links").delete().eq("id", id);

      if (error) throw error;

      setLinks((prev) => prev.filter((link) => link.id !== id));
      toast.success("Link deleted");
    } catch (error) {
      console.error("Error deleting link:", error);
      toast.error("Failed to delete link");
    }
  };

  const editLink = async (id: string, updates: Partial<LinkItem>) => {
    try {
      const dbUpdates: Partial<DbLink> = {};
      if (updates.title) dbUpdates.title = updates.title;
      if (updates.url) dbUpdates.url = updates.url;
      if (updates.category) dbUpdates.category = updates.category;
      if (updates.favicon !== undefined) dbUpdates.favicon = updates.favicon;

      const { error } = await supabase
        .from("links")
        .update(dbUpdates)
        .eq("id", id);

      if (error) throw error;

      setLinks((prev) =>
        prev.map((link) => (link.id === id ? { ...link, ...updates } : link))
      );
      toast.success("Link updated");
    } catch (error) {
      console.error("Error updating link:", error);
      toast.error("Failed to update link");
    }
  };

  const renameCategory = async (oldName: string, newName: string) => {
    try {
      const { error } = await supabase
        .from("links")
        .update({ category: newName })
        .eq("category", oldName);

      if (error) throw error;

      setLinks((prev) =>
        prev.map((link) =>
          link.category === oldName ? { ...link, category: newName } : link
        )
      );
      toast.success(`Category renamed to "${newName}"`);
    } catch (error) {
      console.error("Error renaming category:", error);
      toast.error("Failed to rename category");
    }
  };

  return {
    links,
    loading,
    addLink,
    deleteLink,
    editLink,
    renameCategory,
  };
}
