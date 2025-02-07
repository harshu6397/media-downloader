import { DownloadHistory } from "../types";
import { ContentInfo, DownloadRequest, DownloadResponse, PlatformFormats } from "../types/api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function startDownload(request: DownloadRequest): Promise<DownloadResponse> {
  const response = await fetch(`${API_BASE_URL}/download`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  
  if (!response.ok) {
    throw new Error('Download failed to start');
  }
  
  return response.json();
}

export async function getDownloadStatus(taskId: string): Promise<DownloadResponse> {
  console.log("Downloading... inside getDownloadStatus", taskId);
  const response = await fetch(`${API_BASE_URL}/download/${taskId}`);
  
  if (!response.ok) {
    throw new Error('Failed to get download status');
  }
  
  return response.json();
}

export async function getContentInfo(url: string): Promise<ContentInfo> {
  const response = await fetch(`${API_BASE_URL}/content-info?url=${encodeURIComponent(url)}`);
  
  if (!response.ok) {
    throw new Error('Failed to get content info');
  }
  
  return response.json();
}

export async function getPlatformFormats(platform: string): Promise<PlatformFormats> {
  const response = await fetch(`${API_BASE_URL}/formats/${platform}`);
  
  if (!response.ok) {
    throw new Error('Failed to get platform formats');
  }
  
  return response.json();
}

export async function getDownloadHistory(): Promise<DownloadHistory[]> {
  const response = await fetch(`${API_BASE_URL}/history`);
  
  if (!response.ok) {
    throw new Error('Failed to get download history');
  }
  
  return response.json();
}