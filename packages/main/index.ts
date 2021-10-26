import { desktopCapturer } from 'electron'

const startCapture = (displayMediaOptions?: DisplayMediaStreamConstraints) => {
  desktopCapturer.getSources({ types: ['screen'] }).then(sources => {
    for (const source of sources) {
      console.log(source)
      if (source.name === 'Electron') {
        return navigator.mediaDevices.getDisplayMedia(
          displayMediaOptions
        ).then((stream) => {
          handleStream(stream)
        }).catch((err) => {
          handleError(err)
          return null
        })
      }
    }
  })
}

function handleStream (stream: MediaStream) {
  const video = document.querySelector('video')
  if (video) {
    video.srcObject = stream
    video.onloadedmetadata = (e) => video.play()
  }
}

function handleError (e: Error) {
  console.error('Error: ', e)
}

startCapture()
