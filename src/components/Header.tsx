import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeIn, slideUp, staggerContainer } from '../animations/variants';
import { gradients } from '../styles/gradients';

export default function Header() {
  return (
    <motion.header 
      className="text-center mb-12"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <motion.div 
        className="inline-flex items-center justify-center gap-3 mb-4"
        variants={slideUp}
      >
        <motion.div
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        >
          <Download className="w-12 h-12 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 p-2 rounded-full" />
        </motion.div>
        <h1 className={`text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${gradients.primary}`}>
          Social Media Downloader
        </h1>
      </motion.div>
      <motion.p 
        className="text-slate-400 text-lg"
        variants={fadeIn}
      >
        Download content from YouTube, Instagram, and Pinterest
      </motion.p>
    </motion.header>
  );
}