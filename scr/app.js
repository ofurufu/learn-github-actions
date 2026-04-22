const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Hello from CI!' })
})

app.get('/health', (req, res) => {
  res.json({ healthy: true, uptime: process.uptime() })
})

module.exports = app   // export for testing, don't start server here