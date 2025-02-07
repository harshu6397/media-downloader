import { X, Youtube, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDownloadHistory } from '../hooks/useDownloadHistory';
import { slideUp, scaleIn, staggerContainer } from '../animations/variants';
import type { DownloadHistory as DownloadHistoryType } from '../types';
import { RiPinterestLine } from 'react-icons/ri';

interface DownloadHistoryProps {
  show: boolean;
  onClose: () => void;
}

export default function DownloadHistory({ show, onClose }: DownloadHistoryProps) {
  const { history, loading, error } = useDownloadHistory();

  const getPlatformIcon = (url: string) => {
      const platforms = [
        { regex: /youtube/i, Icon: Youtube, color: "text-red-600" },
        { regex: /instagram/i, Icon: Instagram, color: "text-pink-600" },
        { regex: /pinterest|pin\.it/i, Icon: RiPinterestLine, color: "text-red-600" },
      ];
    
      const platform = platforms.find(({ regex }) => regex.test(url));
    
      if (platform) {
        const { Icon, color } = platform;
        return (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon className={`w-6 h-6 ${color}`} />
          </motion.div>
        );
      } 
    
      return null;
    };
    
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="mt-8 border-t border-white/10 pt-8"
          variants={slideUp}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: 20 }}
        >
          <div className="flex items-center justify-between mb-6">
            <motion.h2 
              className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400"
              variants={scaleIn}
            >
              Download History
            </motion.h2>
            <motion.button
              onClick={onClose}
              className="text-white/60 hover:text-white/90 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {loading ? (
            <motion.div 
              className="space-y-4"
              variants={slideUp}
            >
              {[1, 2, 3].map((i) => (
                <div 
                  key={i}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 animate-pulse"
                >
                  <div className="h-5 bg-white/10 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-white/10 rounded w-1/2" />
                </div>
              ))}
            </motion.div>
          ) : error ? (
            <motion.div 
              className="text-red-400 text-center py-8 bg-white/5 backdrop-blur-sm rounded-xl"
              variants={scaleIn}
            >
              {error}
            </motion.div>
          ) : history.length > 0 ? (
            <motion.div 
              className="space-y-4"
              variants={staggerContainer}
            >
              {history.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 group hover:bg-white/10 transition-colors relative overflow-hidden"
                  variants={slideUp}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-lg mb-1">{item.title}</h3>
                      <p className="text-sm text-white/60 mb-1">{item.download_date}</p>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
                      >
                        {item.url}
                      </a>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {getPlatformIcon(item.url)}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-white/60 text-center py-8 bg-white/5 backdrop-blur-sm rounded-xl"
              variants={scaleIn}
            >
              No download history available
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}