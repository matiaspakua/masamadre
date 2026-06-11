'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { getContent, type Lang, type SiteContent } from './content';

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  c: SiteContent;
};

const LangContext = createContext<Ctx | null>(null);

// Spanish is the default. The choice is remembered in localStorage and
// reflected on <html lang> so the page stays correct on reload and for
// assistive tech.
export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es');

  useEffect(() => {
    const saved = window.localStorage.getItem('mm-lang');
    if (saved === 'en' || saved === 'es') setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem('mm-lang', lang);
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);
  const toggle = () => setLangState((p) => (p === 'es' ? 'en' : 'es'));

  return (
    <LangContext.Provider value={{ lang, setLang, toggle, c: getContent(lang) }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}

// Convenience: just the resolved content for the active language.
export function useContent(): SiteContent {
  return useLang().c;
}
