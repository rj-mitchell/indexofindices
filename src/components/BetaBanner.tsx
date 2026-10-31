import React, { useState } from 'react';
import { X } from 'lucide-react';
import { feedbackMailto } from '../config';

const STORAGE_KEY = 'wls-beta-banner-dismissed';

const readDismissed = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
};

export const BetaBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(readDismissed);
  if (dismissed) return null;

  const mailto = feedbackMailto();
  const dismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // Storage unavailable (private mode etc.): the banner just reappears next visit
    }
  };

  return (
    <div
      role="region"
      aria-label="Beta notice"
      className="shrink-0 bg-amber-50 border-b border-amber-200 text-amber-950 text-xs px-3 sm:px-4 py-1.5 flex items-center gap-2"
    >
      <span className="shrink-0 px-1.5 py-0.5 rounded bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider">
        Beta
      </span>
      <p className="flex-1 min-w-0 leading-snug">
        {mailto ? (
          <>
            <span className="hidden sm:inline">Where Lives Stand is still being refined. </span>
            Have a view on the data or methodology?{' '}
            <a href={mailto} className="font-semibold underline decoration-amber-400 hover:text-amber-700 whitespace-nowrap">
              Email us
            </a>
          </>
        ) : (
          'Where Lives Stand is still being refined: data and methods may change.'
        )}
      </p>
      <button
        onClick={dismiss}
        aria-label="Dismiss beta notice"
        title="Dismiss"
        className="shrink-0 p-1 rounded text-amber-700 hover:bg-amber-100 cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
