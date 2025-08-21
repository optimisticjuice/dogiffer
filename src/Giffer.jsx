import { useEffect, useState } from 'react';
import "./Aesthic.css";
import imgdone from "./assets/giffinished.png"
//  Initializing all the imports


export default function Giffer() {
    const VITE_URL = import.meta.env.VITE_URL;
    const [gifs, setGifs] = useState([]);
    const [index, setIndex] = useState(0);
    const [liked, setLiked] = useState([]);
    const [disliked, setDisliked] = useState([]);
    const [searchTerm, setSearchTerm] = useState('Thundermans');
    const [total, setTotal] = useState(10);
    const [ignore, setIgnore] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const CHANGABLE = `&q=${searchTerm}&limit=${total}`
    const url = VITE_URL + CHANGABLE;
    // initialize all the variables 👆 that need useState

    function dupliApi() {
        setIgnore(false);
        async function fetchApi() {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTPS:// Error Type ${response.status}`)
                }
                const jsondata = await response.json();

                if (!ignore) {
                    const loopty = (jsondata.data).map((n) => ({
                        id: n.id,
                        title: n.title || "untitled",
                        preview:
                            n.images.downsized_medium?.url ||
                            n.images.original?.url ||
                            n.images.downsized?.url,
                        url: n.url,
                    }));
                    setGifs(loopty);
                    setIndex(0);
                    setLiked([]);
                    setDisliked([]);
                    setError("");
                }
            } catch {
                if (!ignore)
                    setError("An error occurred while fetching the data. Please try again later.")
            } finally {
                if (!ignore)
                    setLoading(false);
            }
        }
        fetchApi();
    }

    useEffect(() => {
        setLoading(true);
        if (!url || typeof url !== "string") {
            setError("Invalid API URL! Please check the URL and try again.");
            return;
        }
        dupliApi();
        return () => {
            setIgnore(true);
        }
    }, [])

    const handleSearch = (e) => {
        e.preventDefault();
        dupliApi();
    };

    const current = gifs[index];

    function handleVote(kind) {
        if (!current) return; // no-op when deck exhausted

        if (kind === "like") setLiked((prev) => [...prev, current]);
        //? how does the gifs get placed  in the setLiked place and how does the setDisliked place the gifs
        else setDisliked((prev) => [...prev, current]);
        //? so is the current 'the current' gif the one that is being liked or disliked?

        setIndex((n) => n + 1); // advance deck pointer (top-of-stack pop)
    }

    return (
        <div className="outside">
            <h1 className="h1">Giffer</h1>
            <br />
            <form>
                <div className="input-container">
                    <b className="bSearch">Search</b>
                    <input type="text" placeholder="Search For Your Gif" className="input-wrap" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <div className="input-container">
                    <b className="nLimit">Number of Gifs</b>
                    <input type="number" min="1" max="25" placeholder="Gifs between 1 and 25" className="input-wrap" value={total} onChange={(e) => setTotal((parseInt(e.target.value)) || Math.min(parseInt(e.target.value), 25))} />
                </div>
                <button type='submit' className="button" onClick={handleSearch}>Search</button>
            </form>
            <header className="gf-header">
                <div className="gf-controls">
                    {/* Keep it display-only to honor "single source of truth" in App.jsx */}
                    <div className="ctrl">Deck: {gifs.length}</div>
                    <div className="ctrl">Index: {index}/{gifs.length || 0}</div>
                </div>
            </header>

            <aside className="gf-sidebar">
                <div className="stat"><div className="stat-label">Liked</div><div className="stat-value"> : {liked.length}</div></div>
                <div className="stat"><div className="stat-label">Disliked</div><div className="stat-value"> : {disliked.length}</div></div>
                <div className="stat"><div className="stat-label">Left</div><div className="stat-value"> : {Math.max(0, gifs.length - index)}</div></div>
            </aside>
            <section className="card">
                {current ? <img className='gif' src={current.preview} /> : <img className="gif" src={imgdone} />}
                {/* First fetch and check if the image from the gif state by using the current variable */}
            </section>
            <section className="button-container">
                <button className='thumbg' onClick={() => handleVote("like")}> like 👍</button>
                <button className='thumbr' onClick={() => handleVote("dislike")}>dislike 👎</button>
            </section>

            <section className="results">
                <div className="bucket">
                    <h3>Liked</h3>
                    <div className="thumbs">
                        {liked.map((gif) => (
                            <img key={gif.id} src={gif.preview} className='gifimg' alt={gif.title} />
                        ))}
                    </div>
                </div>
                <div className="bucket">
                    <h3>Disliked</h3>
                    <div className="thumbs">
                        {disliked.map((gif) => (
                            <img key={gif.id} src={gif.preview} className="gifimg" alt={gif.title} />
                        ))}
                    </div>
                </div>
                {error && <div>{error}</div>}
                {loading && <div>Loading...</div>}
            </section>
        </div>
    )


}