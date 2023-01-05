import styles from '../styles/Home.module.css'
//each table will take up an equal amount of space to show record count
export default function Home(data) {
  return (
    <div className={styles.container}>
      <h1>Overall Storage</h1>
      <h3 className={styles.tablespace}>Players</h3>
      <p><span className={styles.count}>{data.playerCount}</span> players stored in the database</p>
      <h3>Games</h3>
      <p><span className={styles.count}>{data.GameCount}</span> games stored in the database</p>
      <h3>Drills</h3>
      <p><span className={styles.count}>{data.DrillCount}</span> drills stored in the database</p>
      <h3>Game Stats</h3>
      <p><span className={styles.count}>{data.gStatCount}</span> individual player game stats stored in the database</p>
      <h3>Drill Stats</h3>
      <p><span className={styles.count}>{data.dStatCount}</span> individual player drill stats stored in the database</p>
    </div>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const data = {}
  try{
    const playerRes = await fetch(`http://localhost:8800/count/Players`)
    let temp = await playerRes.json()
    data['playerCount'] = temp[0]['COUNT(*)']
    const gameRes = await fetch(`http://localhost:8800/count/Games`)
    temp = await gameRes.json()
    data['GameCount'] = temp[0]['COUNT(*)']
    const drillRes = await fetch(`http://localhost:8800/count/Drills`)
    temp = await drillRes.json()
    data['DrillCount'] = temp[0]['COUNT(*)']
    const gStatRes = await fetch(`http://localhost:8800/count/Games_Players`)
    temp = await gStatRes.json()
    data['gStatCount'] = temp[0]['COUNT(*)']
    const dStatRes = await fetch(`http://localhost:8800/count/Drills_Players`)
    temp = await dStatRes.json()
    data['dStatCount'] = temp[0]['COUNT(*)']

    // Pass data to the page via props
  }catch(err){
    console.log(err)
  }
  return { props: data }
}
