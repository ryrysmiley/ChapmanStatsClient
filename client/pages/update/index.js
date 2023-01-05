import styles from '../../styles/Home.module.css'
export default function Update() {
  const handlePlayer = async (event) => {
    event.preventDefault();

    const data = {
      PlayerID: +event.target.Pid.value,
      FirstName: event.target.Fn.value,
      LastName: event.target.Ln.value,
      Position: event.target.Po.value,
      GradYear: +event.target.Gy.value
    }
    try{
      const res = await fetch('http://localhost:8800/updatePlayer', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const json = await res.json()
      alert(json)
      event.target.reset()
    }catch(err){
      console.log(err)
    }
  }
  const handleGame = async (event) =>{
    event.preventDefault();

    const data = {
      GameID: +event.target.Gid.value,
      OpponentName: event.target.On.value,
      ChapmanScore: +event.target.Cs.value,
      OpponentScore: +event.target.Os.value,
      GameDate: event.target.Gd.value
    }
    try{
      const res = await fetch('http://localhost:8800/updateGame', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const json = await res.json()
      alert(json)
      event.target.reset()
    }catch(err){
      console.log(err)
    }
  }
  const handleDrill = async (event) =>{
    event.preventDefault();

    const data = {
      DrillID: +event.target.Did.value,
      DrillName: event.target.Dn.value,
      Description: event.target.De.value
    }
    try{
      const res = await fetch('http://localhost:8800/updateDrill', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const json = await res.json()
      alert(json)
      event.target.reset()
    }catch(err){
      console.log(err)
    }
  }
  const handleGameStats = async (event) =>{
    event.preventDefault()

    const data = {
        GameID: +event.target.Gid.value,
        PlayerID: +event.target.Pid.value,
        Points: +event.target.Pts.value,
        Blocks: +event.target.Bl.value,
        Deflections: +event.target.Df.value,
        Assists: +event.target.As.value,
        Steals: +event.target.St.value,
        O_Rebounds: +event.target.Or.value,
        D_Rebounds: +event.target.Dr.value,
        Turnovers: +event.target.To.value
    }
    try{
      const res = await fetch('http://localhost:8800/updateGameStats', {
          method: 'POST',
          mode: 'cors',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })

      const json = await res.json()
      alert(json)
      event.target.reset()
    }catch(err){
      console.log(err)
    }
  }
  const handleDrillStats = async (event) =>{
    event.preventDefault()

    const data = {
        DrillID: +event.target.Did.value,
        PlayerID: +event.target.Pid.value,
        PracticeDate: event.target.Pd.value,
        Points: +event.target.Pts.value,
        Blocks: +event.target.Bl.value,
        Deflections: +event.target.Df.value,
        Assists: +event.target.As.value,
        Steals: +event.target.St.value,
        O_Rebounds: +event.target.Or.value,
        D_Rebounds: +event.target.Dr.value,
        Turnovers: +event.target.To.value,
        Assist_opp: +event.target.Ao.value,
        Points_Allowed: +event.target.Pa.value,
        Rotation: +event.target.Ro.value
    }
    try{
      const res = await fetch('http://localhost:8800/UpdateDrillStats', {
          method: 'POST',
          mode: 'cors',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })

      const json = await res.json()
      alert(json)
      event.target.reset()
    }catch(err){
      console.log(err)
    }
}
  return (
    <div className={styles.container}>
      <h1>Update Records</h1>
      <div className={styles.container_form}>
        <h3>Player Table using ID</h3>
        <form onSubmit={handlePlayer}>
          <label>Player ID</label>
          <input id="Pid" type="text" pattern="\d{1,10}" required/>
          <label>First Name</label>
          <input id="Fn" type="text" pattern="[A-Za-z]{1,20}" required />
          <label>Last Name</label>
          <input id="Ln" type="text" pattern="[A-Za-z]{1,25}" required />
          <label>Position</label>
          <input id="Po" type="text" pattern="[A-Za-z]{1,10}" required />
          <label>Graduation Year</label>
          <input id="Gy" type="text" pattern="\d{4}" required />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className={styles.container_form}>
        <h3>Game Table using ID</h3>
        <form onSubmit={handleGame}>
          <label>Game ID</label>
          <input id="Gid" type="text" pattern="\d{1,10}" required />
          <label>Opponent Name</label>
          <input id="On" type="text" pattern="[A-Za-z ]{1,30}" required />
          <label>Chapman Score</label>
          <input id="Cs" type="text" pattern="\d{2,3}" required />
          <label>Opponent Score</label>
          <input id="Os" type="text" pattern="\d{2,3}" required />
          <label>Game Date</label>
          <input id="Gd" type="date" required />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className={styles.container_form}>
        <h3>Drill Table using ID</h3>
        <form onSubmit={handleDrill}>
          <label>Drill ID</label>
          <input id="Did" type="text" pattern="\d{1,10}" required />
          <label>Drill Name</label>
          <input id="Dn" type="text" pattern="[A-Za-z0-9 ]{1,25}" required />
          <label>Description</label>
          <input id="De" type="text" pattern="[A-Za-z0-9 .]{1,255}" required />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className={styles.container_form}>
        <h3>Game Stats Table using Game ID & Player ID</h3>
        <form onSubmit={handleGameStats}>
          <label>Game ID</label>
          <input id="Gid" type="text" pattern="\d{1,10}" required />
          <label>Player ID</label>
          <input id="Pid" type="text" pattern="\d{1,10}" required />
          <label>Points</label>
          <input id="Pts" type="text" pattern="\d{1,3}" required />
          <label>Blocks</label>
          <input id="Bl" type="text" pattern="\d{1,3}" required />
          <label>Deflections</label>
          <input id="Df" type="text" pattern="\d{1,3}" required />
          <label>Assists</label>
          <input id="As" type="text" pattern="\d{1,3}" required />
          <label>Steals</label>
          <input id="St" type="text" pattern="\d{1,3}" required />
          <label>Offensive Rebounds</label>
          <input id="Or" type="text" pattern="\d{1,3}" required />
          <label>Defensive Rebounds</label>
          <input id="Dr" type="text" pattern="\d{1,3}" required />
          <label>Turnovers</label>
          <input id="To" type="text" pattern="\d{1,3}" required />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className={styles.container_form}>
        <h3>Drill Stats Table using IDs and Practice Date</h3>
        <form onSubmit={handleDrillStats}>
          <label>Drill ID</label>
          <input id="Did" type="text" pattern="\d{1,10}" required />
          <label>Player ID</label>
          <input id="Pid" type="text" pattern="\d{1,10}" required />
          <label>Practice Date</label>
          <input id="Pd" type="date" required />
          <label>Points</label>
          <input id="Pts" type="text" pattern="\d{1,3}" required />
          <label>Blocks</label>
          <input id="Bl" type="text" pattern="\d{1,3}" required />
          <label>Deflections</label>
          <input id="Df" type="text" pattern="\d{1,3}" required />
          <label>Assists</label>
          <input id="As" type="text" pattern="\d{1,3}" required />
          <label>Steals</label>
          <input id="St" type="text" pattern="\d{1,3}" required />
          <label>Offensive Rebounds</label>
          <input id="Or" type="text" pattern="\d{1,3}" required />
          <label>Defensive Rebounds</label>
          <input id="Dr" type="text" pattern="\d{1,3}" required />
          <label>Turnovers</label>
          <input id="To" type="text" pattern="\d{1,3}" required />
          <label>Assist Opportunities</label>
          <input id="Ao" type="text" pattern="\d{1,3}" required />
          <label>Points Allowed</label>
          <input id="Pa" type="text" pattern="\d{1,3}" required />
          <label>Rotations</label>
          <input id="Ro" type="text" pattern="\d{1,3}" required />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}