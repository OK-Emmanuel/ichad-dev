import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminLayout from '../../../components/admin/AdminLayout';
import ProgramForm from './ProgramForm';
import { programs } from '../../../services/api';
import axios from 'axios';

const NewProgram = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    e.preventDefault();
    
    if (isSubmitting) return; // Prevent multiple submissions
    
    setIsSubmitting(true);
    
    try {
      setLoading(true);
      console.log('Submitting program data:', formData);
      
      // Try a direct axios call to test the endpoint
      const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      console.log('Testing direct API call to:', `${baseURL}/programs`);
      
      const data = new FormData();
      data.append('title', formData.title);
      data.append('summary', formData.summary);
      data.append('content', formData.content);
      data.append('status', formData.status);
      
      if (formData.coverImage) {
        data.append('coverImage', formData.coverImage);
      }
      
      // First try the test endpoint
      try {
        const testResponse = await axios.get(`${baseURL}/test`);
        console.log('Test endpoint response:', testResponse.data);
      } catch (testError) {
        console.error('Test endpoint failed:', testError);
      }
      
      // Then try the programs endpoint
      const response = await programs.create(data);
      console.log('Program created:', response.data);
      
      toast.success('Program created successfully');
      navigate('/admin/programs');
    } catch (error) {
      console.error('Error creating program:', error);
      toast.error('Failed to create program');
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Create New Program</h1>
        <ProgramForm onSubmit={handleSubmit} loading={loading} />
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`btn btn-primary ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Creating...' : 'Create Program'}
        </button>
      </div>
    </AdminLayout>
  );
};

export default NewProgram; 