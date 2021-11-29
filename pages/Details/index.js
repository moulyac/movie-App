import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link  from 'next/link'
import styles from './Details.module.css'

export default function Details (){
    const router = useRouter()
    const [details, setDetails] = useState([])
    const [personDetails, setPersonDetails] = useState([])
    const [recommendations, setrecommendations] = useState([])
    const {id} = router.query

    const movieDetails=(id)=>{
        router.push({
          pathname: '/Details',
          query: { id: id }
        });
    }

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=df6167efabe1eb710c0a0dbe3e6b8f48`)
        .then(response => response.json())
        .then(data => setDetails(data));
    },[id])

    useEffect(()=>{
        
        fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=df6167efabe1eb710c0a0dbe3e6b8f48`)
        .then(response => response.json())
        .then(data => setrecommendations(data.results));
    },[id])

    useEffect(()=>{

        fetch(`https://api.themoviedb.org/3/movie/${details.id}/credits?api_key=df6167efabe1eb710c0a0dbe3e6b8f48`)
        .then(response => response.json())
        .then(data => setPersonDetails(data));

    },[details])

    const castDetails=(person)=>{
        router.push({
            pathname: '/Person',
            query: { id: person.id }
          });
    }

    const castcrew = (person)=>{

        return<>
            <img src={`https://image.tmdb.org/t/p/w200${person.profile_path}`} width='126px' height='150px' className={styles.img}/>
            <p>{person.name}</p>
            <p>{person.character}</p>
        </>
    }
    return<div className={styles.container}> 
        <Link href='/'><a><h3 style={{margin:'0'}}>Home</h3></a></Link>

    <div className={styles.section}>
        <img src={`https://image.tmdb.org/t/p/w300${details.poster_path}`} style={{margin:'20px', borderRadius:'16px'}}/>
        <div>
            <h1>{details.original_title}<p>[{details.title}]</p></h1>
            <h3>Release Date: </h3><span>{details.release_date}</span>
            <h3>Rating:</h3> <span>{details.vote_average}</span>
            <h3>Genres: | 
            {
                    (details.genres)?.map((gen,i)=>{
                        return <><span key={i}> {gen.name}</span> | </>
                    })
            }
            </h3>
            <h3>Overview :</h3>
            <p>{details.overview}</p>
        </div>
    </div>
    <div className={styles.cast}>
        {
            personDetails.cast?.map((person,i)=>{
                return<div key={i} className={styles.card}> <a onClick={()=>castDetails(person)}> {castcrew(person)}</a></div>
            })
        }
    </div>

    <h3>Recommendations</h3>
    <div className={styles.rec}>
        {recommendations ?
           <>{ recommendations.map((rec,i)=>{
                return<div  key={i} className={styles.card}>
                    <a onClick={()=>movieDetails(rec.id)}>
                    <img src={`https://image.tmdb.org/t/p/w200${rec.poster_path}`} width='126px' height='150px' className={styles.img}/>
                    <p>{rec.original_title}</p>
                    </a>
                </div>
            })}
        </>: 'We dont have enough data to suggest any recommendations'
        }
    </div>

    </div>
}