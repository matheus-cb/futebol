const allMatches = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 41,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Internacional"
    }
  }
]

const matchesInProgress = [
  {
    "id": 41,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Internacional"
    }
  },
  {
    "id": 42,
    "homeTeamId": 6,
    "homeTeamGoals": 1,
    "awayTeamId": 1,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "Ferroviária"
    },
    "awayTeam": {
      "teamName": "Avaí/Kindermann"
    }
  }
]

const newMatch = {
  "homeTeamId": 16, 
  "awayTeamId": 8, 
  "homeTeamGoals": 2,
  "awayTeamGoals": 2
}

const allMatchesFinalizados = [
  {
    "name": "Palmeiras",
    "totalGames": 5,
    "goalsFavor": 17,
    "goalsOwn": 5,
    "totalVictories": 4,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsBalance": 12,
    "totalPoints": 13,
    "efficiency": "86.67"
  },
  {
    "name": "Corinthians",
    "totalGames": 5,
    "goalsFavor": 12,
    "goalsOwn": 3,
    "totalVictories": 4,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsBalance": 9,
    "totalPoints": 12,
    "efficiency": "80.00"
  },
  {
    "name": "Santos",
    "totalGames": 5,
    "goalsFavor": 12,
    "goalsOwn": 6,
    "totalVictories": 3,
    "totalDraws": 2,
    "totalLosses": 0,
    "goalsBalance": 6,
    "totalPoints": 11,
    "efficiency": "73.33"
  },
  {
    "name": "Grêmio",
    "totalGames": 5,
    "goalsFavor": 9,
    "goalsOwn": 8,
    "totalVictories": 3,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsBalance": 1,
    "totalPoints": 10,
    "efficiency": "66.67"
  },
  {
    "name": "Internacional",
    "totalGames": 5,
    "goalsFavor": 7,
    "goalsOwn": 6,
    "totalVictories": 3,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsBalance": 1,
    "totalPoints": 10,
    "efficiency": "66.67"
  },
  {
    "name": "Real Brasília",
    "totalGames": 5,
    "goalsFavor": 5,
    "goalsOwn": 4,
    "totalVictories": 3,
    "totalDraws": 1,
    "totalLosses": 1,
    "goalsBalance": 1,
    "totalPoints": 10,
    "efficiency": "66.67"
  },
  {
    "name": "São Paulo",
    "totalGames": 5,
    "goalsFavor": 9,
    "goalsOwn": 6,
    "totalVictories": 2,
    "totalDraws": 2,
    "totalLosses": 1,
    "goalsBalance": 3,
    "totalPoints": 8,
    "efficiency": "53.33"
  },
  {
    "name": "Flamengo",
    "totalGames": 6,
    "goalsFavor": 5,
    "goalsOwn": 5,
    "totalVictories": 2,
    "totalDraws": 2,
    "totalLosses": 2,
    "goalsBalance": 0,
    "totalPoints": 8,
    "efficiency": "44.44"
  },
  {
    "name": "Ferroviária",
    "totalGames": 5,
    "goalsFavor": 7,
    "goalsOwn": 7,
    "totalVictories": 2,
    "totalDraws": 1,
    "totalLosses": 2,
    "goalsBalance": 0,
    "totalPoints": 7,
    "efficiency": "46.67"
  },
  {
    "name": "São José-SP",
    "totalGames": 5,
    "goalsFavor": 5,
    "goalsOwn": 6,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 3,
    "goalsBalance": -1,
    "totalPoints": 6,
    "efficiency": "40.00"
  },
  {
    "name": "Cruzeiro",
    "totalGames": 5,
    "goalsFavor": 8,
    "goalsOwn": 10,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 3,
    "goalsBalance": -2,
    "totalPoints": 4,
    "efficiency": "26.67"
  },
  {
    "name": "Avaí/Kindermann",
    "totalGames": 5,
    "goalsFavor": 4,
    "goalsOwn": 8,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 3,
    "goalsBalance": -4,
    "totalPoints": 4,
    "efficiency": "26.67"
  },
  {
    "name": "Botafogo",
    "totalGames": 5,
    "goalsFavor": 3,
    "goalsOwn": 8,
    "totalVictories": 1,
    "totalDraws": 1,
    "totalLosses": 3,
    "goalsBalance": -5,
    "totalPoints": 4,
    "efficiency": "26.67"
  },
  {
    "name": "Bahia",
    "totalGames": 5,
    "goalsFavor": 2,
    "goalsOwn": 6,
    "totalVictories": 0,
    "totalDraws": 2,
    "totalLosses": 3,
    "goalsBalance": -4,
    "totalPoints": 2,
    "efficiency": "13.33"
  },
  {
    "name": "Minas Brasília",
    "totalGames": 5,
    "goalsFavor": 4,
    "goalsOwn": 9,
    "totalVictories": 0,
    "totalDraws": 2,
    "totalLosses": 3,
    "goalsBalance": -5,
    "totalPoints": 2,
    "efficiency": "13.33"
  },
  {
    "name": "Napoli-SC",
    "totalGames": 6,
    "goalsFavor": 3,
    "goalsOwn": 15,
    "totalVictories": 0,
    "totalDraws": 2,
    "totalLosses": 4,
    "goalsBalance": -12,
    "totalPoints": 2,
    "efficiency": "11.11"
  }
]


export {
  allMatches,
  matchesInProgress,
  newMatch,
  allMatchesFinalizados
};