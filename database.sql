CREATE DATABASE ChapmanWBB_Stats;

USE ChapmanWBB_Stats;
CREATE TABLE Players(
    PlayerID INTEGER PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    Position VARCHAR(255),
    GradYear INTEGER
);

CREATE TABLE Drills(
    DrillID INTEGER PRIMARY KEY AUTO_INCREMENT,
    DrillName VARCHAR(255),
    Description VARCHAR(255)
);
CREATE TABLE Games(
    GameID INTEGER PRIMARY KEY AUTO_INCREMENT,
    OpponentName VARCHAR(255),
    ChapmanScore Integer,
    OpponentScore Integer,
    GameDate Date
);

/*Consider moving to stats to another table*/
CREATE TABLE Drills_Players(
    DrillID INTEGER,
    PlayerID INTEGER,
    PracticeDate DATE,
    Points INTEGER,
    Blocks INTEGER,
    Deflections INTEGER,
    Assists INTEGER,
    O_Rebounds INTEGER,
    D_Rebounds INTEGER,
    Steals INTEGER,
    Turnovers INTEGER,
    Assist_opp INTEGER,
    Points_Allowed INTEGER,
    Rotation INTEGER,
    FOREIGN KEY (DrillID) REFERENCES Drills(DrillID) ON DELETE CASCADE,
    FOREIGN KEY (PlayerID) REFERENCES Players(PlayerID) ON DELETE CASCADE,
    PRIMARY KEY (DrillID, PlayerID, PracticeDate)
);

CREATE TABLE Games_Players(
    GameID INTEGER,
    PlayerID INTEGER,
    Points INTEGER,
    Blocks INTEGER,
    Deflections INTEGER,
    Assists INTEGER,
    Steals INTEGER,
    O_Rebounds INTEGER,
    D_Rebounds INTEGER,
    Turnovers INTEGER,
    FOREIGN KEY (GameID) REFERENCES Games(GameID) ON DELETE CASCADE,
    FOREIGN KEY (PlayerID) REFERENCES Players(PlayerID) ON DELETE CASCADE,
    PRIMARY KEY (GameID, PlayerID)
);

CREATE VIEW PlayersView AS
    SELECT * FROM Players ORDER BY GradYear DESC LIMIT 200;


CREATE VIEW GamesView AS
    SELECT * FROM GAMES ORDER BY GameDate DESC LIMIT 200;

CREATE VIEW DrillsView AS
    SELECT * FROM Drills LIMIT 200;
CREATE VIEW Drills_PlayersView AS
    SELECT * FROM Drills_Players ORDER BY PracticeDate ASC LIMIT 200;
CREATE VIEW Games_PlayersView AS
    SELECT * FROM Games_Players ORDER BY GameID DESC LIMIT 200;

CREATE INDEX DrillIndex ON Drills(DrillName, Description);

SELECT * FROM PlayersView;
SELECT * FROM GamesView;
SELECT * FROM DrillsView;
SELECT * FROM Drills_PlayersView;
SELECT * FROM Games_PlayersView;

select * from Drills;
SELECT * FROM Drills_Players;

SET AUTOCOMMIT = 0;

SELECT @@autocommit;

SELECT Games_Players.*, Games.OpponentName, Players.FirstName, Players.LastName FROM Games_Players INNER JOIN Games ON Games_Players.GameID = Games.GameID INNER JOIN Players ON Games_Players.PlayerID = Players.PlayerID;