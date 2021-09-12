export function percentage (part, whole) {
  const result = 100 * part / whole
  return `${result.toFixed(0)}%`
}

export function minusFormatting (num) {
  if (num < 0) {
    num = num * -1
    return `-£${num}`
  } else if (num === 0) {
    return '£0' 
  } else return `£${num}`
}

// I am fully aware of how insane the below code is. Desperately needs refactoring.
// But seeing as it's basically the core functionality of the whole project,
// getting it doing what it's supposed to by the deadline took precedence.

export function statify(games, players) {
  const newData = []

  // Creating the playerObj, a blank slate to store player specific game data

  players.map(player => {
    const name = player.name
    let playerObj = { 'name': name }

    // The wall of counters

    let firstPlaceCount = 0
    let secondPlaceCount = 0
    let thirdPlaceCount = 0
    let fourthPlaceCount = 0
    let fifthPlaceCount = 0
    let sixthPlaceCount = 0
    let seventhPlaceCount = 0
    let eighthPlaceCount = 0
    let ninthPlaceCount = 0
    let winningsCount = 0
    let lossesCount = 0
    
    games.map(game => {
      const noOne = 'John Doe'
      const first = game.firstPlace.name
      const second = game.secondPlace.name
      const third = game.thirdPlace.name
      const fourth = (typeof(game.fourthPlace) === undefined) ? noOne : game.fourthPlace.name
      const fifth = (game.fifthPlace === null) ? noOne : game.fifthPlace.name
      const sixth = (game.sixthPlace === null) ? noOne : game.sixthPlace.name
      const seventh = (game.seventhPlace === null) ? noOne : game.seventhPlace.name
      const eighth = (game.eighthPlace === null) ? noOne : game.eighthPlace.name
      const ninth = (game.ninthPlace === null) ? noOne : game.ninthPlace.name

      // Totting up the positions, the money cashes, as well as the buyins
      // Going through each game and adding to each specific player using counters

      if (first === name) {
        firstPlaceCount += 1
        winningsCount += game.prizeForFirst
        lossesCount += game.buyIn
      } playerObj = { ...playerObj, 'first': firstPlaceCount, 
        'winnings': winningsCount, 'losses': lossesCount }

      if (second === name) {
        secondPlaceCount += 1
        winningsCount += game.prizeForSecond
        lossesCount += game.buyIn
      } playerObj = { ...playerObj, 'second': secondPlaceCount,
        'winnings': winningsCount, 'losses': lossesCount }

      if (third === name) {
        thirdPlaceCount += 1
        winningsCount += game.prizeForThird
        lossesCount += game.buyIn
      } playerObj = { ...playerObj, 'third': thirdPlaceCount,
        'winnings': winningsCount, 'losses': lossesCount }

      if (fourth === name) {
        fourthPlaceCount += 1
        lossesCount += game.buyIn 
      } playerObj = { ...playerObj, 'fourth': fourthPlaceCount, 'losses': lossesCount }
      
      if (fifth === name) {
        fifthPlaceCount += 1
        lossesCount += game.buyIn
      } playerObj = { ...playerObj, 'fifth': fifthPlaceCount, 'losses': lossesCount }
    
      if (sixth === name) {
        sixthPlaceCount += 1
        lossesCount += game.buyIn
      } playerObj = { ...playerObj, 'sixth': sixthPlaceCount, 'losses': lossesCount }
      
      if (seventh === name) {
        seventhPlaceCount += 1
        lossesCount += game.buyIn
      } playerObj = { ...playerObj, 'seventh': seventhPlaceCount, 'losses': lossesCount }
      
      if (eighth === name) {
        eighthPlaceCount += 1
        lossesCount += game.buyIn
      } playerObj = { ...playerObj, 'eighth': eighthPlaceCount, 'losses': lossesCount }

      if (ninth === name) {
        ninthPlaceCount += 1
        lossesCount += game.buyIn
      } playerObj = { ...playerObj, 'ninth': ninthPlaceCount, 'losses': lossesCount }
    })

    // Getting the profit/loss (total) and the number of games played

    const total = playerObj.winnings - playerObj.losses
    const gameCount = firstPlaceCount + secondPlaceCount + thirdPlaceCount + fourthPlaceCount +
    fifthPlaceCount + sixthPlaceCount + seventhPlaceCount + eighthPlaceCount + ninthPlaceCount

    // Getting the average

    const average = (total / gameCount).toFixed(1)

    // Putting data in playerObj, also working out percentages and dealing with the formatting
    // of minus numbers.

    playerObj = { ...playerObj, 'total': minusFormatting(total), gamesPlayed: gameCount, 
      topTwoPercentage: percentage(playerObj.first + playerObj.second, gameCount),
      average: minusFormatting(average) }
    
    newData.push(playerObj)
  })
  return newData
}