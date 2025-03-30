import AdminLayout from '../../../components/admin/AdminLayout';
import UserForm from './UserForm';

const NewUser = () => {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create New User</h1>
        <p className="text-gray-600 mt-1">Add a new administrator account</p>
      </div>
      <UserForm />
    </AdminLayout>
  );
};

export default NewUser; 