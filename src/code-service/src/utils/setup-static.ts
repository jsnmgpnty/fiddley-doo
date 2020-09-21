import { NestApplication } from "@nestjs/core";
import * as fs from 'fs';

const setupStaticPage = (app: NestApplication, path: string) => {
  const srv = app.getHttpAdapter();
  srv.get('/', (req, res) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        res.set('Content-Type', 'application/json').send(err.toString());
        return;
      }
      res.set('Content-Type', 'text/html').send(data.toString());
    });
  });
};

export default setupStaticPage;
