// The frame for text pages: a kicker in small capitals, the title, then the text in Source Serif.
import React from 'react';

export const Page: React.FC<{ title: string; kicker?: string; children: React.ReactNode }> = ({ title, kicker, children }) => (
  <article className="max-w-page mx-auto px-4 md:px-8 pt-8 md:pt-12">
    {kicker && <p className="caps text-gilt-text">{kicker}</p>}
    <h1 id="page-title" tabIndex={-1} className="text-3xl md:text-[2.75rem] md:leading-[3rem] mt-1 outline-none">
      {title}
    </h1>
    <div className="prose-page mt-6">{children}</div>
  </article>
);
