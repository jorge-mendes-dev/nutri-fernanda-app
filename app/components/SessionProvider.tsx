"use client";

import { supabase } from "@/src/supabase/client";
import type { Session } from "@supabase/supabase-js";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface SessionContextValue {
  session: Session | null;
  loading: boolean;
}

const SessionContext = createContext<SessionContextValue>({
  session: null,
  loading: true,
});

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (mounted) {
          setSession(session ?? null);
          setLoading(false);
        }
      },
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContext.Provider value={{ session, loading }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
