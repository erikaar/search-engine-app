import React, { useState } from 'react';

function SearchEngine() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Results[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://api.openalex.org/authors?search=${searchQuery}`);
      const data = await response.json();
      if (response.ok) {
        const { results } = data;
        setResults(results);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Author Search</h2>
      <form onSubmit={handleSearchSubmit}>
        <input type="text" value={searchQuery} onChange={handleSearchChange} />
        <button type="submit">Search</button>
      </form>
      <ul>
        {results && results.map((res) => (
          <li key={res.id}>
            <a href={res.id} target="_blank" rel="noopener noreferrer">
              {res.display_name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchEngine;
