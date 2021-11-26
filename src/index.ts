import { URLController } from './controller/urlController'
import express, { Response, Request } from 'express'
import { MongoConnection } from 'database/MongoConnection'

const api = express()
const urlController = new URLController
api.use(express.json())

const database = new MongoConnection()
database.connect()

api.post('/shorten', urlController.shorten)
api.get('/:hash', urlController.redirect)


api.listen(5000, () => console.log('Aplicação rodando!'))