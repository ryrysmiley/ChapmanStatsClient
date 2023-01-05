import styles from '../../styles/Home.module.css'
export default function Delete() {
  const handleBasicDelete = async (event) => {
    event.preventDefault();

    const data = {
      table: event.target.Ta.value,
      id: +event.target.id.value
    }
    try{
      const res = await fetch('http://localhost:8800/deleteID', {
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
  const handleGameStat = async (event) => {
    event.preventDefault();

    const data = {
      GameID: +event.target.Gid.value,
      PlayerID: +event.target.Pid.value
    }

    const res = await fetch('http://localhost:8800/deleteGP', {
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
  }
  const handleDrillStats = async (event) => {
    event.preventDefault();
    const data = {
      DrillID: +event.target.Did.value,
      PlayerID: +event.target.Pid.value,
      PracticeDate: event.target.Pd.value
    }
    try{
      const res = await fetch('http://localhost:8800/deleteDP', {
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
      <h1>Data Deletion</h1>
      <div className={styles.container_form}>
        <h3>Delete by ID</h3>
        <form onSubmit={handleBasicDelete}>
          <label>Select Table</label>
          <select id="Ta">
            <option value="Players">
              Players
            </option>
            <option value="Games">
              Games
            </option>
            <option value="Drills">
              Drills
            </option>
          </select>
          <label>ID Number</label>
          <input id="id" type="text" pattern="\d{1,10}" required />
          <button type="Submit">Delete</button>
        </form>
      </div>
      <div className={styles.container_form}>
        <h3>Delete Game Stat</h3>
        <form onSubmit={handleGameStat}>
          <label>Game ID</label>
          <input id="Gid" type="text" pattern="\d{1,10}" required />
          <label>Player ID</label>
          <input id="Pid" type="text" pattern="\d{1,10}" required />
          <button type="Submit">Delete</button>
        </form>
      </div>
      <div className={styles.container_form}>
        <h3>Delete Drill Stat</h3>
        <form onSubmit={handleDrillStats}>
          <label>Drill ID</label>
          <input id="Did" type="text" pattern="\d{1,10}" required />
          <label>Player ID</label>
          <input id="Pid" type="text" pattern="\d{1,10}" required />
          <label>Practice Date</label>
          <input id="Pd" type="date" required/>
          <button type="Submit">Delete</button>
        </form>
      </div>
    </div>
  )
}