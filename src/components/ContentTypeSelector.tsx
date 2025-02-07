import { FileVideo, FileAudio } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ContentType } from '../types';

interface ContentTypeSelectorProps {
  contentType: ContentType;
  onChange: (type: ContentType) => void;
}

export default function ContentTypeSelector({ contentType, onChange }: ContentTypeSelectorProps) {
  return (
    <motion.div 
      className="flex gap-4 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <button
        onClick={() => onChange('video')}
        className={`flex-1 relative group overflow-hidden ${
          contentType === 'video' 
            ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500' 
            : 'bg-white/5'
        } rounded-xl px-6 py-4 transition-all duration-300`}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
          animate={contentType === 'video' ? { opacity: 1 } : { opacity: 0 }}
        />
        <div className="relative flex items-center justify-center gap-3">
          <FileVideo className="w-5 h-5" />
          <span className="font-medium">Video</span>
        </div>
      </button>

      <button
        onClick={() => onChange('audio')}
        className={`flex-1 relative group overflow-hidden ${
          contentType === 'audio' 
            ? 'bg-gradient-to-r from-fuchsia-500 to-cyan-500' 
            : 'bg-white/5'
        } rounded-xl px-6 py-4 transition-all duration-300`}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
          animate={contentType === 'audio' ? { opacity: 1 } : { opacity: 0 }}
        />
        <div className="relative flex items-center justify-center gap-3">
          <FileAudio className="w-5 h-5" />
          <span className="font-medium">Audio</span>
        </div>
      </button>
    </motion.div>
  );
}