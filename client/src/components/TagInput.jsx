import { useState, useEffect } from 'react';

const TagInput = ({ value = '', onChange }) => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Initialize tags from value prop (comma-separated string)
    if (value) {
      setTags(value.split(',').map(tag => tag.trim()).filter(Boolean));
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      // Remove last tag when backspace is pressed and input is empty
      removeTag(tags.length - 1);
    }
  };

  const addTag = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !tags.includes(trimmedValue)) {
      const newTags = [...tags, trimmedValue];
      setTags(newTags);
      setInputValue('');
      // Notify parent component
      onChange(newTags.join(', '));
    }
  };

  const removeTag = (indexToRemove) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(newTags);
    // Notify parent component
    onChange(newTags.join(', '));
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg min-h-[42px]">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="ml-2 text-primary hover:text-primary-dark"
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          className="flex-grow outline-none min-w-[120px] bg-transparent"
          placeholder={tags.length === 0 ? "Enter tags separated by comma" : ""}
        />
      </div>
      <p className="mt-1 text-sm text-gray-500">
        Press enter or comma to add a tag
      </p>
    </div>
  );
};

export default TagInput; 