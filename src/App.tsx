import React, { useState } from 'react';
import { Header } from './components/Header';
import { ClassicLayout } from './components/layouts/ClassicLayout';
import { ModernLayout } from './components/layouts/ModernLayout';

export default function App() {
  const [layout, setLayout] = useState<'classic' | 'modern'>('classic');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header layout={layout} onLayoutChange={setLayout} />
      {layout === 'classic' ? <ClassicLayout /> : <ModernLayout />}
    </div>
  );
}