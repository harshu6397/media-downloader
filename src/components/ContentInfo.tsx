import { motion } from 'framer-motion';
import type { ContentInfo as ContentInfoType } from '../types/api';
import { slideUp } from '../animations/variants';

interface ContentInfoProps {
  info: ContentInfoType | null;
  loading: boolean;
  error: string | null;
}

export default function ContentInfo({ info, loading, error }: ContentInfoProps) {
  if (loading) {
    return (
      <motion.div 
        className="text-gray-400 text-sm mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="h-6 bg-gray-700 rounded w-3/4 mb-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div
          className="h-4 bg-gray-700 rounded w-1/2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        />
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="text-red-400 text-sm mt-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {error}
      </motion.div>
    );
  }

  if (!info) {
    return null;
  }

  return (
    <motion.div
      className="bg-gray-700/30 backdrop-blur-sm rounded-lg p-6 mb-6"
      variants={slideUp}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <h3 className="font-medium text-xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
        {info.title}
      </h3>
      {info.uploader && (
        <p className="text-gray-400 text-sm mb-1">Uploaded by: {info.uploader}</p>
      )}
      {info.duration && (
        <p className="text-gray-400 text-sm">
          Duration: {Math.floor(info.duration / 60)}:{(info.duration % 60).toString().padStart(2, '0')}
        </p>
      )}
    </motion.div>
  );
}