import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await fetch('/api/dashboard/summary?project_id=1');
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-4">Chargement...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Dashboard Projet</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded">
          <h3 className="font-bold">Documents</h3>
          <p className="text-2xl">{summary?.total_documents || 0}</p>
        </div>
        <div className="bg-green-100 p-4 rounded">
          <h3 className="font-bold">Disciplines</h3>
          <p className="text-2xl">{summary?.by_discipline?.length || 0}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded">
          <h3 className="font-bold">Statuts</h3>
          <p className="text-2xl">{summary?.by_status?.length || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
