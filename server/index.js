/* eslint-disable no-console */

import path from 'path'
import fs from 'fs'

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()

app.use(express.static(path.join(__dirname, '../dist')))

app.use(bodyParser.json())

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

// ????
// app.use('*', (req, res, next) => {
//   const indexPath = path.resolve(`${__dirname}/../dist/index.html`)
//   if (fs.existsSync(indexPath)) {
//     res.sendFile(indexPath)
//   } else {
//     next()
//   }
// })

const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`server running at: ${server.address().port}`)
})

process.on('uncaughtException', (err) => {
  // handle the error safely
  console.log(err)
})

process.on('unhandledRejection', (reason) => {
  throw reason // you should handle all exceptions in tests explixitly
})
