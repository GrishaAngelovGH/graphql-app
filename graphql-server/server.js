import express from 'express'
import { createHandler } from 'graphql-http/lib/use/express'
import cors from 'cors'

import schema from './schema.js'

const app = express()

app.use(cors())

app.all('/graphql', createHandler({ schema, renderGraphiQL: true }))

app.listen(4000, () => {
  console.log('Running a GraphQL API server at http://localhost:4000/graphql')
})