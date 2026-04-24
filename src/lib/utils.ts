export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function isYouTubeUrl(url: string) {
  return /youtube\.com|youtu\.be/.test(url);
}

export function getYouTubeEmbedUrl(url: string) {
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch?.[1]) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`;
  }

  const fullMatch = url.match(/[?&]v=([^?&]+)/);
  if (fullMatch?.[1]) {
    return `https://www.youtube.com/embed/${fullMatch[1]}`;
  }

  return url;
}

export function formatProjectDate(value: string) {
  const [year, month] = value.split('-').map(Number);
  const date = new Date(year, (month || 1) - 1);

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(date);
}
