
import React from 'react';
import { MemoryRouter, Routes, Route, Link as RouterLink, useParams } from 'react-router-dom';

const CustomLink = ({ to, onNavigate, children }: { to: string, onNavigate: (to: string) => void, children: React.ReactNode }) => (
    <RouterLink to={to} onClick={(e) => { e.preventDefault(); onNavigate(to); }}>
        {children}
    </RouterLink>
);

const ArticleList = ({ onNavigate }: { onNavigate: (to: string) => void }) => (
  <div>
    <h2>Articles</h2>
    <ul>
      <li>
        <CustomLink to="/article-1" onNavigate={onNavigate}>Article 1</CustomLink>
      </li>
      <li>
        <CustomLink to="/article-2" onNavigate={onNavigate}>Article 2</CustomLink>
      </li>
    </ul>
    <p>This is a React sub-router running inside an Angular application.</p>
  </div>
);

const ArticleDetail = () => {
  const { id } = useParams();
  return (
    <div>
        <h2>Article Detail</h2>
        <p>Article ID: {id}</p>
    </div>
  );
};


export function ArticlesComponent({ path, onNavigate }: { path: string; onNavigate: (to: string) => void; }) {
  return (
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/" element={<ArticleList onNavigate={onNavigate} />} />
        <Route path="/:id" element={<ArticleDetail />} />
      </Routes>
    </MemoryRouter>
  );
}
