import React, { useEffect, useState } from 'react'
import Layout from '../Layout';

export default function Popular ({find}){
    const [popular, setpopular] = useState([])
    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=df6167efabe1eb710c0a0dbe3e6b8f48`)
            .then(response => response.json())
            .then(data => setpopular(data.results));
    },[])
    return<>
        {popular.length>0 && <Layout find={find} data={popular}/>}
    </>
}