import React from 'react';
import Dashboard from './pages/Dashboard';
import DocumentUpload from './components/DocumentUpload';
import DocumentSearch from './components/DocumentSearch';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4 shadow">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">SARPI AI ERP</h1>
          <p className="text-sm">Gestion Documentaire Intelligente</p>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4">
        <div className="grid grid-cols-1 gap-6">
          <Dashboard />
          <DocumentUpload />
          <DocumentSearch />
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="max-w-7xl mx-auto text-center">
          <p>© 2024 SARPI Solutions. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
