import { useState, useEffect } from 'react';
import { getContentInfo } from '../services/api';
import type { ContentInfo } from '../types/api';

export function useContentInfo(url: string) {
  const [info, setInfo] = useState<ContentInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setInfo(null);
      return;
    }

    const fetchInfo = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await getContentInfo(url);
        setInfo(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch content info');
        setInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, [url]);

  return { info, loading, error };
}