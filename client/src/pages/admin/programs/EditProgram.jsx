import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminLayout from '../../../components/admin/AdminLayout';
import ProgramForm from './ProgramForm';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { programs } from '../../../services/api';

const EditProgram = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgram();
  }, [id]);

  const fetchProgram = async () => {
    try {
      const response = await programs.getAll();
      const foundProgram = response.data.data.find(p => p._id === id);
      
      if (!foundProgram) {
        throw new Error('Program not found');
      }

      setProgram(foundProgram);
    } catch (error) {
      console.error('Error fetching program:', error);
      toast.error('Failed to fetch program');
      navigate('/admin/programs');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <AdminLayout>
      <div className="flex justify-center py-8">
        <LoadingSpinner />
      </div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Program</h1>
        <p className="text-gray-600 mt-1">Update your program</p>
      </div>
      <ProgramForm program={program} />
    </AdminLayout>
  );
};

export default EditProgram; 