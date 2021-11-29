import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import styles from './Tv.module.css'

export default function  Tv (){
    const router = useRouter()
    const {id} = router.query
    const [tvDetails, setTvDetails] = useState([])
    const [recommendations, setrecommendations] = useState([])
    const [personDetails, setPersonDetails] = useState([])

    const movieDetails=(id)=>{
        router.push({
          pathname: '/Tv',
          query: { id: id }
        });
    }

    useEffect(()=>{
        localStorage.setItem('id',id)
        const idl = localStorage.getItem('id')
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=df6167efabe1eb710c0a0dbe3e6b8f48`)
        .then(response => response.json())
        .then(data => setTvDetails(data));
    },[id])

    useEffect(()=>{
        
        fetch(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=df6167efabe1eb710c0a0dbe3e6b8f48`)
        .then(response => response.json())
        .then(data => setrecommendations(data.results));
    },[id])
    useEffect(()=>{

        fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=df6167efabe1eb710c0a0dbe3e6b8f48`)
        .then(response => response.json())
        .then(data => setPersonDetails(data));

    },[tvDetails])

    const castDetails=(person)=>{
        router.push({
            pathname: '/Person',
            query: { id: person.id }
          });
    }

    const castcrew = (person)=>{

        return<>
            <img src={`https://image.tmdb.org/t/p/w200${person.profile_path}`} width='130px' height='150px' className={styles.img}/>
            <p>{person.name}</p>
            <p>{person.character}</p>
        </>
    }
    
    return<div className={styles.container}>
        <Link href='/'><a><h3 style={{margin:'0'}}>Home</h3></a></Link>
        <div className={styles.section}> 
            <img src={`https://image.tmdb.org/t/p/w300${tvDetails.poster_path}`} style={{margin:'20px', borderRadius:'16px'}}/>
            <div>
                <h1>{tvDetails.original_name}<p>[{tvDetails.name}]</p></h1>
                <span style={{marginLeft:'50px'}}>-{tvDetails.tagline}</span>
                <p><strong>Release Date:</strong> {tvDetails.first_air_date}</p>
                <p><strong>English Name:</strong> {tvDetails.name}</p>
                <p><strong>Status:</strong> {tvDetails.status}</p>
                <p><strong>Rating:</strong> {tvDetails.vote_average}</p>
                <p><strong>Genres:</strong> |
                {
                        (tvDetails.genres)?.map((gen)=>{
                            return<> <span> {gen.name} </span>| </>
                        })
                }
                </p>
                <p><strong>No of Seasons:</strong> {tvDetails.number_of_seasons}</p>
                <h3>Overview :</h3>
                <p>{tvDetails.overview}</p>
                <p><strong>Created By:</strong> {tvDetails?.created_by ? tvDetails.created_by[0]?.name : ''}</p>
                
            </div>
        </div>
        <div>
            <h3>CAST</h3>
            <div className={styles.cast}>
                {
                    personDetails.cast?.map((person,i)=>{
                        return<div key={i} className={styles.card}> <a onClick={()=>castDetails(person)}> {castcrew(person)}</a></div>
                    })
                }
            </div>
        </div>
        <div>
            {
                tvDetails.seasons && <>
                <h1>Seasons</h1>
                <div className={styles.rec}>
                {
                    tvDetails.seasons.map((season,i)=>{
                        return<div key={i} className={styles.card}> 
                            <img src={`https://image.tmdb.org/t/p/w200${season.poster_path}`} width='130px' height='140px' className={styles.img}/>
                            <p>{season.name}</p>
                        </div>
                    })
                }
                </div></>
            }
        </div>

        <h3>Recommendations</h3>
        <div className={styles.rec}>
            {
                recommendations?.map((rec,i)=>{
                    return<div key={i} className={styles.card}>
                        <a onClick={()=>movieDetails(rec.id)}>
                        <img src={`https://image.tmdb.org/t/p/w200${rec.poster_path}`} width='126px' height='150px' className={styles.img}/>
                        <p>{rec.name}</p>
                        </a>
                    </div>
                })
            }
        </div>
    </div>
}