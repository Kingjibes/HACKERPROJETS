import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Textarea } from '@/components/ui/textarea';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
    import { useToast } from '@/components/ui/use-toast';
    import { supabase } from '@/lib/supabaseClient';
    import { motion } from 'framer-motion';
    import { ArrowLeft, Save } from 'lucide-react';

    const AddProjectPage = () => {
      const [title, setTitle] = useState('');
      const [description, setDescription] = useState('');
      const [imageUrl, setImageUrl] = useState('');
      const [projectUrl, setProjectUrl] = useState('');
      const [loading, setLoading] = useState(false);
      const navigate = useNavigate();
      const { toast } = useToast();

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

        setLoading(true);

        const newProject = {
          title,
          description,
          image_url: imageUrl || null,
          project_url: projectUrl || null,
        };

        try {
          const { error } = await supabase.from('projects').insert([newProject]);
          if (error) throw error;

          toast({ title: "Project Added", description: `"${title}" has been successfully added.` });
          navigate('/admin');
        } catch (error) {
          console.error("Failed to save project:", error);
          toast({
            variant: "destructive",
            title: "Error Saving Project",
            description: error.message || "Could not save the project to the database.",
          });
        } finally {
          setLoading(false);
        }
      };

      return (
        <div className="max-w-2xl mx-auto py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button variant="outline" onClick={() => navigate('/admin')} className="mb-6" disabled={loading}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>
            <Card className="shadow-xl glassmorphism">
              <CardHeader>
                <CardTitle className="text-3xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Add New Project</CardTitle>
                <CardDescription>Fill in the details for your new masterpiece.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., AI Powered Chatbot"
                      required
                      disabled={loading}
                      className="bg-background/70 dark:bg-input/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="A brief summary of your project..."
                      required
                      rows={4}
                      disabled={loading}
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
                      placeholder="https://example.com/image.jpg"
                      disabled={loading}
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
                      placeholder="https://yourprojectlive.com"
                      disabled={loading}
                      className="bg-background/70 dark:bg-input/50"
                    />
                  </div>
                  <CardFooter className="px-0 pt-6">
                    <Button type="submit" className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white hover:opacity-90 transition-opacity" disabled={loading}>
                      {loading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      ) : (
                        <Save className="mr-2 h-5 w-5" />
                      )}
                      {loading ? 'Adding...' : 'Add Project'}
                    </Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      );
    };

    export default AddProjectPage;