import * as WebBrowser from 'expo-web-browser';
import type { AuthError, Session, User } from '@supabase/supabase-js';
import { supabase } from './supabase';

export type AuthResult<T = void> =
  | { data: T; error: null }
  | { data: null; error: AuthError | Error };

export async function signUpWithEmail(
  email: string,
  password: string,
): Promise<AuthResult<User>> {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return { data: null, error };
  if (!data.user) return { data: null, error: new Error('Sign up succeeded but no user returned') };
  return { data: data.user, error: null };
}

export async function signInWithEmail(
  email: string,
  password: string,
): Promise<AuthResult<Session>> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { data: null, error };
  if (!data.session) return { data: null, error: new Error('Sign in succeeded but no session returned') };
  return { data: data.session, error: null };
}

export async function signInWithGoogle(): Promise<AuthResult<string>> {
  const redirectUrl = 'aethermind://auth/callback';
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: redirectUrl, skipBrowserRedirect: true },
  });
  if (error) return { data: null, error };
  if (!data.url) return { data: null, error: new Error('No OAuth URL returned') };

  const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUrl);
  if (result.type !== 'success') {
    return { data: null, error: new Error('Google sign-in cancelled or failed') };
  }

  const url = new URL(result.url);
  const accessToken = url.searchParams.get('access_token');
  const refreshToken = url.searchParams.get('refresh_token');

  if (accessToken && refreshToken) {
    await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
  }

  return { data: result.url, error: null };
}

export async function signOut(): Promise<AuthResult> {
  const { error } = await supabase.auth.signOut();
  if (error) return { data: null, error };
  return { data: undefined, error: null };
}

export async function getCurrentUser(): Promise<User | null> {
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}

export function onAuthStateChange(
  callback: (user: User | null, session: Session | null) => void,
) {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null, session);
  });
  return data.subscription;
}
