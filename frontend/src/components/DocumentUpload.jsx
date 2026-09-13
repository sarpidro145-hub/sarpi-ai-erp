import React, { useState } from 'react';

const DocumentUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData();
    for (let file of files) {
      formData.append('files', file);
    }
    formData.append('project_id', '1');

    try {
      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setMessage('Documents uploadés avec succès!');
      setFiles([]);
    } catch (error) {
      setMessage('Erreur lors de l\'upload');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Upload Documents</h2>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="mb-4 p-2 border rounded"
          accept=".pdf,.doc,.docx,.xls,.xlsx"
        />
        <button
          type="submit"
          disabled={uploading || files.length === 0}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {uploading ? 'Upload en cours...' : 'Upload'}
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default DocumentUpload;
