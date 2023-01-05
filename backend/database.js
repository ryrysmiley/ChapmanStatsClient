import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

app.use(express.json())
app.use(cors())

//flexible SELECT * FROM _____
app.get("/:table", (req, res) => {
    let sql = `SELECT * FROM ${req.params.table}View`
    db.query(sql,(err,data)=>{
        if(err) console.log(err)
        return res.json(data)
    })
})

//SELECT Players between GradsYears
app.get("/Players/:start-:end", (req, res) => {
    let sql = `SELECT * FROM Players WHERE GradYear BETWEEN ${req.params.start} AND ${req.params.end}`
    console.log(sql)
    db.query(sql,(err,data)=>{
        if(err) console.log(err)
        return res.json(data)
    })
})

//SELECT Games between Dates
app.get("/Games/:start/:end", (req, res) => {
    let sql = `SELECT * FROM Games WHERE GameDate BETWEEN '${req.params.start}' AND '${req.params.end}'`
    console.log(sql)
    db.query(sql,(err,data)=>{
        if(err) console.log(err)
        return res.json(data)
    })
})

//SELECT GAME STATS by GameID
app.get("/GameStats/:id", (req, res) => {
    let sql = `SELECT * FROM Games_Players WHERE GameID = ${req.params.id}`
    console.log(sql)
    db.query
    (sql,(err,data)=>{
        if(err) console.log(err)
        return res.json(data)
    })
})
//avg chapman score group by opponent name
app.get("/aggregate/avgChapmanScore", (req, res) => {
    let sql = `SELECT OpponentName, AVG(ChapmanScore) as avgScore FROM Games GROUP BY OpponentName`
    db.query(sql,(err,data)=>{
        if(err) console.log(err)
        return res.json(data)
    })
})

//get game stats of a player and get the opponent name and player name
app.get("/join/gameStats/:id", (req, res) => {
    let sql = `SELECT Games_Players.*, Games.OpponentName, Games.GameDate, Players.FirstName, Players.LastName FROM Games_Players INNER JOIN Games ON Games_Players.GameID = Games.GameID INNER JOIN Players ON Games_Players.PlayerID = Players.PlayerID WHERE Games_Players.PlayerID = ${req.params.id}`
    db.query(sql,(err,data)=>{
        if(err) console.log(err)
        return res.json(data)
    })
})

//get drill stats of a player and get the drill name and player name
app.get("/join/drillStats/:id", (req, res) => {
    let sql = `SELECT Drills_Players.*, Drills.DrillName, Players.FirstName, Players.LastName FROM Drills_Players INNER JOIN Drills ON Drills_Players.DrillID = Drills.DrillID INNER JOIN Players ON Drills_Players.PlayerID = Players.PlayerID WHERE Drills_Players.PlayerID = ${req.params.id}`
    db.query(sql,(err,data)=>{
        if(err) console.log(err)
        return res.json(data)
    })
})

//subquery
app.post("/subquery/comparison", (req, res) => {
    let symbol = ''
    if(req.body.type === 'greater than'){
        symbol = '>'
    }
    else{
        symbol = '<'
    }
    let sql = `SELECT * FROM Games WHERE ChapmanScore ${symbol} (SELECT AVG(ChapmanScore) FROM Games)`
    db.query(sql,(err,data)=>{
        if(err) console.log(err)
        return res.json(data)
    })
})

//flexible DELETE FROM _____ WHERE ID = _____
app.post("/deleteID", (req, res) => {
    let name = '';
    switch(req.body.table){
        case 'Players':
            name = 'PlayerID';
            break;
        case 'Games':
            name = 'GameID';
            break;
        case 'Drills':
            name = 'DrillID';
            break;
        default:
            break;
    }
    let sql = `DELETE FROM ${req.body.table} WHERE ${name} = ${req.body.id}`
    db.beginTransaction((err)=>{
        if(err) console.log(err)
        db.query(sql,(err)=>{
            if(err){
                db.rollback(()=>{
                    console.log(err)
                })
                return res.status(400).json("Error")
            }
            db.commit((err)=>{
                if(err){
                    db.rollback(()=>{
                        console.log(err)
                    })
                    return res.status(400).json("Error")
                }
            })
            return res.json("Deleted")
        })
    })
})

//Delete from Games_Players
app.post("/deleteGP", (req, res) => {
    let sql = `DELETE FROM Games_Players WHERE GameID = ${req.body.GameID} AND PlayerID = ${req.body.PlayerID}`
    db.beginTransaction((err)=>{
        if(err) console.log(err)
        db.query(sql,(err)=>{
            if(err){
                db.rollback(()=>{
                    console.log(err)
                })
                return res.status(400).json("Error")
            }
            db.commit((err)=>{
                if(err){
                    db.rollback(()=>{
                        console.log(err)
                    })
                    return res.status(400).json("Error")
                }
            })
            return res.json("Deleted")
        })
    })
})

//Delete from Drills_Players
app.post("/deleteDP", (req, res) => {
    console.log(req.body)
    let sql = `DELETE FROM Drills_Players WHERE DrillID = ${req.body.DrillID} AND PlayerID = ${req.body.PlayerID} AND PracticeDate = '${req.body.PracticeDate}'`
    db.beginTransaction((err)=>{
        if(err) console.log(err)
        db.query(sql,(err)=>{
            if(err){
                db.rollback(()=>{
                    console.log(err)
                })
                return res.status(400).json("Error")
            }
            db.commit((err)=>{
                if(err){
                    db.rollback(()=>{
                        console.log(err)
                    })
                    return res.status(400).json("Error")
                }
            })
            return res.json("Deleted")
        })
    })
})

//specific INSERT INTO 
//players FirstName, LastName, Position, GradYear
app.post("/addPlayer", (req, res) => {
    let sql = `INSERT INTO Players (FirstName, LastName, Position, GradYear) VALUES ('${req.body.FirstName}', '${req.body.LastName}', '${req.body.Position}', '${req.body.GradYear}')`
    db.beginTransaction((err)=>{
        if(err) console.log(err)
        db.query(sql,(err)=>{
            if(err){
                db.rollback(()=>{
                    console.log(err)
                })
                return res.status(400).json("Error")
            }
            db.commit((err)=>{
                if(err){
                    db.rollback(()=>{
                        console.log(err)
                    })
                    return res.status(400).json("Error")
                }
            })
            return res.json("Added Player")
        })
    })
})

//games OpponentName, ChapmanScore, OpponentScore, Date
app.post("/addGame", (req, res) => {
    let sql = `INSERT INTO Games (OpponentName, ChapmanScore, OpponentScore, GameDate) VALUES ('${req.body.OpponentName}', '${req.body.ChapmanScore}', '${req.body.OpponentScore}', '${req.body.GameDate}')`
    db.beginTransaction((err)=>{
        if(err) console.log(err)
        db.query(sql,(err)=>{
            if(err){
                db.rollback(()=>{
                    console.log(err)
                })
                return res.status(400).json("Error")
            }
            db.commit((err)=>{
                if(err){
                    db.rollback(()=>{
                        console.log(err)
                    })
                    return res.status(400).json("Error")
                }
            })
            return res.json("Added Game")
        })
    })
})

//drills DrillName, Description
app.post("/addDrill", (req, res) => {
    let sql = `INSERT INTO Drills (DrillName, Description) VALUES ('${req.body.DrillName}', '${req.body.Description}')`
    db.beginTransaction((err)=>{
        if(err) console.log(err)
        db.query(sql,(err)=>{
            if(err){
                db.rollback(()=>{
                    console.log(err)
                })
                return res.status(400).json("Error")
            }
            db.commit((err)=>{
                if(err){
                    db.rollback(()=>{
                        console.log(err)
                    })
                    return res.status(400).json("Error")
                }
            })
            return res.json("Added Drill")
        })
    })
})

//Drill-Players DrillID, PlayerID, PracticeDate, Points, Blocks, Deflections, Assists, O_Rebounds, D_Rebounds, Steals, Turnovers, Assist_opp, Points_Allowed, Rotation
app.post("/addDrillStats", (req, res) => {
    let sql = `INSERT INTO Drills_Players (DrillID, PlayerID, PracticeDate, Points, Blocks, Deflections, Assists, O_Rebounds, D_Rebounds, Steals, Turnovers, Assist_opp, Points_Allowed, Rotation) VALUES ('${req.body.DrillID}', '${req.body.PlayerID}', '${req.body.PracticeDate}', '${req.body.Points}', '${req.body.Blocks}', '${req.body.Deflections}', '${req.body.Assists}', '${req.body.O_Rebounds}', '${req.body.D_Rebounds}', '${req.body.Steals}', '${req.body.Turnovers}', '${req.body.Assist_opp}', '${req.body.Points_Allowed}', '${req.body.Rotation}')`
    db.beginTransaction((err)=>{
        if(err) console.log(err)
        db.query(sql,(err)=>{
            if(err){
                db.rollback(()=>{
                    console.log(err)
                })
                return res.status(400).json("Error")
            }
            db.commit((err)=>{
                if(err){
                    db.rollback(()=>{
                        console.log(err)
                    })
                    return res.status(400).json("Error")
                }
            })
            return res.json("Added Drill Stats")
        })
    })

})
//Games-Players GameID, PlayerID, PracticeDate, Points, Blocks, Deflections, Assists, Steals, O_Rebounds, D_Rebounds, Turnovers
app.post("/addGameStats", (req, res) => {
    let sql = `INSERT INTO Games_Players (GameID, PlayerID, Points, Blocks, Deflections, Assists, Steals, O_Rebounds, D_Rebounds, Turnovers) VALUES ('${req.body.GameID}', '${req.body.PlayerID}', '${req.body.Points}', '${req.body.Blocks}', '${req.body.Deflections}', '${req.body.Assists}', '${req.body.Steals}', '${req.body.O_Rebounds}', '${req.body.D_Rebounds}', '${req.body.Turnovers}')`
    db.beginTransaction((err)=>{
        if(err) console.log(err)
        db.query(sql,(err)=>{
            if(err){
                db.rollback(()=>{
                    console.log(err)
                })
            }
            db.commit((err)=>{
                if(err){
                    db.rollback(()=>{
                        console.log(err)
                    })
                }
            })
            return res.json("Added Game Stats")
        })
    })
})


//specific UPDATE by ID
//player FirstName, LastName, Position, GradYear
app.post("/updatePlayer", (req, res) => {
    let sql = `UPDATE Players SET FirstName = '${req.body.FirstName}', LastName = '${req.body.LastName}', Position = '${req.body.Position}', GradYear = '${req.body.GradYear}' WHERE PlayerID = ${req.body.PlayerID}`
    db.beginTransaction((err)=>{
        if(err) console.log(err)
        db.query(sql,(err)=>{
            if(err){
                db.rollback(()=>{
                    console.log(err)
                })
                return res.status(400).json("Error")
            }
            db.commit((err)=>{
                if(err){
                    db.rollback(()=>{
                        console.log(err)
                    })
                    return res.status(400).json("Error")
                }
            })
            return res.json("Updated Player")
        })
    })
})
//games OpponentName, ChapmanScore, OpponentScore, Date
app.post("/updateGame", (req, res) => {
    let sql = `UPDATE Games SET OpponentName = '${req.body.OpponentName}', ChapmanScore = '${req.body.ChapmanScore}', OpponentScore = '${req.body.OpponentScore}', GameDate = '${req.body.GameDate}' WHERE GameID = ${req.body.GameID}`
    db.beginTransaction((err)=>{
        if(err) console.log(err)
        db.query(sql,(err)=>{
            if(err){
                db.rollback(()=>{
                    console.log(err)
                })
                return res.status(400).json("Error")
            }
            db.commit((err)=>{
                if(err){
                    db.rollback(()=>{
                        console.log(err)
                    })
                    return res.status(400).json("Error")
                }
            })
            return res.json("Updated Game")
        })
    })
})

//drills DrillID, DrillName, Description
app.post("/updateDrill", (req, res) => {
    let sql = `UPDATE Drills SET DrillName = '${req.body.DrillName}', Description = '${req.body.Description}' WHERE DrillID = ${req.body.DrillID}`
    db.beginTransaction((err)=>{
        if(err) console.log(err)
        db.query(sql,(err)=>{
            if(err){
                db.rollback(()=>{
                    console.log(err)
                })
                return res.status(400).json("Error")
            }
            db.commit((err)=>{
                if(err){
                    db.rollback(()=>{
                        console.log(err)
                    })
                    return res.status(400).json("Error")
                }
            })
            return res.json("Updated Drill")
        })
    })
})
//Games-Players GameID, PlayerID, PracticeDate, Points, Blocks, Deflections, Assists, Steals, O_Rebounds, D_Rebounds, Turnovers
app.post("/updateGameStats", (req, res) => {
    let sql = `UPDATE Games_Players SET Points = '${req.body.Points}', Blocks = '${req.body.Blocks}', Deflections = '${req.body.Deflections}', Assists = '${req.body.Assists}', Steals = '${req.body.Steals}', O_Rebounds = '${req.body.O_Rebounds}', D_Rebounds = '${req.body.D_Rebounds}', Turnovers = '${req.body.Turnovers}' WHERE GameID = ${req.body.GameID} AND PlayerID = ${req.body.PlayerID}`
    db.beginTransaction((err)=>{
        if(err) console.log(err)
        db.query(sql,(err)=>{
            if(err){
                db.rollback(()=>{
                    console.log(err)
                })
                return res.status(400).json("Error")
            }
            db.commit((err)=>{
                if(err){
                    db.rollback(()=>{
                        console.log(err)
                    })
                    return res.status(400).json("Error")
                }
            })
            return res.json("Updated Game Stats")
        })
    })
})

//Drill-Players DrillID, PlayerID, PracticeDate, Points, Blocks, Deflections, Assists, O_Rebounds, D_Rebounds, Steals, Turnovers, Assist_opp, Points_Allowed, Rotation
app.post("/updateDrillStats", (req, res) => {
    let sql = `UPDATE Drills_Players SET Points = '${req.body.Points}', Blocks = '${req.body.Blocks}', Deflections = '${req.body.Deflections}', Assists = '${req.body.Assists}', O_Rebounds = '${req.body.O_Rebounds}', D_Rebounds = '${req.body.D_Rebounds}', Steals = '${req.body.Steals}', Turnovers = '${req.body.Turnovers}', Assist_opp = '${req.body.Assist_opp}', Points_Allowed = '${req.body.Points_Allowed}', Rotation = '${req.body.Rotation}' WHERE DrillID = ${req.body.DrillID} AND PlayerID = ${req.body.PlayerID} AND PracticeDate = '${req.body.PracticeDate}'`
    db.beginTransaction((err)=>{
        if(err) console.log(err)
        db.query(sql,(err)=>{
            if(err){
                db.rollback(()=>{
                    console.log(err)
                })
                return res.status(400).json("Error")
            }
            db.commit((err)=>{
                if(err){
                    db.rollback(()=>{
                        console.log(err)
                    })
                    return res.status(400).json("Error")
                }
            })
            return res.json("Updated Drill Stats")
        })
    })
})

//record count of each table just return the number
app.get("/count/:table", (req, res) => {
    let sql = `SELECT COUNT(*) FROM ${req.params.table}`
    db.query(sql,(err,data)=>{
        if(err) console.log(err)
        return res.json(data)
    })
})

app.listen(process.env.MYSQL_PORT, () => {
    console.log('Connected to backend!')
})