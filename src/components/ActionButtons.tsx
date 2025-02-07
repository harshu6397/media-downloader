import { History, Folder } from 'lucide-react';
import { motion } from 'framer-motion';
import { slideUp } from '../animations/variants';

interface ActionButtonsProps {
  onHistoryClick: () => void;
  onDownloadsClick: () => void;
}

export default function ActionButtons({ onHistoryClick, onDownloadsClick }: ActionButtonsProps) {
  return (
    <motion.div 
      className="flex gap-4"
      variants={slideUp}
      initial="hidden"
      animate="visible"
    >
      <motion.button
        onClick={onHistoryClick}
        className="flex-1 flex items-center justify-center gap-2 px-6 py-4 
          bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl
          border border-white/10 hover:border-white/20
          transition-all duration-300 relative group overflow-hidden"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <History className="w-5 h-5" />
        <span className="relative">History</span>
      </motion.button>

      <motion.button
        onClick={onDownloadsClick}
        className="flex-1 flex items-center justify-center gap-2 px-6 py-4
          bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl
          border border-white/10 hover:border-white/20
          transition-all duration-300 relative group overflow-hidden"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Folder className="w-5 h-5" />
        <span className="relative">Downloads</span>
      </motion.button>
    </motion.div>
  );
}