// Functions that sort the leaderboard player stats

export function alphaSort(playerStats) {
  playerStats.sort(function(a, b) {
    const playerA = a.name.toUpperCase()
    const playerB = b.name.toUpperCase() 
    if (playerA < playerB) {
      return -1
    }
    if (playerA > playerB) {
      return 1
    }
    return 0
  })
  return playerStats
}

export function gamesPlayedSort (playerStats) {
  playerStats.sort(function(a, b) {
    const playerA = a.gamesPlayed
    const playerB = b.gamesPlayed

    if (playerA < playerB) {
      return 1
    }
    if (playerA > playerB) {
      return -1
    }
  })
  return playerStats
}

export function totalSort(playerStats) {
  playerStats.sort(function(a, b) {
    const playerA = a.winnings - a.losses
    const playerB = b.winnings - b.losses
    if (playerA < playerB) {
      return 1
    }
    if (playerA > playerB) {
      return -1
    }

    return 0
  })
  return playerStats
}

export function topTwoSort(playerStats) {
  playerStats.sort(function(a, b) {
    const playerA = parseInt(a.topTwoPercentage.trim('%'))
    const playerB = parseInt(b.topTwoPercentage.trim('%'))

    if (playerA < playerB) {
      return 1
    }
    if (playerA > playerB) {
      return -1
    }
    if (isNaN(playerA)) {
      return 1
    }
    return 0
  })
  return playerStats
}

export function mostRecentSort(games, field) {
  games.sort(function(a, b) {
    const playerA = a[field]
    const playerB = b[field]
    if (playerA < playerB) {
      return 1
    }
    if (playerA > playerB) {
      return -1
    }
  })
  return games
}