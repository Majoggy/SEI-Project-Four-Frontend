import axios from 'axios'
// import { getToken } from './auth'

// function headers() {
//   return {
//     headers: { Authorization: `Bearer ${getToken()}` },
//   }
// }

// Commented out getToken and headers func. Uncomment and then add headers()
// to the end of each route. See project 3 api.js file for reference.

// * USER REQUESTS

export function registerUser(formData) {
  return axios.post('/api/auth/register/', formData)
}

export function loginUser(formData) {
  return axios.post('/api/auth/login/', formData)
}

// Implement profiles/user edits as stretch goal

// export function profileUser() {
//   return axios.get('/api/profile', headers())
// }

// export function editUser(userId, formData) {
//   return axios.put(`/api/profile/${userId}`, formData, headers())
// }

// * PLAYER REQUESTS

export function getAllPlayers() {
  return axios.get('/api/players/')
}

export function getSinglePlayer(playerId) {
  return axios.get(`/api/players/${playerId}/`)
}

export function createPlayer(formData) {
  return axios.post('/api/players/', formData())
}

export function editPlayer(playerId, formData) {
  return axios.put(`/api/players/${playerId}/`, formData)
}

export function deletePlayer(playerId) {
  return axios.delete(`/api/players/${playerId}/`)
}

// * GAME REQUESTS

export function getAllGames() {
  return axios.get('/api/games/')
}

export function getSingleGame(gameId) {
  return axios.get(`/api/games/${gameId}/`)
}

export function createGame(formData) {
  return axios.post('/api/games/', formData())
}

export function editGame(gameId, formData) {
  return axios.put(`/api/games/${gameId}/`, formData)
}

export function deleteGame(gameId) {
  return axios.delete(`/api/games/${gameId}`)
}
