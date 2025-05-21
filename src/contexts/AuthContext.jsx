import React, { createContext, useState, useContext, useEffect } from 'react';
    import { useToast } from '@/components/ui/use-toast';
    import { supabase } from '@/lib/supabaseClient';

    const AuthContext = createContext();
    const ADMIN_EMAIL = "richvybs92@gmail.com";

    export const AuthProvider = ({ children }) => {
      const [user, setUser] = useState(null);
      const [isAuthenticated, setIsAuthenticated] = useState(false);
      const [loading, setLoading] = useState(true);
      const { toast } = useToast();

      useEffect(() => {
        const getSession = async () => {
          const { data: { session } } = await supabase.auth.getSession();
          setUser(session?.user ?? null);
          setIsAuthenticated(!!session?.user);
          setLoading(false);
        };

        getSession();

        const { data: authListener } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            setUser(session?.user ?? null);
            setIsAuthenticated(!!session?.user);
            setLoading(false);
          }
        );

        return () => {
          authListener?.subscription.unsubscribe();
        };
      }, []);

      const login = async (email, password) => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          });
          if (error) throw error;
          toast({ title: "Login Successful", description: "Welcome!" });
          return true;
        } catch (error) {
          toast({ variant: "destructive", title: "Login Failed", description: error.message || "Invalid email or password." });
          return false;
        }
      };

      const register = async (email, password, confirmPassword) => {
        if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
          toast({ variant: "destructive", title: "Registration Not Allowed", description: "This email address is not authorized for registration." });
          return false;
        }
        if (password !== confirmPassword) {
            toast({ variant: "destructive", title: "Registration Failed", description: "Passwords do not match." });
            return false;
        }
        try {
          const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
          });
          if (error) throw error;
          toast({ title: "Registration Successful", description: "Please check your email to confirm your account." });
          return true;
        } catch (error) {
          toast({ variant: "destructive", title: "Registration Failed", description: error.message || "Could not register user." });
          return false;
        }
      };

      const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
          toast({ variant: "destructive", title: "Logout Failed", description: error.message });
        } else {
          toast({ title: "Logged Out", description: "You have been successfully logged out." });
        }
      };

      return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register, loading }}>
          {!loading && children}
        </AuthContext.Provider>
      );
    };

    export const useAuth = () => useContext(AuthContext);