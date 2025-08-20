import { useEffect ,useState } from 'react';
import "./Aesthic.css";
//  Initializing all the imports


export default function Giffer({gifApi}){

    const [gifs, setGifs] = useState([]);
    const [index, setIndex] = useState(0);
    const [liked, setLiked] = useState([]);
    const [disliked, setDisliked] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState("");
    // initialize all the variables 👆 that need useState

    useEffect(() => {
        if(!gifApi || typeof gifApi !== "string"){
            setError("Invalid API URL! Please check the URL and try again.")
            return;
        }
        
        let ignore = false;
        

        
    },[])


    return(
        <>
        
        </>
    )


}