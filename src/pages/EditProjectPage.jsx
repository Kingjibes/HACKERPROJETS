import React, { useState, useEffect } from 'react';
    import { useNavigate, useParams } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Textarea } from '@/components/ui/textarea';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
    import { useToast } from '@/components/ui/use-toast';
    import { supabase } from '@/lib/supabaseClient';
    import { motion } from 'framer-motion';
    import { ArrowLeft, Save } from 'lucide-react';

    const EditProjectPage = () => {
      const { projectId } = useParams();
      const navigate = useNavigate();
      const { toast } = useToast();

      const [title, setTitle] = useState('');
      const [description, setDescription] = useState('');
      const [imageUrl, setImageUrl] = useState('');
      const [projectUrl, setProjectUrl] = useState('');
      const [loading, setLoading] = useState(true);
      const [saving, setSaving] = useState(false);
      const [projectExists, setProjectExists] = useState(true);

      useEffect(() => {
        const fetchProject = async () => {
          setLoading(true);
          try {
            const { data, error } = await supabase
              .from('projects')
              .select('*')
              .eq('id', projectId)
              .single();

            if (error || !data) {
              setProjectExists(false);
              toast({
                variant: "destructive",
                title: "Project Not Found",
                description: "The project you are trying to edit does not exist.",
              });
              navigate('/admin');
              return;
            }
            
            setTitle(data.title);
            setDescription(data.description);
            setImageUrl(data.image_url || '');
            setProjectUrl(data.project_url || '');

          } catch (error) {
            console.error("Failed to load project for editing:", error);
            toast({
              variant: "destructive",
              title: "Error Loading Project",
              description: error.message || "Could not load the project data.",
            });
            navigate('/admin');
          } finally {
            setLoading(false);
          }
        };

        fetchProject();
      }, [projectId, navigate, toast]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description) {
          toast({
            variant: "destructive",
            title: "Missing Fields",
            description: "Title and Description are required.",
          });
          return;
        }
        setSaving(true);
        try {
          const { error } = await supabase
            .from('projects')
            .update({ 
              title, 
              description, 
              image_url: imageUrl || null, 
              project_url: projectUrl || null 
            })
            .match({ id: projectId });

          if (error) throw error;

          toast({ title: "Project Updated", description: `"${title}" has been successfully updated.` });
          navigate('/admin');
        } catch (error) {
          console.error("Failed to update project:", error);
          toast({
            variant: "destructive",
            title: "Error Updating Project",
            description: error.message || "Could not update the project.",
          });
        } finally {
          setSaving(false);
        }
      };

      if (loading) {
        return (
          <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        );
      }

      if (!projectExists) {
        return null; 
      }

      return (
        <div className="max-w-2xl mx-auto py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button variant="outline" onClick={() => navigate('/admin')} className="mb-6" disabled={saving}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>
            <Card className="shadow-xl glassmorphism">
              <CardHeader>
                <CardTitle className="text-3xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Edit Project</CardTitle>
                <CardDescription>Update the details for your project.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      disabled={saving}
                      className="bg-background/70 dark:bg-input/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      rows={4}
                      disabled={saving}
                      className="bg-background/70 dark:bg-input/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">Image URL (Optional)</Label>
                    <Input
                      id="imageUrl"
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      disabled={saving}
                      className="bg-background/70 dark:bg-input/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="projectUrl">Project URL (Optional)</Label>
                    <Input
                      id="projectUrl"
                      type="url"
                      value={projectUrl}
                      onChange={(e) => setProjectUrl(e.target.value)}
                      disabled={saving}
                      className="bg-background/70 dark:bg-input/50"
                    />
                  </div>
                  <CardFooter className="px-0 pt-6">
                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:opacity-90 transition-opacity" disabled={saving}>
                      {saving ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      ) : (
                        <Save className="mr-2 h-5 w-5" />
                      )}
                      {saving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      );
    };

    export default EditProjectPage;