"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" fill="none" aria-hidden>
      <path d="M44 20H24v8h11.9C34.6 31.9 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6-6C34.6 4.9 29.6 3 24 3 12.3 3 3 12.3 3 24s9.3 21 21 21 21-9.3 21-21c0-1.4-.1-2.7-.3-4z" fill="#EA4335"/>
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) router.push("/dashboard");
    };
    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) router.push("/dashboard");
    });

    return () => listener.subscription.unsubscribe();
  }, [router]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else router.push("/dashboard");
    } catch (err: any) {
      setError(err?.message ?? "Błąd logowania");
    } finally {
      setLoading(false);
    }
  };

  const register = async () => {
    setError(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else alert("Zarejestrowano. Sprawdź maila jeśli wymagane potwierdzenie.");
    } catch (err: any) {
      setError(err?.message ?? "Błąd rejestracji");
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setError(null);
    setLoading(true);
    try {
      // Twój własny URL po zalogowaniu
      const redirectTo = process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL!;
      
      // Supabase użyje swojego callbacka (/auth/v1/callback), a potem przekieruje tutaj
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });
      
      if (error) setError(error.message);
    } catch (err: any) {
      setError(err?.message ?? "Błąd logowania przez Google");
    } finally {
      setLoading(false);
    }
  };

  const signInWithGitHub = async () => {
    setError(null);
    setLoading(true);
    try {
      // Twój własny URL po zalogowaniu
      const redirectTo = process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL!;
      
      // Supabase użyje swojego callbacka (/auth/v1/callback), a potem przekieruje tutaj
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: { redirectTo },
      });
      
      if (error) setError(error.message);
    } catch (err: any) {
      setError(err?.message ?? "Błąd logowania przez GitHub");
    } finally {
      setLoading(false);
    }
  };

  const signInWithDiscord = async () => {
    setError(null);
    setLoading(true);
    try {
      // Twój własny URL po zalogowaniu
      const redirectTo = process.env.NEXT_PUBLIC_SUPABASE_REDIRECT_URL!;
      
      // Supabase użyje swojego callbacka (/auth/v1/callback), a potem przekieruje tutaj
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "discord",
        options: { redirectTo },
      });
      
      if (error) setError(error.message);
    } catch (err: any) {
      setError(err?.message ?? "Błąd logowania przez Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={login} className="w-full max-w-md border rounded p-6 shadow">
        <h1 className="text-2xl font-semibold mb-4">Sign In</h1>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            type="button"
            onClick={signInWithGoogle}
            className="flex items-center justify-center gap-2 border rounded px-3 py-2"
          >
            <GoogleLogo />
            <span>Google</span>
          </button>
          <button
            type="button"
            onClick={signInWithDiscord}
            className="flex items-center justify-center gap-2 border rounded px-3 py-2"
          >
            
            <span>Discord</span>
          </button>
          <button
            type="button"
            onClick={signInWithGitHub}
            className="flex items-center justify-center gap-2 border rounded px-3 py-2"
          >
            
            <span>GitHub</span>
          </button>
        </div>

        <hr className="my-4" />

        <label className="block mb-2 text-sm">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-3"
        />

        <label className="block mb-2 text-sm">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-3"
        />

        {error && <p className="text-red-600 mb-3">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded mb-2"
          disabled={loading}
        >
          {loading ? "Ładowanie..." : "Sign In"}
        </button>

        <div className="text-center mt-3">
          <button
            type="button"
            onClick={register}
            className="text-sm text-blue-600 underline"
          >
            Create account
          </button>
        </div>

        <div className="mt-4 text-center text-sm">
          <Link href="/">Back to home</Link>
        </div>
      </form>
    </main>
  );
}
