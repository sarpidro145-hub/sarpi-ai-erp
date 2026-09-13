import React, { useState } from 'react';

const DocumentSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearching(true);

    try {
      const response = await fetch(
        `/api/search/documents?q=${encodeURIComponent(query)}&project_id=1`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Rechercher Documents</h2>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Entrez votre recherche..."
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            disabled={searching}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {searching ? 'Recherche...' : 'Rechercher'}
          </button>
        </div>
      </form>

      <div className="mt-6">
        {results.length > 0 ? (
          <div>
            <h3 className="font-bold mb-2">Résultats ({results.length})</h3>
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Titre</th>
                  <th className="border p-2 text-left">Numéro</th>
                  <th className="border p-2 text-left">Discipline</th>
                  <th className="border p-2 text-left">Révision</th>
                </tr>
              </thead>
              <tbody>
                {results.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="border p-2">{doc.document_title}</td>
                    <td className="border p-2">{doc.document_number}</td>
                    <td className="border p-2">{doc.discipline}</td>
                    <td className="border p-2">{doc.revision}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          query && !searching && (
            <p className="text-gray-500">Aucun résultat trouvé</p>
          )
        )}
      </div>
    </div>
  );
};

export default DocumentSearch;
