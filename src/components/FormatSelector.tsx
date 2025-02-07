import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ContentType } from '../types';
import type { PlatformFormats } from '../types/api';
import { slideUp, scaleIn } from '../animations/variants';

interface FormatSelectorProps {
  contentType: ContentType;
  selectedFormat: string;
  showDropdown: boolean;
  onToggleDropdown: () => void;
  onSelectFormat: (format: string) => void;
  formats: PlatformFormats | null;
  loading: boolean;
}

export default function FormatSelector({
  contentType,
  selectedFormat,
  showDropdown,
  onToggleDropdown,
  onSelectFormat,
  formats,
  loading,
}: FormatSelectorProps) {
  if (loading || !formats) {
    return (
      <motion.div 
        className="relative"
        variants={slideUp}
        initial="hidden"
        animate="visible"
      >
        <button
          disabled
          className="w-full flex items-center justify-between bg-white/5 backdrop-blur-sm rounded-xl px-6 py-4 opacity-50 cursor-not-allowed border border-white/10"
        >
          <span className="text-white/40">
            {loading ? 'Loading formats...' : 'No formats available'}
          </span>
          <ChevronDown className="w-5 h-5 text-white/40" />
        </button>
      </motion.div>
    );
  }

  const availableFormats = contentType === 'video' 
    ? formats.video_formats
    : formats.audio_formats;

  return (
    <motion.div 
      className="relative"
      variants={slideUp}
      initial="hidden"
      animate="visible"
    >
      <button
        onClick={onToggleDropdown}
        className="w-full flex items-center justify-between bg-white/5 backdrop-blur-sm rounded-xl px-6 py-4 
          border border-white/10 hover:border-white/20 transition-all duration-300
          group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="relative">Format: {selectedFormat}</span>
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            className="absolute w-full mt-2 bg-white/10 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden z-10"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
          >
            {availableFormats.map((format, index) => (
              <motion.button
                key={format}
                onClick={() => {
                  onSelectFormat(format);
                  onToggleDropdown();
                }}
                className="w-full px-6 py-3 text-left hover:bg-white/10 transition-colors relative group"
                whileHover={{ x: 4 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="absolute left-0 w-1 h-full bg-gradient-to-b from-fuchsia-500 to-cyan-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                <span className="relative">{format}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}