import React, { useState, useEffect } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
    import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
    import { useToast } from '@/components/ui/use-toast';
    import { useAuth } from '@/contexts/AuthContext';
    import { supabase } from '@/lib/supabaseClient';
    import { PlusCircle, Edit3, Trash2, LogOut, ExternalLink, Image as ImageIcon, Eye, Users } from 'lucide-react';
    import { motion } from 'framer-motion';

    const AdminDashboardPage = () => {
      const [projects, setProjects] = useState([]);
      const [loading, setLoading] = useState(true);
      const [projectToDelete, setProjectToDelete] = useState(null);
      const [visitCount, setVisitCount] = useState(0);
      const { toast } = useToast();
      const { logout, isAuthenticated } = useAuth(); 
      const navigate = useNavigate();

      const fetchProjects = async () => {
        setLoading(true);
        try {
          const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

          if (error) throw error;
          setProjects(data || []);
        } catch (error) {
          console.error("Error fetching projects:", error);
          toast({
            variant: "destructive",
            title: "Error Loading Projects",
            description: error.message || "Could not load projects.",
          });
        } finally {
          setLoading(false);
        }
      };

      const fetchVisitCount = async () => {
        try {
          const { data, error } = await supabase
            .from('site_visits')
            .select('visit_count')
            .eq('id', 1)
            .single();

          if (error) throw error;
          setVisitCount(data?.visit_count || 0);
        } catch (error) {
          console.error("Error fetching visit count:", error);
          toast({
            variant: "destructive",
            title: "Error Loading Visit Count",
            description: error.message || "Could not load site statistics.",
          });
        }
      };

      useEffect(() => {
        if (isAuthenticated) {
          fetchProjects();
          fetchVisitCount();
        }
      }, [isAuthenticated, toast]);


      const handleDeleteProject = async () => {
        if (!projectToDelete) return;
        try {
          const { error } = await supabase
            .from('projects')
            .delete()
            .match({ id: projectToDelete.id });

          if (error) throw error;

          setProjects(projects.filter(p => p.id !== projectToDelete.id));
          toast({ title: "Project Deleted", description: `"${projectToDelete.title}" has been removed.` });
          setProjectToDelete(null);
        } catch (error) {
          console.error("Failed to delete project:", error);
          toast({
            variant: "destructive",
            title: "Error Deleting Project",
            description: error.message || "Could not delete the project.",
          });
        }
      };

      const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        logout(); 
        if (error) {
          toast({ variant: "destructive", title: "Logout Failed", description: error.message });
        }
        navigate('/login');
      };
      
      const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      };

      const itemVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            type: 'spring',
            stiffness: 260,
            damping: 20,
          },
        },
      };


      return (
        <div className="space-y-10 py-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 rounded-xl glassmorphism shadow-lg"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Admin Dashboard</h1>
              <div className="mt-2 flex items-center text-sm text-muted-foreground">
                <Users className="mr-2 h-5 w-5 text-brand-primary" />
                <span>Total Site Visits: </span>
                <span className="font-bold text-foreground ml-1">{visitCount}</span>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap justify-center">
              <Button asChild className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <Link to="/admin/add-project" className="flex items-center">
                  <PlusCircle className="mr-2 h-5 w-5" /> Add New Project
                </Link>
              </Button>
              <Button variant="outline" onClick={handleLogout} className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <LogOut className="mr-2 h-5 w-5" /> Logout
              </Button>
            </div>
          </motion.div>

          {loading && projects.length === 0 ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
            </div>
          ) : !loading && projects.length === 0 ? (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center text-muted-foreground text-xl py-16"
            >
              No projects found. Time to unleash your creativity and add some!
            </motion.p>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {projects.map((project) => (
                <motion.div key={project.id} variants={itemVariants} className="h-full">
                  <Card className="h-full flex flex-col overflow-hidden glassmorphism group hover:shadow-xl dark:hover:shadow-[0_0_25px_hsl(var(--brand-secondary)/0.2)] transition-all duration-300 ease-out transform hover:-translate-y-1.5 border-transparent hover:border-secondary/50">
                    {project.image_url ? (
                      <div className="aspect-[16/10] overflow-hidden relative rounded-t-lg">
                        <img src={project.image_url} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                           {project.project_url && (
                            <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="text-xs text-white/80 hover:text-white flex items-center bg-black/50 px-2 py-1 rounded-sm backdrop-blur-sm">
                              <ExternalLink size={14} className="mr-1.5" /> Visit Site
                            </a>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-[16/10] flex items-center justify-center bg-muted/50 rounded-t-lg">
                        <ImageIcon className="h-16 w-16 text-muted-foreground/50" />
                      </div>
                    )}
                    <CardHeader className="pt-5 pb-3">
                      <CardTitle className="text-xl font-bold font-display text-primary group-hover:text-accent transition-colors duration-300">{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow pb-4">
                      <CardDescription className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{project.description}</CardDescription>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2 pt-3 pb-5 px-5 border-t border-border/30">
                      <Button variant="outline" size="sm" asChild className="hover:border-blue-500 hover:text-blue-500 transition-colors duration-200 group-hover:border-blue-400 group-hover:bg-blue-500/10">
                        <Link to={`/admin/edit-project/${project.id}`} className="flex items-center">
                          <Edit3 className="mr-1.5 h-4 w-4" /> Edit
                        </Link>
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="destructive" size="sm" onClick={() => setProjectToDelete(project)} className="transition-colors duration-200 group-hover:bg-red-600">
                            <Trash2 className="mr-1.5 h-4 w-4" /> Delete
                          </Button>
                        </DialogTrigger>
                        {projectToDelete && projectToDelete.id === project.id && (
                          <DialogContent className="sm:max-w-[425px] glassmorphism">
                            <DialogHeader>
                              <DialogTitle className="text-destructive">Delete Project: {projectToDelete.title}</DialogTitle>
                              <DialogDescription>
                                Are you absolutely sure? This action cannot be undone and will permanently remove the project data.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setProjectToDelete(null)}>Cancel</Button>
                              <Button variant="destructive" onClick={handleDeleteProject}>Confirm Delete</Button>
                            </DialogFooter>
                          </DialogContent>
                        )}
                      </Dialog>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      );
    };

    export default AdminDashboardPage;
