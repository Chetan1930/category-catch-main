
export interface LinkItem {
  id: string;
  url: string;
  title: string;
  favicon: string;
  category: string;
  createdAt: number;
}

export interface Category {
  id: string;
  name: string;
  color?: string;
}

// Get domain from URL
export function getDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (error) {
    console.error("Invalid URL:", error);
    return "";
  }
}

// Generate favicon URL
export function getFaviconUrl(url: string): string {
  try {
    const domain = getDomain(url);
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  } catch {
    return "";
  }
}

// Detect category based on URL
export function detectCategory(url: string): string {
  const domain = getDomain(url);
  
  const categoryPatterns = [
    { pattern: /(youtube|vimeo|dailymotion|netflix|hulu|disney|twitch)/, category: "Video" },
    { pattern: /(spotify|apple.com\/music|soundcloud|pandora|deezer|tidal)/, category: "Music" },
    { pattern: /(github|gitlab|stackoverflow|dev.to|medium.com|freecodecamp)/, category: "Development" },
    { pattern: /(linkedin|indeed|glassdoor|monster|ziprecruiter)/, category: "Jobs" },
    { pattern: /(amazon|ebay|etsy|walmart|target|aliexpress|shopify)/, category: "Shopping" },
    { pattern: /(facebook|twitter|instagram|pinterest|reddit|tumblr|tiktok)/, category: "Social" },
    { pattern: /(gmail|outlook|yahoo.com\/mail|zoho|protonmail)/, category: "Email" },
    { pattern: /(google.com\/docs|office|notion|evernote|onenote|dropbox|drive.google)/, category: "Productivity" },
    { pattern: /(cnn|bbc|nytimes|reuters|bloomberg|wsj|huffpost)/, category: "News" },
    { pattern: /(udemy|coursera|edx|khanacademy|skillshare|pluralsight)/, category: "Learning" },
    { pattern: /(airbnb|booking|expedia|tripadvisor|hotels|kayak)/, category: "Travel" }
  ];

  for (const { pattern, category } of categoryPatterns) {
    if (pattern.test(domain)) {
      return category;
    }
  }

  return "Other";
}

// Generate a nice pastel color for categories
export function generateCategoryColor(categoryName: string): string {
  const colorMap: Record<string, string> = {
    "Video": "#FFD6E0",
    "Music": "#C5FAD5",
    "Development": "#D4F1F9",
    "Jobs": "#E2BEF1",
    "Shopping": "#FFE4C8",
    "Social": "#DECDFF",
    "Email": "#FFF3CD",
    "Productivity": "#B5EAD7",
    "News": "#C7CEEA",
    "Learning": "#E2F0CB",
    "Travel": "#FFCCF9",
    "Other": "#E0E0E0"
  };

  return colorMap[categoryName] || colorMap["Other"];
}

// Validate URL
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Add http:// if protocol is missing
export function normalizeUrl(url: string): string {
  if (url && !url.match(/^[a-zA-Z]+:\/\//)) {
    return `https://${url}`;
  }
  return url;
}

// Sort links by date (newest first)
export function sortLinksByDate(links: LinkItem[]): LinkItem[] {
  return [...links].sort((a, b) => b.createdAt - a.createdAt);
}

// Group links by category
export function groupLinksByCategory(links: LinkItem[]): Record<string, LinkItem[]> {
  return links.reduce((acc, link) => {
    const category = link.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(link);
    return acc;
  }, {} as Record<string, LinkItem[]>);
}

// Extract metadata from URL
export async function fetchPageTitle(url: string): Promise<string> {
  try {
    // Since we can't directly fetch metadata due to CORS, we'll extract a title from the URL
    const domain = getDomain(url);
    const parts = domain.split('.');
    
    // Try to get a meaningful title
    if (parts.length >= 2) {
      // Use the second-to-last part (e.g., "google" from "www.google.com")
      const siteName = parts[parts.length - 2].charAt(0).toUpperCase() + parts[parts.length - 2].slice(1);
      return siteName;
    }
    
    // Fallback
    return domain || "Untitled";
  } catch (error) {
    console.error("Error fetching title:", error);
    return "Untitled";
  }
}
