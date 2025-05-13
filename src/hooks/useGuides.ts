import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Tables } from '../lib/supabase';

export function useGuides(destinationId?: string) {
  const [guides, setGuides] = useState<Tables['guides'][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGuides = async () => {
    try {
      let query = supabase
        .from('guides')
        .select('*')
        .order('created_at', { ascending: false });

      if (destinationId) {
        query = query.eq('destination_id', destinationId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setGuides(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addGuide = async (guide: Omit<Tables['guides'], 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('guides')
        .insert([guide])
        .select()
        .single();

      if (error) throw error;
      setGuides(prev => [data, ...prev]);
      return data;
    } catch (err) {
      console.error('Error adding guide:', err);
      throw err;
    }
  };

  const updateGuide = async (id: string, updates: Partial<Tables['guides']>) => {
    try {
      const { data, error } = await supabase
        .from('guides')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setGuides(prev => prev.map(g => g.id === id ? data : g));
      return data;
    } catch (err) {
      console.error('Error updating guide:', err);
      throw err;
    }
  };

  const deleteGuide = async (id: string) => {
    try {
      const { error } = await supabase
        .from('guides')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setGuides(prev => prev.filter(g => g.id !== id));
    } catch (err) {
      console.error('Error deleting guide:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchGuides();
  }, [destinationId]);

  return {
    guides,
    loading,
    error,
    addGuide,
    updateGuide,
    deleteGuide,
    refetch: fetchGuides
  };
}