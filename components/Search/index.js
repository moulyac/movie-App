import React, { useEffect, useState } from 'react'
import styles from './Search.module.css'

export default function Search({outcome}){
    const [text, setText] = useState('')
    const [searchInput, setSearch] = useState('')

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/search/multi?api_key=df6167efabe1eb710c0a0dbe3e6b8f48&query=${searchInput}`)
            .then(response => response.json())
            .then(data => outcome(data.results));
    },[searchInput])

    const handleKeyPress = (e) => {
        if(e.charCode == 13){
            handleSearchInput()
        }
    }
    const handleChange = (e)=>{
        setText(e.target.value)
    }

    const handleSearchInput = ()=>{
        setSearch(text)
    }
    return <div>
        <input type='text' value={text} onChange={handleChange} onKeyPress={(e)=>handleKeyPress(e)} className={styles.input} />
        <button onClick={handleSearchInput} className={styles.btn}>search</button>
    </div>
}