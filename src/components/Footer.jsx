import React from 'react';
    import { Github, Linkedin, Twitter } from 'lucide-react';

    const Footer = () => {
      return (
        <footer className="py-8 bg-background/50 dark:bg-background/70 border-t border-border/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground font-display">
              Made by <span className="font-bold text-foreground">HACKERPRO</span> &copy; {new Date().getFullYear()}
            </p>
            <div className="flex justify-center space-x-4 mt-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </footer>
      );
    };

    export default Footer;