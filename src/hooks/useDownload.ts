import { useState, useCallback } from 'react';
import { startDownload, getDownloadStatus } from '../services/api';
import type { DownloadRequest } from '../types/api';

export function useDownload() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const download = useCallback(async (request: DownloadRequest) => {
    console.log("Downloading... inside useDownload", request);
    setIsDownloading(true);
    setError(null);
    
    try {
      const { task_id } = await startDownload(request);
      
      // Poll for status
      const checkStatus = async () => {
        const status = await getDownloadStatus(task_id);
        
        if (status.status === 'completed') {
          setIsDownloading(false);
        } else if (status.status === 'failed') {
          setError(status.message);
          setIsDownloading(false);
        } else {
          // Continue polling
          setTimeout(checkStatus, 1000);
        }
      };
      
      checkStatus();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download failed');
      setIsDownloading(false);
    }
  }, []);

  return { download, isDownloading, error };
}