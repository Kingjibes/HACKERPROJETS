import React, { useState, useEffect } from 'react';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
    import { motion } from 'framer-motion';
    import { ExternalLink, Eye, Zap, Code, ChevronDown } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast';
    import { supabase } from '@/lib/supabaseClient';

    const HomePage = () => {
      const [projects, setProjects] = useState([]);
      const [loading, setLoading] = useState(true);
      const { toast } = useToast();

      useEffect(() => {
        const fetchProjects = async () => {
          setLoading(true);
          try {
            const { data, error } = await supabase
              .from('projects')
              .select('*')
              .order('created_at', { ascending: false });

            if (error) {
              throw error;
            }
            setProjects(data || []);
          } catch (error) {
            console.error("Error fetching projects:", error);
            toast({
              variant: "destructive",
              title: "Error Loading Projects",
              description: error.message || "Could not load projects from the database.",
            });
            setProjects([]);
          } finally {
            setLoading(false);
          }
        };

        fetchProjects();
      }, [toast]);

      const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
          },
        },
      };

      const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: 'spring',
            stiffness: 120,
            damping: 14,
          },
        },
      };

      const scrollDownVariants = {
        animate: {
          y: [0, 10, 0],
          opacity: [1, 0.7, 1],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }
      };

      return (
        <div className="space-y-16">
          <motion.section
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center min-h-[calc(80vh-var(--header-height,80px))] flex flex-col justify-center py-12 md:py-16 bg-hero-gradient-light dark:bg-hero-gradient-dark rounded-xl shadow-2xl overflow-hidden relative"
          >
             <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.4%22%3E%3Cpath%20opacity%3D%22.5%22%20d%3D%22M96%2095%20h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zM0%2095h4v1H0v-1zm8-8h4v1H8v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zM96%2079h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zM0%2079h4v1H0v-1zm8-8h4v1H8v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zM96%2063h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zM0%2063h4v1H0v-1zm8-8h4v1H8v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zM96%2047h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zM0%2047h4v1H0v-1zm8-8h4v1H8v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zM96%2031h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zM0%2031h4v1H0v-1zm8-8h4v1H8v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zm8%200h4v1h-4v-1zM96%2015h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zm-8%200h4v1h-4v-1zM0%2015h4v1H0v-1z%22/%3E%3Cpath%20d%3D%22M6%209V0h1v9H6zM14%209V0h1v9h-1zM22%209V0h1v9h-1zM30%209V0h1v9h-1zM38%209V0h1v9h-1zM46%209V0h1v9h-1zM54%209V0h1v9h-1zM62%209V0h1v9h-1zM70%209V0h1v9h-1zM78%209V0h1v9h-1zM86%209V0h1v9h-1zM94%209V0h1v9h-1z%22/%3E%3C/g%3E%3C/svg%3E')]"></div>
            <div className="relative z-10">
              <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tighter mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent brightness-110 saturate-125">
                  Welcome to HACKERPRO'S
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-accent via-primary to-brand-secondary brightness-110 saturate-125">
                  Digital Playground
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 px-4">
                Explore a curated collection of innovative projects, experiments, and digital creations. Each piece showcases a journey of learning, building, and pushing boundaries.
              </p>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg">
                  <Link to="/contact" className="flex items-center">
                    Get in Touch <ExternalLink className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
            <motion.div 
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground/70"
              variants={scrollDownVariants}
              animate="animate"
              onClick={() => document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <ChevronDown size={36} className="cursor-pointer" />
            </motion.div>
          </motion.section>

          <section className="pb-12 pt-8" id="projects-section">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-brand-primary">
                <Zap className="inline-block h-10 w-10 mr-2 -mt-1 text-yellow-400" />
                Featured Projects
              </span>
            </h2>
            {loading ? (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
              </div>
            ) : projects.length === 0 ? (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center text-muted-foreground text-xl py-16"
              >
                No projects available yet. The digital forge is heating up... Stay tuned!
              </motion.p>
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {projects.map((project) => (
                  <motion.div key={project.id} variants={itemVariants} className="h-full">
                    <Card className="h-full flex flex-col overflow-hidden glassmorphism group hover:shadow-2xl dark:hover:shadow-[0_0_35px_hsl(var(--brand-accent)/0.3)] transition-all duration-300 ease-out transform hover:-translate-y-2 border-transparent hover:border-primary/30 dark:hover:border-brand-accent/50">
                      {project.image_url && (
                        <div className="aspect-[16/10] overflow-hidden relative">
                          <img src={project.image_url} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      )}
                      {!project.image_url && (
                         <div className="aspect-[16/10] flex items-center justify-center bg-muted/30 dark:bg-muted/10 rounded-t-lg">
                            <Code size={48} className="text-muted-foreground/40" />
                        </div>
                      )}
                      <CardHeader className="pt-6 pb-4">
                        <CardTitle className="text-2xl font-bold font-display text-primary group-hover:text-accent transition-colors duration-300">{project.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow pb-4">
                        <CardDescription className="text-muted-foreground line-clamp-4 text-base leading-relaxed">{project.description}</CardDescription>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center pt-4 pb-6 px-6 border-t border-border/50">
                        {project.project_url ? (
                           <Button variant="outline" asChild className="bg-transparent border-primary/50 text-primary hover:bg-primary/10 hover:border-primary hover:text-accent transition-all duration-300 group-hover:scale-105">
                            <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                              <Eye className="mr-2 h-4 w-4" /> View Project
                            </a>
                          </Button>
                        ) : (
                           <span className="text-sm text-muted-foreground">
                            <Code className="inline-block mr-2 h-4 w-4" /> In Development
                           </span>
                        )}
                        <span className="text-xs text-muted-foreground font-mono tracking-tighter bg-muted px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {new Date(project.created_at).toLocaleDateString()}
                        </span>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </section>
        </div>
      );
    };

    export default HomePage;
