import { useState, useEffect } from 'react';
import { getPlatformFormats } from '../services/api';
import type { PlatformFormats } from '../types/api';

export function usePlatformFormats(url: string) {
  const [formats, setFormats] = useState<PlatformFormats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setFormats(null);
      return;
    }

    const platform = url.includes('youtube') ? 'youtube' 
      : url.includes('instagram') ? 'instagram'
      : url.includes('pinterest') ? 'pinterest'
      : null;

    if (!platform) {
      setFormats(null);
      return;
    }

    const fetchFormats = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await getPlatformFormats(platform);
        setFormats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch formats');
        setFormats(null);
      } finally {
        setLoading(false);
      }
    };

    fetchFormats();
  }, [url]);

  return { formats, loading, error };
}