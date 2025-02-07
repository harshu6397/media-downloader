import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

interface DownloadButtonProps {
  url: string;
  isDownloading: boolean;
  onClick: () => void;
  error?: string | null;
}

export default function DownloadButton({ url, isDownloading, onClick, error }: DownloadButtonProps) {
  return (
    <div className="my-8">
      <motion.button
        onClick={onClick}
        disabled={!url || isDownloading}
        className={`
          w-full relative group overflow-hidden
          ${!url || isDownloading 
            ? 'bg-white/5 cursor-not-allowed' 
            : 'bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500'}
          rounded-xl py-4 px-6
          transition-all duration-300
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 opacity-0 group-hover:opacity-100"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          style={{ backgroundSize: '200% 200%' }}
        />
        <div className="relative flex items-center justify-center gap-3">
          <motion.div
            animate={isDownloading ? {
              y: [0, -8, 0],
              transition: { duration: 1, repeat: Infinity }
            } : {}}
          >
            <Download className="w-5 h-5" />
          </motion.div>
          <span className="font-medium">
            {isDownloading ? 'Downloading...' : 'Download'}
          </span>
        </div>
      </motion.button>
      
      {error && (
        <motion.p 
          className="text-red-400 text-sm mt-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}