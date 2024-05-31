import { createClient } from '@libsql/client'

export const client = createClient({
  url: 'libsql://patagon-barber-alejo9601.turso.io',
  authToken:
    'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MTcxODA2NDksImlkIjoiZDMzMjg5ZDItMTJmYy00ODYzLWE0NTQtZTk1YWNkNDViOWQzIn0.8fDa9RemSISDroyyuRpKUZvGtlZ_W6n2l1eaqRqDMqb3Q_qHPPzf-EeiE2wontTHGMSDJ4vY23UrVFdWBzJ_DQ'
})
