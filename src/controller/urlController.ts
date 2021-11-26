import { config } from "../config/constants";
import { Request, response, Response } from "express";
import shortId from 'shortid'
import { URLModel } from "database/model/URL";

export class URLController {
    public async shorten(req: Request, response: Response): Promise<void> {
        // verificar a existência da url
        const { originURL } = req.body
        const url = await URLModel.findOne({ originURL })
        if (url) {
            response.json(url)
            return
        }

        // cria o hash pra url
        const hash = shortId.generate()
        const shortURL = `${config.URL_API}/${hash}`

        // salva a url no database
        const newURL = await URLModel.create({ hash, shortURL, originURL })

        // retorna a url salvada
        response.json(newURL)
    }

    public async redirect(req: Request, res: Response): Promise<void> {
        // pegar hash
        const { hash } = req.params
        const aurl = await URLModel.findOne({ hash })

        if (aurl) {
            // redirecionar apara URL original a partir do que encontra no db
            response.redirect(aurl.originURL)
            return
        }

        response.status(400).json({ error: "URL not found" })



    }
}