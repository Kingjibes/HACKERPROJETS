import React from 'react';
    import { motion } from 'framer-motion';
    import Logo from '@/components/Logo';

    const LoadingScreen = () => {
      return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary/50 dark:from-background dark:to-secondary/20 z-[200] text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="mb-6"
          >
            <Logo size="large" />
          </motion.div>
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            HACKERPRO'S PROJECTS
          </motion.h1>
          <motion.p 
            className="text-base md:text-lg text-muted-foreground mb-6 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Crafting digital experiences, one line of code at a time.
            <br />
            Please wait while we initialize the awesomeness.
          </motion.p>
          <motion.div 
            className="w-56 sm:w-64 h-2 bg-muted rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.8, delay: 1.2, ease: "linear" }}
            />
          </motion.div>
          <motion.p 
            className="mt-4 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            Booting up the digital playground...
          </motion.p>
        </div>
      );
    };

    export default LoadingScreen;