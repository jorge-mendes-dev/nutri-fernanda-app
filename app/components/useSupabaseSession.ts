import { supabase } from "@/src/supabase/client";
import type { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export function useSupabaseSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function fetchSession() {
      const { data } = await supabase.auth.getSession();
      if (mounted) {
        setSession(data.session ?? null);
        setLoading(false);
      }
    }
    fetchSession();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) setSession(session ?? null);
    });
    return () => {
      mounted = false;
      listener?.subscription.unsubscribe();
    };
  }, []);

  return { session, loading };
}
