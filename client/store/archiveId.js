import axios from 'axios'

// const defaultSession = {
//   apiKey: '',
//   token: '',
//   sessionId: ''
// }

const GOT_ARCHIVE_ID = 'GOT_ARCHIVE_ID'
const STOP_ARCHIVING = 'STOP_ARCHIVING'

const gotArchiveId = archiveId => {
  return {
    type: GOT_ARCHIVE_ID,
    archiveId
  }
}

const stoppedArchiving = archiveId => {
  return {
    type: STOP_ARCHIVING,
    archiveId
  }
}

export const getArchiveId = sessionId => async dispatch => {
  try {
    const config = {
      sessionId: sessionId,
      resolution: '1280x720',
      output: 'composed'
    }
    const {data} = await axios.post('/api/faceRecording/archive/start', config)
    console.log(data)
    dispatch(gotArchiveId(data.id))
  } catch (err) {
    console.log(err)
  }
}

export const stopArchiving = archiveId => async dispatch => {
  try {
    const {data} = await axios.post(
      `/api/faceRecording/archive/${archiveId}/stop`
    )
    dispatch(stoppedArchiving(data))
  } catch (err) {
    console.log(err)
  }
}

const archiveIdReducer = (state = '', action) => {
  switch (action.type) {
    case GOT_ARCHIVE_ID:
      return action.archiveId
    default:
      return state
  }
}

export default archiveIdReducer
