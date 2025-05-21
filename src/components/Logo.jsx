import React from 'react';
    import { motion } from 'framer-motion';

    const Logo = ({ size = 'normal' }) => {
      const sizeClasses = size === 'large' ? 'text-6xl md:text-8xl' : 'text-4xl md:text-5xl';
      return (
        <motion.div 
          className={`h-logo-container inline-block animate-logo-pulse ${sizeClasses}`}
          whileHover={{ scale: 1.1, rotate: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className="h-logo-char">H</span>
        </motion.div>
      );
    };

    export default Logo;