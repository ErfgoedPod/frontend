import express from 'express'
import http from 'http'
import nunjucks from 'nunjucks'
import sassMiddleware from 'node-sass-middleware'
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

export default class Frontend {
    _inbox = []
    _outbox = []
    server

    constructor() {
        const app = express()

        nunjucks.configure('views', {
            autoescape: true,
            express: app
        })

        console.log(`Working dir ${__dirname}`)

        app.use(sassMiddleware({
            src: path.join(__dirname, 'scss'),
            dest: path.join(__dirname, '../public'),
            indentedSyntax: true, // true = .sass and false = .scss
            sourceMap: true
        }))

        app.use(express.static(path.join(__dirname, 'public')))

        app.get('/', (req, res, next) => {
            let data = {
                content: 'Hello world!',
                title: 'Bootstrap example',
                inbox: this.inbox,
                outbox: this.outbox
            }

            res.render('index.njk', data)
        })

        app.get('/notifications/received', (req, res, next) => {
            res.json(this._inbox)
        })

        app.get('/notifications/sent', (req, res, next) => {
            res.json(this._outbox)
        })

        this.server = http.createServer(app)
    }

    start() {
        this.server.listen('3000', () => {
            console.log('Listening on port 3000')
        })
    }

    get outbox() {
        return this._outbox
    }

    get inbox() {
        return this._outbox
    }

}

new Frontend().start()