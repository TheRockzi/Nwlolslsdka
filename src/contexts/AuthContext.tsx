import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface Profile {
  id: string;
  username: string;
  created_at: string;
  web_challenges_completed: number;
  programming_challenges_completed: number;
  crypto_challenges_completed: number;
  is_staff: boolean;
  staff_role?: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  updateUserRole: (userId: string, role: string, isStaff: boolean) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (existingProfile) {
        setProfile(existingProfile);
        return;
      }

      if (fetchError?.code === 'PGRST116' || !existingProfile) {
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([{
            id: userId,
            username: `user_${userId.slice(0, 8)}`,
            web_challenges_completed: 0,
            programming_challenges_completed: 0,
            crypto_challenges_completed: 0,
            is_staff: false
          }])
          .select()
          .single();

        if (createError) {
          const { data: retryProfile, error: retryError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

          if (retryError) throw retryError;
          setProfile(retryProfile);
        } else {
          setProfile(newProfile);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setProfile(null);
    }
  };

  const updateUserRole = async (userId: string, role: string, isStaff: boolean): Promise<boolean> => {
    if (!user) return false;
    
    const { data, error } = await supabase
      .rpc('update_user_role', {
        target_user_id: userId,
        new_role: role,
        new_is_staff: isStaff,
        admin_user_id: user.id
      });

    if (error) {
      console.error('Error updating user role:', error);
      return false;
    }

    return data;
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string, username: string) => {
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    const { error: signUpError, data } = await supabase.auth.signUp({ 
      email, 
      password,
    });
    
    if (signUpError) throw signUpError;

    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ 
          id: data.user.id, 
          username,
          web_challenges_completed: 0,
          programming_challenges_completed: 0,
          crypto_challenges_completed: 0,
          is_staff: false
        }]);
      
      if (profileError) {
        console.error('Error creating profile:', profileError);
      }
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile, 
      signIn, 
      signUp, 
      signOut, 
      loading,
      updateUserRole 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};