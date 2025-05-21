import React from 'react';
    import Header from '@/components/Header';
    import Footer from '@/components/Footer';
    import MovingStarsBackground from '@/components/MovingStarsBackground';
    import { motion } from 'framer-motion';

    const Layout = ({ children }) => {
      return (
        <div className="relative flex flex-col min-h-screen bg-gradient-to-br from-background to-secondary/30 dark:from-background dark:to-secondary/10 transition-colors duration-500 overflow-x-hidden">
          <MovingStarsBackground />
          <Header />
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex-grow container mx-auto px-4 py-8 z-10"
          >
            {children}
          </motion.main>
          <Footer />
        </div>
      );
    };

    export default Layout;