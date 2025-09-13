import React from 'react';
import { MemoryRouter, Routes, Route, Link as RouterLink, useParams } from 'react-router-dom';

type CustomLinkProps = {
  to: string;
  onNavigate: (to: string) => void;
  children: React.ReactNode;
};

const CustomLink = ({ to, onNavigate, children }: CustomLinkProps) => (
  <RouterLink
    to={to}
    onClick={(e) => {
      e.preventDefault();
      onNavigate(to);
    }}
  >
    {children}
  </RouterLink>
);

type ArticleListProps = {
  onNavigate: (to: string) => void;
};

const ArticleList = ({ onNavigate }: ArticleListProps) => (
  <div>
    <h2>Articles</h2>
    <ul>
      <li>
        <CustomLink to="/article-1" onNavigate={onNavigate}>
          Article 1
        </CustomLink>
      </li>
      <li>
        <CustomLink to="/article-2" onNavigate={onNavigate}>
          Article 2
        </CustomLink>
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

type ArticlesComponentProps = {
  path: string;
  onNavigate: (to: string) => void;
};

export function ArticlesComponent({ path, onNavigate }: ArticlesComponentProps) {
  return (
    <MemoryRouter initialEntries={[path]} basename="/articles">
      <Routes>
        <Route path="/" element={<ArticleList onNavigate={onNavigate} />} />
        <Route path="/:id" element={<ArticleDetail />} />
      </Routes>
    </MemoryRouter>
  );
}
