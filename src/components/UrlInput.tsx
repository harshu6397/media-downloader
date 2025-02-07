import { Youtube, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import { RiPinterestLine } from 'react-icons/ri';

interface UrlInputProps {
  url: string;
  onChange: (url: string) => void;
}

export default function UrlInput({ url, onChange }: UrlInputProps) {
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
    <motion.div 
      className="relative mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000" />
        <div className="relative">
          <input
            type="text"
            value={url}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste your URL here..."
            className="w-full bg-white/5 backdrop-blur-sm rounded-lg px-6 py-4 pr-12
              border border-white/10 focus:border-white/20
              placeholder-white/40 text-white
              focus:outline-none focus:ring-2 focus:ring-violet-500/30
              transition-all duration-300"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {url && getPlatformIcon(url)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}