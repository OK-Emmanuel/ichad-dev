import React from 'react';

const EmptyState = ({ 
  title = 'No Content Found', 
  message = 'There are no items to display at the moment.', 
  icon = 'ri-inbox-line',
  action = null 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-gray-400 mb-4">
        <i className={`${icon} text-6xl`}></i>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-500 text-center max-w-sm mb-6">
        {message}
      </p>
      {action && (
        <div className="mt-2">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState; 