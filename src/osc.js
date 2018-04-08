import dgram from 'dgram'
import osc from 'osc-min'

const createSender = (host = 'localhost', port = 7400) => {
  const server = dgram.createSocket('udp4')
  server.busyRequests = 0

  return (address, args) => {
    console.log(`>>> [sending] ${address} ${args}`)

    server.busyRequests += 1
    server.send(
      osc.toBuffer({ address, args }),
      port,
      host,
      (err) => {
        if (err) {
          console.log(`!!! ${err}`)
          server.close()
        } else {
          console.log(`>>> [success] ${address} ${args}`)

          server.busyRequests -= 1
          if (server.busyRequests === 0) {
            server.close()
          }
        }
      }
    )
  }
}

export default createSender
