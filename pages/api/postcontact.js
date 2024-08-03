import * as fs from "node:fs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body);
    let data = await fs.promises.readdir("contactdata");
    console.log(data);
    fs.promises.writeFile(
      `contactdata/${data.length + 1}.json`,
      JSON.stringify(req.body)
    );
    res.status(200).json("Yes Post");
    // Process a POST request
  } else {
    // Handle any other HTTP method
    res.status(200).json("allBlogs");
  }
}
