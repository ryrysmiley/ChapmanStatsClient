import styles from '../../styles/Home.module.css'
import { useState } from 'react'
export default function Viewing(){
    const [component, setComponent] = useState('default');
    const [table, setTable] = useState([]);
    const [tableHeaders, setTableHeaders] = useState('Data Retrieval');
    //function for general select
    async function handleFullSelect(event){
        event.preventDefault();
        try{
            let table = event.target.St.value;
            let url = `http://localhost:8800/${table}`;
            const res = await fetch(url)
            const data = await res.json()
            setTable(data);
            setComponent(`Select${table}`);
            setTableHeaders(`${table} Results`);
        }catch(err){
            console.log(err)
        }
    }

    //function players between gradyear
    async function handlePlayersBetweenGradYear(event){
        event.preventDefault();
        try{
            let url = `http://localhost:8800/Players/${event.target.start.value}-${event.target.end.value}`;
            const res = await fetch(url)
            const data = await res.json()
            setTable(data);
            setComponent('SelectPlayers');
            setTableHeaders(`Players between ${event.target.start.value} and ${event.target.end.value}`);
        }catch(err){
            console.log(err)
        }
    }

    //function for games between dates
    async function handleGamesBetweenDates(event){
        try{
        event.preventDefault();
            let url = `http://localhost:8800/Games/${event.target.start.value}/${event.target.end.value}`;
            const res = await fetch(url)
            const data = await res.json()
            setTable(data);
            setComponent('SelectGames');
            setTableHeaders(`Games between ${event.target.start.value} and ${event.target.end.value}`);
        }catch(err){
            console.log(err)
        }
    }
    //handle players' stats for single game
    async function handlePlayersStatsForSingleGame(event){
        try{
            event.preventDefault();
            let url = `http://localhost:8800/GameStats/${event.target.id.value}`;
            const res = await fetch(url)
            const data = await res.json()
            setTable(data);
            setComponent('SelectGames_Players');
            setTableHeaders(`Players' stats for game ${event.target.gameID.value}`);
        }catch(err){
            console.log(err)
        }
    }
    //subquery request
    async function handleSubquery(event){
        event.preventDefault();
        try{
            let url = `http://localhost:8800/subquery/comparison`
            const res = await fetch(url,{
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "type": event.target.symbol.value })
            })
            const data = await res.json()
            setTable(data);
            setComponent('SelectGames');
            setTableHeaders(`Games with more points than Chapman average`);
        }catch(err){
            console.log(err)
        }
    }

    //handle join games
    async function handleGameJoin(event){
        event.preventDefault();
        try{
            let url = `http://localhost:8800/join/gameStats/${event.target.id.value}`
            const res = await fetch(url)
            const data = await res.json()
            setTable(data);
            setComponent('SelectGameJoin');
            setTableHeaders(`All Game Stats for Player ID: ${event.target.id.value}`);
        }catch(err){
            console.log(err)
        }
    }

    //handle join drills
    async function handleDrillJoin(event){
        event.preventDefault();
        try{
            let url = `http://localhost:8800/join/drillStats/${event.target.id.value}`
            const res = await fetch(url)
            const data = await res.json()
            setTable(data);
            setComponent('SelectDrillJoin');
            setTableHeaders(`All Drill Stats for Player ID: ${event.target.id.value}`);
        }catch(err){
            console.log(err)
        }
    }
    
    //avg scores against teams
    async function handleAvgScore(event){
        event.preventDefault();
        try{
            let url = `http://localhost:8800/aggregate/avgChapmanScore/`;
            const res = await fetch(url)
            const data = await res.json()
            setTable(data);
            setComponent('SelectAvgScore');
            setTableHeaders(`Chapman Average Score Against Teams`);
        }catch(err){
            console.log(err)
        }
    }

    return(
        <div className={styles.container}>
            {component !== 'default' && <button className={styles.backButton} onClick={()=>setComponent('default')}>Back</button>}
            {component === 'default' && (<div>
                <h1>Stats</h1>
                <div className={styles.container_form_special}>
                    <h3>Full Select</h3>
                    <form onSubmit={handleFullSelect}>
                        <label>Select Table</label>
                        <select id="St" required>
                            <option value="Players">Players</option>
                            <option value="Games">Games</option>
                            <option value="Drills">Drills</option>
                            <option value="Games_Players">Game Stats</option>
                            <option value="Drills_Players">Drill Stats</option>
                        </select>
                        <button type="submit">View</button>
                    </form>
                </div>
                <div className={styles.container_form_special}>
                    <h3>Players Between Graduation Years</h3>
                    <form onSubmit={handlePlayersBetweenGradYear}>
                        <label>Start Year</label>
                        <input type="text" id="start" pattern="\d{4}" required></input>
                        <label>End Year</label>
                        <input type="text" id="end" pattern="\d{4}" required></input>
                        <button type="submit">View</button>
                    </form>
                </div>
                <div className={styles.container_form_special}>
                    <h3>Games Between Dates</h3>
                    <form onSubmit={handleGamesBetweenDates}>
                        <label>Start Date (YYYY-MM-DD)</label>
                        <input type="date" id="start" required></input>
                        <label>End Date (YYYY-MM-DD)</label>
                        <input type="date" id="end" required></input>
                        <button type="View">View</button>
                    </form>
                </div>
                <div className={styles.container_form_special}>
                    <h3>Players' Stats for Game ID</h3>
                    <form onSubmit={handlePlayersStatsForSingleGame}>
                        <label>Game ID</label>
                        <input type="text" id="id" pattern="\d{1,10}" required></input>
                        <button type="submit">View</button>
                    </form>
                </div>
                <div className={styles.container_form_special}>
                    <h3>Player's Game Stats</h3>
                    <form onSubmit={handleGameJoin}>
                        <label>Player ID</label>
                        <input type="text" id="id" pattern="\d{1,10}" required></input>
                        <button type="submit">View</button>
                    </form>
                </div>
                <div className={styles.container_form_special}>
                    <h3>Player's Drill Stats</h3>
                    <form onSubmit={handleDrillJoin}>
                        <label>Player ID</label>
                        <input type="text" id="id" pattern="\d{1,10}" required></input>
                        <button type="submit">View</button>
                    </form>
                </div>
                <div className={styles.container_form_special}>
                    <h3>Games Chapman Score ______ Average Score</h3>
                    <form onSubmit={handleSubquery}>
                        <select id="symbol">
                            <option value="greater than">greater than</option>
                            <option value="less than">less than</option>
                        </select>
                        <button type="View">View</button>
                    </form>
                </div>
                <div className={styles.container_form_special}>
                    <h3>Average Chapman Score Against Teams</h3>
                    <form onSubmit={handleAvgScore}>
                        <button type="View">View</button>
                    </form>
                </div>
            </div>)}
        
            {component === 'SelectPlayers' && (<div>
                <h3>{tableHeaders}</h3>
                <div className={styles.tableoverflow}>
                <table>
                    <thead>
                        <tr>
                            <th>Player ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Position</th>
                            <th>Graduation Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table.map((row) => (
                            <tr key={row.PlayerID}>
                                <td>{row.PlayerID}</td>
                                <td>{row.FirstName}</td>
                                <td>{row.LastName}</td>
                                <td>{row.Position}</td>
                                <td>{row.GradYear}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
                </div>
            )}

            {component === 'SelectGames' && (<div>
                <h3>{tableHeaders}</h3>
                <div className={styles.tableoverflow}>
                <table>
                    <thead>
                        <tr>
                            <th>Game ID</th>
                            <th>Opponent Name</th>
                            <th>Chapman Score</th>
                            <th>Opponent Score</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table.map((row) => (
                            <tr key={row.GameID}>
                                <td>{row.GameID}</td>
                                <td>{row.OpponentName}</td>
                                <td>{row.ChapmanScore}</td>
                                <td>{row.OpponentScore}</td>
                                <td>{row.GameDate.substring(0,10)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
                </div>
            )}

            {component === 'SelectDrills' && (<div>
                <h3>{tableHeaders}</h3>
                <div className={styles.tableoverflow}>
                <table>
                    <thead>
                        <tr>
                            <th>Drill ID</th>
                            <th>Drill Name</th>
                            <th>Drill Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table.map((row) => (
                            <tr key={row.DrillID}>
                                <td>{row.DrillID}</td>
                                <td>{row.DrillName}</td>
                                <td>{row.Description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
                </div>
            )}

            {component === 'SelectGames_Players' && (<div>
                <h3>{tableHeaders}</h3>
                <div className={styles.tableoverflow}>
                <table>
                    <thead>
                        <tr>
                            <th>Game ID</th>
                            <th>Player ID</th>
                            <th>Points</th>
                            <th>Blocks</th>
                            <th>Deflections</th>
                            <th>Assists</th>
                            <th>Steals</th>
                            <th>Offensive Rebounds</th>
                            <th>Defensive Rebounds</th>
                            <th>Turnovers</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table.map((row, i) => (
                            <tr key={i}>
                                <td>{row.GameID}</td>
                                <td>{row.PlayerID}</td>
                                <td>{row.Points}</td>
                                <td>{row.Blocks}</td>
                                <td>{row.Deflections}</td>
                                <td>{row.Assists}</td>
                                <td>{row.Steals}</td>
                                <td>{row.O_Rebounds}</td>
                                <td>{row.D_Rebounds}</td>
                                <td>{row.Turnovers}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
                </div>
            )}

            {component === 'SelectDrills_Players' && (<div>
                <h3>{tableHeaders}</h3>
                <div className={styles.tableoverflow}>
                <table>
                    <thead>
                        <tr>
                            <th>Drill ID</th>
                            <th>Player ID</th>
                            <th>Practice Date</th>
                            <th>Points</th>
                            <th>Blocks</th>
                            <th>Deflections</th>
                            <th>Assists</th>
                            <th>Steals</th>
                            <th>Offensive Rebounds</th>
                            <th>Defensive Rebounds</th>
                            <th>Turnovers</th>
                            <th>Assist Opportunities</th>
                            <th>Points Allowed</th>
                            <th>Rotations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table.map((row, i) => (
                            <tr key={i}>
                                <td>{row.DrillID}</td>
                                <td>{row.PlayerID}</td>
                                <td>{row.PracticeDate.substring(0,10)}</td>
                                <td>{row.Points}</td>
                                <td>{row.Blocks}</td>
                                <td>{row.Deflections}</td>
                                <td>{row.Assists}</td>
                                <td>{row.Steals}</td>
                                <td>{row.O_Rebounds}</td>
                                <td>{row.D_Rebounds}</td>
                                <td>{row.Turnovers}</td>
                                <td>{row.Assist_opp}</td>
                                <td>{row.Points_Allowed}</td>
                                <td>{row.Rotation}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
                </div>
            )}

            {component === 'SelectAvgScore' && (<div>
                <h3>{tableHeaders}</h3>
                <div className={styles.tableoverflow}>
                <table>
                    <thead>
                        <tr>
                            <th>Opponent Name</th>
                            <th>Chapman Average Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table.map((row, i) => (
                            <tr key={i}>
                                <td>{row.OpponentName}</td>
                                <td>{row.avgScore}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
                </div>
            )}

            {component === 'SelectGameJoin' && (<div>
                <h3>{tableHeaders}</h3>
                <div className={styles.tableoverflow}>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Opponent Name</th>
                            <th>Game Date</th>
                            <th>Game ID</th>
                            <th>Player ID</th>
                            <th>Points</th>
                            <th>Blocks</th>
                            <th>Deflections</th>
                            <th>Assists</th>
                            <th>Steals</th>
                            <th>Offensive Rebounds</th>
                            <th>Defensive Rebounds</th>
                            <th>Turnovers</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table.map((row, i) => (
                            <tr key={i}>
                                <td>{row.FirstName}</td>
                                <td>{row.LastName}</td>
                                <td>{row.OpponentName}</td>
                                <td>{row.GameDate.substring(0,10)}</td>
                                <td>{row.GameID}</td>
                                <td>{row.PlayerID}</td>
                                <td>{row.Points}</td>
                                <td>{row.Blocks}</td>
                                <td>{row.Deflections}</td>
                                <td>{row.Assists}</td>
                                <td>{row.Steals}</td>
                                <td>{row.O_Rebounds}</td>
                                <td>{row.D_Rebounds}</td>
                                <td>{row.Turnovers}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
                </div>
            )}

            {component === 'SelectDrillJoin' && (<div>
                <h3>{tableHeaders}</h3>
                <div className={styles.tableoverflow}>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Drill Name</th>
                            <th>Drill ID</th>
                            <th>Player ID</th>
                            <th>Practice Date</th>
                            <th>Points</th>
                            <th>Blocks</th>
                            <th>Deflections</th>
                            <th>Assists</th>
                            <th>Steals</th>
                            <th>Offensive Rebounds</th>
                            <th>Defensive Rebounds</th>
                            <th>Turnovers</th>
                            <th>Assist Opportunities</th>
                            <th>Points Allowed</th>
                            <th>Rotations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table.map((row, i) => (
                            <tr key={i}>
                                <td>{row.FirstName}</td>
                                <td>{row.LastName}</td>
                                <td>{row.DrillName}</td>
                                <td>{row.DrillID}</td>
                                <td>{row.PlayerID}</td>
                                <td>{row.PracticeDate.substring(0,10)}</td>
                                <td>{row.Points}</td>
                                <td>{row.Blocks}</td>
                                <td>{row.Deflections}</td>
                                <td>{row.Assists}</td>
                                <td>{row.Steals}</td>
                                <td>{row.O_Rebounds}</td>
                                <td>{row.D_Rebounds}</td>
                                <td>{row.Turnovers}</td>
                                <td>{row.Assist_opp}</td>
                                <td>{row.Points_Allowed}</td>
                                <td>{row.Rotation}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
                </div>
            )}
        </div>
    )
}