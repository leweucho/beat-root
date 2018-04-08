import createSender from './osc'

const send = createSender()

send('/test', [ 3, 6.28, 'Test Message' ])
send('/csv', '3,6.28,8')
