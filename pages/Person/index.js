import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import styles from './Person.module.css'

export default function Actor (){
    const router = useRouter()
    const {id} = router.query

    const [data, setActorDetails] = useState([])

    useEffect(()=>{
        localStorage.setItem('id',id)
        const idl = localStorage.getItem('id')
        fetch(`https://api.themoviedb.org/3/person/${id}?api_key=df6167efabe1eb710c0a0dbe3e6b8f48`)
        .then(response => response.json())
        .then(data => setActorDetails(data));
    },[id])
    
    console.log('person',data)
    return <div className={styles.container}>
        <Link href='/'><a><h3 style={{margin:'0'}}>Home</h3></a></Link>
        <div className={styles.section}>
            <img src={`https://image.tmdb.org/t/p/w300${data.profile_path}`} style={{margin:'20px', borderRadius:'16px'}}/>
            <div>
                <h1>{data.name}</h1>
                {
                    data?.also_known_as?.length ? 
                    <>
                        <h3>Also knows as</h3>
                        <p>{ data?.also_known_as?.length ? data.also_known_as[0]: '' }</p>
                    </>: null
                }
                {
                    data.biography?
                    <>
                        <h3>Biography</h3>
                        <p>{data.biography}</p>
                </>: null
                }
                <h3>Know for </h3>
                <p>{data.known_for_department}</p>
                <h3>Birthday</h3>
                <p>{data.birthday}</p>
                <h3>Birth Place</h3>
                <p>{data.place_of_birth}</p>
                
                
            </div>
        </div>

    </div>
}