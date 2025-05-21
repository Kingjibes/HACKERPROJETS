import React, { useState } from 'react';
    import { useNavigate, Link, useLocation } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
    import { useAuth } from '@/contexts/AuthContext';
    import { motion } from 'framer-motion';
    import { LogIn, UserPlus } from 'lucide-react';

    const LoginPage = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [loading, setLoading] = useState(false);
      const navigate = useNavigate();
      const location = useLocation();
      const { login } = useAuth();

      const from = location.state?.from?.pathname || "/admin";

      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const success = await login(email, password);
        if (success) {
          navigate(from, { replace: true });
        }
        setLoading(false);
      };

      return (
        <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "backOut" }}
          >
            <Card className="w-full max-w-md shadow-2xl glassmorphism">
              <CardHeader className="text-center">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <CardTitle className="text-3xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Admin Login</CardTitle>
                  <CardDescription className="text-muted-foreground">Access your HACKERPRO dashboard.</CardDescription>
                </motion.div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div 
                    className="space-y-2"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@example.com"
                      required
                      disabled={loading}
                      className="bg-background/70 dark:bg-input/50"
                    />
                  </motion.div>
                  <motion.div 
                    className="space-y-2"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      disabled={loading}
                      className="bg-background/70 dark:bg-input/50"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity" disabled={loading}>
                      {loading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      ) : (
                        <LogIn className="mr-2 h-5 w-5" />
                      )}
                      {loading ? 'Logging in...' : 'Secure Login'}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col items-center space-y-2 text-sm">
                <p className="text-muted-foreground">
                  Don't have an account?
                </p>
                <Button variant="link" asChild className="text-primary hover:text-accent">
                  <Link to="/register">
                    <UserPlus className="mr-2 h-4 w-4" /> Register Here
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      );
    };

    export default LoginPage;