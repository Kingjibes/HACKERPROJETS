import React, { useState } from 'react';
    import { Link } from 'react-router-dom';
    import { Moon, Sun, Volume2, VolumeX, Menu, X as CloseIcon, HeartHandshake } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { useTheme } from '@/contexts/ThemeContext';
    import { useAudio } from '@/contexts/AudioContext';
    import { motion, AnimatePresence } from 'framer-motion';
    import Logo from '@/components/Logo';

    const MobileMenu = ({ isOpen, onClose }) => {
      const navItems = [
        { path: '/', label: 'Home' },
        { path: '/contact', label: 'Contact' },
        { path: '/support', label: 'Support Us', icon: <HeartHandshake className="mr-2 h-5 w-5" /> },
        { path: '/login', label: 'Admin Login' },
      ];

      return (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 right-0 md:hidden bg-card/90 dark:bg-card/95 backdrop-blur-sm shadow-lg z-40 p-4 border-t border-border"
            >
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Button key={item.path} variant="ghost" asChild onClick={onClose} className="justify-start text-lg">
                    <Link to={item.path} className="flex items-center">
                      {item.icon}
                      {item.label}
                    </Link>
                  </Button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      );
    };
    
    const Header = () => {
      const { theme, toggleTheme } = useTheme();
      const { isPlaying, toggleAudio } = useAudio();
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

      const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

      return (
        <header className="sticky top-0 z-50 w-full glassmorphism">
          <div className="container mx-auto px-4 h-20 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 h-logo-container" onClick={() => setIsMobileMenuOpen(false)}>
              <Logo />
              <span className="font-display text-xl md:text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent">
                HACKERPRO'S PROJECTS
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              <Button variant="ghost" asChild>
                <Link to="/">Home</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/contact">Contact</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/support" className="flex items-center">
                  <HeartHandshake className="mr-2 h-4 w-4 text-pink-500" /> Support Us
                </Link>
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === 'dark' ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-slate-600" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleAudio} aria-label="Toggle sound">
                {isPlaying ? <Volume2 className="h-5 w-5 text-green-500" /> : <VolumeX className="h-5 w-5 text-red-500" />}
              </Button>
              <div className="md:hidden">
                <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Toggle menu">
                  {isMobileMenuOpen ? <CloseIcon className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </div>
          </div>
          <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </header>
      );
    };

    export default Header;
