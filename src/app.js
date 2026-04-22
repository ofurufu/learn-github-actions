const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Hello from CI!' })
})

app.get('/health', (req, res) => {
  res.json({ healthy: true, uptime: process.uptime() })
})

app.get('/version', (req, res) => {
  res.json({ version: process.env.npm_package_version || '1.0.0' })
})

module.exports = app  // export for testing — don't start server here
