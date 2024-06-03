import React, { useState, useEffect } from 'react'

const AvailableBooks = () => {
  const [allBooks, setAllBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const fetchAllBooks = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}books/get_all_books`);
      const data = await response.json();
      setAllBooks(data.results);
    } catch (error) {
      console.log(error);
      setError('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const groupByCategory = (books) => {
    return books.reduce((acc, book) => {
      const { category } = book;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(book);
      return acc;
    }, {});
  };

  const getUniqueCategories = (books) => {
    const categories = books.map(book => book.category);
    return ['All', ...new Set(categories)];
  };

  const categorizedBooks = groupByCategory(allBooks);
  const categories = getUniqueCategories(allBooks);

  const filteredBooks = selectedCategory === 'All' 
    ? allBooks 
    : categorizedBooks[selectedCategory] || [];

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="container mx-auto py-2">
      <div className="py-5 flex flex-wrap justify-center gap-3">
        {categories.map(category => (
          <button 
            key={category} 
            className={`category-button bg-gray-200 rounded-lg text-sm p-2 ${selectedCategory === category ? 'bg-gray-500 text-white' : ''}`} 
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-3">
        {filteredBooks.map(book => (
          <div key={book.id} className="border rounded-lg shadow-lg overflow-hidden">
            <img src={`${process.env.REACT_APP_BACKEND_URL}${book.image}`} alt={book.title} className="w-full h-56 object-cover" />
            <div className="p-4">
              <h3 className="book-title dark:text-white font-bold text-lg mb-2">{book.title}</h3>
              <p className="book-author dark:text-white text-gray-600">{book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AvailableBooks
