import AdminLayout from '../../../components/admin/AdminLayout';
import ProgramForm from './ProgramForm';

const NewProgram = () => {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create New Program</h1>
        <p className="text-gray-600 mt-1">Create a new program</p>
      </div>
      <ProgramForm />
    </AdminLayout>
  );
};

export default NewProgram; 