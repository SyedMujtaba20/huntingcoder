// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as fs from "node:fs";

export default function handler(req, res) {
  fs.readFile(`blogdata/${req.query.slug}`, "utf-8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "No such blog is found." });
    }
    console.log(req.query.slug);
    res.status(200).json(JSON.parse(data));
  });
}
