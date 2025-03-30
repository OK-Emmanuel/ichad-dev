import { useState } from 'react';

const DataTable = ({ 
  columns, 
  data = [],
  onEdit, 
  onDelete, 
  onSort,
  searchable = true,
  pagination = true,
  itemsPerPage = 10 
}) => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Ensure data is an array
  const safeData = Array.isArray(data) ? data : [];

  // Filter data based on search
  const filteredData = safeData.filter(item => 
    Object.values(item).some(value => 
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
    if (onSort) onSort(key);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Search and Filters */}
      {searchable && (
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Search..."
            className="w-full md:w-64 px-3 py-2 border rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {sortConfig.key === column.key && (
                      <i className={`ri-arrow-${sortConfig.direction === 'asc' ? 'up' : 'down'}-s-line`}></i>
                    )}
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedData.map((item, index) => (
              <tr key={item.id || index} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                    {column.render ? column.render(item) : item[column.key]}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => onEdit(item)}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                  >
                    <i className="ri-edit-line"></i>
                  </button>
                  <button
                    onClick={() => onDelete(item)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="px-4 py-3 border-t">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of{' '}
                {sortedData.length} results
              </p>
            </div>
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded ${
                    currentPage === page
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable; 