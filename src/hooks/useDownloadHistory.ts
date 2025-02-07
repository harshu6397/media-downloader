import { useState, useEffect } from 'react';
import { getDownloadHistory } from '../services/api';
import type { DownloadHistory } from '../types';

export function useDownloadHistory() {
  const [history, setHistory] = useState<DownloadHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await getDownloadHistory();
        setHistory(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch download history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return { history, loading, error };
}