import process from 'process'
import Agent from 'socks5-https-client/lib/Agent'

const useAgent = true

let AGENT = {}
if (process.env.NODE_ENV !== 'vps') {
  if (useAgent) {
    AGENT = {
      strictSSL: true,
      agentClass: Agent,
      agentOptions: {
        socksHost: '127.0.0.1', // Defaults to 'localhost'.
        socksPort: 1086 // Defaults to 1080.
      }
    }
  } else {
    AGENT = {
      proxy: 'http://your.proxy.com:8080'
    }
  }
}

export {
  AGENT
}
