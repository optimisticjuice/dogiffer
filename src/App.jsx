import { useState } from 'react'
import './Aesthic.css';
import Giffer from "./Giffer.jsx";



function App() {
  const [searchTerm, setSearchTerm] = useState('Thundermans');
  const [total, setTotal] = useState(10);
  const [giphyUrl, setGiphyUrl] = useState('');
  
  const apiKey = "bZe4nEmDbpJVXOXR8z2mm6N35VCjaiKn";


  const handleSearch = () => {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=${total}`;
    setGiphyUrl(url);
    console.log('Searching with URL:', url);
  };

  return (
    <div className="container">
      <h1 className="h1">Giffer</h1>
      <br/>
      <div className="input-container">
        <b className="bSearch">Search</b>
        <input type="text" placeholder="Search For Your Gif" className="input-wrap" value={searchTerm}  onChange={(e) => setSearchTerm(e.target.value)}/>
      </div>
      <div className="input-container">
        <b className="nLimit">Number of Gifs</b>
        <input type="number" placeholder="Number of Gifs" className="input-wrap" value={total} onChange={(e) => setTotal(e.target.value)}/>
      </div>
      <ButtonCall onSearch={handleSearch} />
      <Giffer gifApi={giphyUrl} />
    </div>
  )
}

function ButtonCall({ onSearch }) {  
  return (
    <button className="button" onClick={onSearch}>Search</button>
  )
}

export default App
