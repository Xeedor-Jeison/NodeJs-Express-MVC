const net = require('node:net')

function findAvaliablePort (disirePort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer()

    server.listen(disirePort, () => {
      const { port } = server.address()
      server.close(() => {
        resolve(port)
      })
    })

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        findAvaliablePort(0).then(port => resolve(port))
      } else {
        reject(err)
      }
    })
  })
}

module.exports = { findAvaliablePort }
