import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import UrlInput from './components/UrlInput';
import ContentInfo from './components/ContentInfo';
import ContentTypeSelector from './components/ContentTypeSelector';
import QualitySelector from './components/QualitySelector';
import FormatSelector from './components/FormatSelector';
import DownloadButton from './components/DownloadButton';
import ActionButtons from './components/ActionButtons';
import DownloadHistory from './components/DownloadHistory';
import { useContentInfo } from './hooks/useContentInfo';
import { usePlatformFormats } from './hooks/usePlatformFormats';
import { useDownload } from './hooks/useDownload';
import type { ContentType } from './types';

export default function App() {
  const [url, setUrl] = useState('');
  const [contentType, setContentType] = useState<ContentType>('video');
  const [showHistory, setShowHistory] = useState(false);
  const [showQualityDropdown, setShowQualityDropdown] = useState(false);
  const [showFormatDropdown, setShowFormatDropdown] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('1080p');
  const [selectedFormat, setSelectedFormat] = useState('mp4');

  const { info, loading: infoLoading, error: infoError } = useContentInfo(url);
  const { formats, loading: formatsLoading } = usePlatformFormats(url);
  const { download, isDownloading, error: downloadError } = useDownload();

  const handleDownload = useCallback(() => {
    console.log(url, contentType, selectedQuality, selectedFormat, formats, download);
    if (!url || !formats) return;
    download({ url, content_type: contentType, quality: selectedQuality, format: selectedFormat });
  }, [url, contentType, selectedQuality, selectedFormat, formats, download]);

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white">
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986')] opacity-10 bg-cover bg-center" />
      <motion.div 
        className="fixed inset-0 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10"
        animate={{
          background: [
            'linear-gradient(to bottom right, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1), rgba(34, 211, 238, 0.1))',
            'linear-gradient(to bottom right, rgba(34, 211, 238, 0.1), rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      
      <div className="relative min-h-screen overflow-auto">
        <div className="container mx-auto px-4 py-12">
          <Header />

          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="backdrop-blur-xl bg-white/5 rounded-3xl shadow-2xl border border-white/10 p-8">
              <UrlInput url={url} onChange={setUrl} />
              
              <ContentInfo info={info} loading={infoLoading} error={infoError} />
              <ContentTypeSelector contentType={contentType} onChange={setContentType} />
              
              <div className="space-y-6">
                <QualitySelector
                  contentType={contentType}
                  selectedQuality={selectedQuality}
                  showDropdown={showQualityDropdown}
                  onToggleDropdown={() => setShowQualityDropdown(!showQualityDropdown)}
                  onSelectQuality={setSelectedQuality}
                  formats={formats}
                  loading={formatsLoading}
                />

                <FormatSelector
                  contentType={contentType}
                  selectedFormat={selectedFormat}
                  showDropdown={showFormatDropdown}
                  onToggleDropdown={() => setShowFormatDropdown(!showFormatDropdown)}
                  onSelectFormat={setSelectedFormat}
                  formats={formats}
                  loading={formatsLoading}
                />
              </div>
              
              <DownloadButton
                url={url}
                isDownloading={isDownloading}
                onClick={handleDownload}
                error={downloadError}
              />
              
              <ActionButtons
                onHistoryClick={() => setShowHistory(!showHistory)}
                onDownloadsClick={() => {/* Implement folder open */}}
              />
              
              <DownloadHistory show={showHistory} onClose={() => setShowHistory(false)} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}