import Link from 'next/link'
import { useState } from 'react'
import Layout from '../components/Layout'
import Popular from '../components/Popular'
import Search  from '../components/Search'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [searchResult, setsearchResult] = useState([])
  const HandleSearchResult=(obj)=>{
    if(obj){
      setsearchResult(obj)
    }
  }

  const detailsId=(id)=>{

    router.push({
      pathname: '/id',
      query: { id: id }
    });
  }
  
  return (
    <div className={styles.container}>

      <div className={styles.flex}>
        <Link href='/'><a><h1 className={styles.title}>All about Movies</h1></a></Link>
        <Search outcome={HandleSearchResult}/>
      </div>
      <Layout data={searchResult} find={detailsId}/>
      <h1 className={styles.heading}>Treanding</h1>
      <Popular find={detailsId}/>
    </div>
  )
}
