// import { } from './adapter'
const BASE_URL = '10.39.110.47:3000/'
// const BASE_URL = 'http://localhost:3000/'

/* ---------- ACTION CREATORS ------------- */
// const editHobbit = (hobbit) => ({ type: 'EDIT_HOBBIT', payload: hobbit})
const getCurrentUserPhotos = (photos) => ({ type: 'GET_CURRENTUSER_PHOTOS', payload: photos })
const addPhoto = (photo) => ({ type: 'ADD_PHOTO', payload: photo })
// export const selectHobbit = (hobbit) => ({type: 'SELECT_HOBBIT', payload: hobbit})


/* ---------- THUNK CREATORS ------------- */
// export const updateHobbit = (hobbit) => {
//   return (dispatch) => {
//     return update(hobbit)
//     .then((res) => dispatch(editHobbit(res)))
//     .catch(console.error)
//   }
// }

export const loadCurrentUserPhotos = (user) => {
  return (dispatch) => {
    return fetch(`${BASE_URL}users/${user.id}/photos`)
      .then(r => r.json())
      .then(photos => dispatch(getCurrentUserPhotos(photos)))
      .catch(console.error)
  }
}

export const postPhoto = (photo) => {
  console.log(photo);
  return (dispatch) => {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}`},
      body: JSON.stringify({photo: photo})
    }
    return fetch(`${BASE_URL}users/${photo.user_id}/photos`, options)
      .then(r => r.json())
      .then(photo => dispatch(addPhoto(photo)))
      .catch(console.error)
  }
}
