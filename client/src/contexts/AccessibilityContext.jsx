import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AccessibilityContext = createContext(null);

export function AccessibilityProvider({ children }) {
  const [largeText, setLargeText] = useState(localStorage.getItem('largeText') === 'true');
  const [highContrast, setHighContrast] = useState(localStorage.getItem('highContrast') === 'true');

  useEffect(() => {
    document.documentElement.classList.toggle('large-text', largeText);
    document.documentElement.classList.toggle('high-contrast', highContrast);
    localStorage.setItem('largeText', largeText);
    localStorage.setItem('highContrast', highContrast);
  }, [largeText, highContrast]);

  const value = useMemo(() => ({ largeText, setLargeText, highContrast, setHighContrast }), [largeText, highContrast]);
  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
}

export const useAccessibility = () => useContext(AccessibilityContext);
