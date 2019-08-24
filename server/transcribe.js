const speech = require('@google-cloud/speech')
// const {google} = require('googleapis')
const {Storage} = require('@google-cloud/storage')

let googCredentials

if (
  process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON &&
  process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON.length > 1
) {
  googCredentials = {
    credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON)
  }
}

// // Instantiates a client. If you don't specify credentials when constructing
// // the client, the client library will look for credentials in the
// // environment.
// const storage = new Storage(process.env.GOOGLE_CLOUD_PROJECT)

// // Makes an authenticated API request.
// storage
//   .getBuckets()
//   .then(results => {
//     const buckets = results[0]

//     console.log('Buckets:')
//     buckets.forEach(bucket => {
//       console.log(bucket.name)
//     })
//   })
//   .catch(err => {
//     console.error('ERROR:', err)
//   })

const storage = new Storage(googCredentials)

function store(bucketId, filename) {
  const gbucket = storage.bucket(bucketId)
  console.log('location bucket here', gbucket)
  return gbucket
    .file(filename)
    .createWriteStream()
    .on('error', err => {
      console.log(
        `Error uploading extracted audio to Google cloud storage. Reason: ${err}. File: ${filename}`
      )
    })
    .on('finish', () => {
      console.log(
        `Finished uploading extracted audio to Google cloud storage. File: ${filename}`
      )
    })
}

/**
 * Send audio to transcription service Google Cloud Speech API
 */
// function transcribeAudio(googFilename) {
//   try {
//     console.log(
//       'goooooooooooooooooooooooooooooooooooooooooooooooog',
//       googFilename
//     )
//     const gclient = new speech.SpeechClient(googCredentials)
//     console.log('Here are the', googCredentials)
//     return gclient
//       .recognize({
//         config: {
//           encoding: 'LINEAR16',
//           languageCode: 'en-US'
//         },
//         audio: {uri: googFilename}
//       })
//       .then(() =>
//         console.log(
//           'config audio=================================',
//           this.config.audio
//         )
//       )
//       .then(data => {
//         console.log('This is data:', data)
//         const res = data[0]
//         console.log('This is res:', res)
//         return res.promise()
//       })
//       .then(data => {
//         const res = data[0]
//         // const metadata = data[1]
//         const transcript = res.results
//           .map(r => {
//             console.log(r.alternatives)
//             return r.alternatives[0].transcript.trim()
//           })
//           .join('\n')
//         return transcript
//       })
//       .catch(err => {
//         console.log('This is googFileName', googFilename)
//         // ERROR HERE, ERROR HERE, ERROR HERE, ERROR HERE, ERROR HERE
//         console.log(`Error transcribing audio. Reason: ${err}`)
//       })
//   } catch (error) {
//     console.error(error)
//   }
// }

const transcribeAudio = async googFilename => {
  console.log('googFilename', googFilename)
  try {
    const gclient = new speech.SpeechClient(googCredentials)
    console.log('gclient', gclient)
    const config = {
      encoding: 'LINEAR16',
      languageCode: 'en-US'
    }
    const audio = {
      uri: googFilename
    }
    const request = {
      config: config,
      audio: audio
    }
    console.log(
      '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Error Happens After Here >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'
    )
    // Detects speech in the audio file
    console.log('request', request)
    const [response] = await gclient.recognize(request)
    console.log('response', response)
    console.log(
      '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Error Happens Before Here >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'
    )
    console.log('response', response)
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n')
    console.log(`Transcription: `, transcription)
  } catch (error) {
    console.error(error)
  }
}
// ;(async () => {
//   const auth = await google.auth.getClient({
//     scopes: ['https://speech.googleapis.com/v1/operations']
//   })
//   const {data} = await google
//     .speech('v1')
//     .operations.get({auth, name: transcribeAudio})

//   console.log(data)
// })()

// export
module.exports = {
  transcribeAudio,
  store
}
