import React, { useState, useEffect, Suspense, lazy } from 'react';
    import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
    import { Toaster } from '@/components/ui/toaster';
    import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
    import { AudioProvider, useAudio } from '@/contexts/AudioContext';
    import Layout from '@/components/Layout';
    import LoadingScreen from '@/components/LoadingScreen';
    import ProtectedRoute from '@/components/ProtectedRoute';
    import { supabase } from '@/lib/supabaseClient';

    const HomePage = lazy(() => import('@/pages/HomePage'));
    const LoginPage = lazy(() => import('@/pages/LoginPage'));
    const RegisterPage = lazy(() => import('@/pages/RegisterPage'));
    const ContactPage = lazy(() => import('@/pages/ContactPage'));
    const SupportPage = lazy(() => import('@/pages/SupportPage')); // Added SupportPage
    const AdminDashboardPage = lazy(() => import('@/pages/AdminDashboardPage'));
    const AddProjectPage = lazy(() => import('@/pages/AddProjectPage'));
    const EditProjectPage = lazy(() => import('@/pages/EditProjectPage'));

    const incrementVisitCount = async () => {
      try {
        const { error } = await supabase.rpc('increment_visit_counter');
        if (error) {
          console.error('Error incrementing visit count:', error);
        }
      } catch (error) {
        console.error('Error in RPC call for visit count:', error);
      }
    };

    function AppContent() {
      const [isLoading, setIsLoading] = useState(true);
      const { theme } = useTheme();
      const { isPlaying } = useAudio();

      useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
      }, [theme]);

      useEffect(() => {
        const sessionKey = 'site_visit_logged';
        if (!sessionStorage.getItem(sessionKey)) {
          incrementVisitCount();
          sessionStorage.setItem(sessionKey, 'true');
        }
      }, []);

      useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 4000);
        return () => clearTimeout(timer);
      }, []);

      if (isLoading) {
        return <LoadingScreen />;
      }

      return (
        <Router>
          <Layout>
            <Suspense fallback={<div className="flex-grow flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand-primary"></div></div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/support" element={<SupportPage />} /> {/* Added SupportPage Route */}
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute>
                      <AdminDashboardPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/add-project" 
                  element={
                    <ProtectedRoute>
                      <AddProjectPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/edit-project/:projectId" 
                  element={
                    <ProtectedRoute>
                      <EditProjectPage />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Suspense>
          </Layout>
          <Toaster />
        </Router>
      );
    }

    export default function App() {
      return (
        <ThemeProvider>
          <AudioProvider>
            <AppContent />
          </AudioProvider>
        </ThemeProvider>
      );
                }
