import React from 'react'
import styles from './Layout.module.css'
import { useRouter } from 'next/router';

export default function Layout({data}){
    const router = useRouter();

    const detailsId=(pop)=>{
        if(pop.media_type === 'movie'){
            router.push({
            pathname: '/Details',
            query: { id: pop.id }
            });
        }
        else if(pop.media_type === 'tv'){
            router.push({
                pathname: '/Tv',
                query: { id: pop.id }
            });
        }
        else if(pop.media_type === 'person'){
            router.push({
                pathname:'/Person',
                query:{id:pop.id}
            })
        }
    }

    return<div className={styles.container}>
        {
            data.map((pop,i)=>{
                return<div className={styles.card} key={i}>
                    <a onClick={()=>detailsId(pop)}>
                    <img src={`https://image.tmdb.org/t/p/w200${pop.poster_path || pop.profile_path}`}  className={styles.imageBorder}/>
                    <h5>{ pop.name || pop.original_title || pop.original_name}</h5>
                    <p>{pop.first_air_date || pop.release_date}</p>
                    </a>
                </div>
            })
        }
    </div>
}