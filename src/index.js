import dgram from 'dgram'
import osc from 'osc-min'

const server = dgram.createSocket('udp4')

const send = (address, args) => {
  console.log(`>>> [sending] ${address} ${args}`)

  server.send(
    osc.toBuffer({ address, args }),
    7400,
    'localhost',
    (err) => err
      ? console.log(`!!! ${err}`)
      : console.log(`>>> [success] ${address} ${args}`)
  )
}

send('/test', [ 3, 6.28, 'Test Message' ])
send('/csv', '3,6.28,8')
