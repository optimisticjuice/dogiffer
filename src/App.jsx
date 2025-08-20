import { useState } from 'react'
import './Aesthic.css';
import Giffer from "./Giffer.jsx";



function App() {
  
  const [searchTerm, setSearchTerm] = useState('Thundermans');
  const [total, setTotal] = useState(10);
  const apiKey = "bZe4nEmDbpJVXOXR8z2mm6N35VCjaiKn";
  let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=${total}`;
  const [giphyUrl, setGiphyUrl] = useState(url);
  


  const handleSearch = () => {
     url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=${total}`;
    setGiphyUrl(url);
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
        <input type="number" min="1" max="25" placeholder="Gifs between 1 and 25" className="input-wrap" value={total} onChange={(e) => setTotal((parseInt(e.target.value)) || Math.min(parseInt(e.target.value),25))}/>
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
