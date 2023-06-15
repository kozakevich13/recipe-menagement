import React from "react";

interface SearchBarProps {
  handleSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleSearch }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    handleSearch(query);
  };

  return (
    <input
      type="text"
      placeholder="Search recipes..."
      onChange={handleChange}
      className="search-input"
    />
  );
};

export default SearchBar;
