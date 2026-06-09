import { useAccessibility } from '../contexts/AccessibilityContext.jsx';

export default function AccessibilityToggle() {
  const { largeText, setLargeText, highContrast, setHighContrast } = useAccessibility();
  return (
    <div className="flex flex-wrap gap-2" aria-label="Accessibility controls">
      <button className="rounded-md border px-3 py-2 text-sm focus-ring" onClick={() => setLargeText(!largeText)} aria-pressed={largeText}>
        Large text
      </button>
      <button className="rounded-md border px-3 py-2 text-sm focus-ring" onClick={() => setHighContrast(!highContrast)} aria-pressed={highContrast}>
        High contrast
      </button>
    </div>
  );
}
