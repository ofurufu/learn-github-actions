const request = require('supertest')
const app = require('../src/app')

describe('API Tests', () => {
  test('GET / returns ok status', async () => {
    const res = await request(app).get('/')
    expect(res.statusCode).toBe(200)
    expect(res.body.status).toBe('ok')
    expect(res.body.message).toBe('Hello from CI!')
  })

  test('GET /health returns healthy: true', async () => {
    const res = await request(app).get('/health')
    expect(res.statusCode).toBe(200)
    expect(res.body.healthy).toBe(true)
    expect(typeof res.body.uptime).toBe('number')
  })

  test('GET /version returns a version string', async () => {
    const res = await request(app).get('/version')
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('version')
  })
})
