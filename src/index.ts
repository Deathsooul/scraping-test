import express from "express";
import axios from "axios";
import cheerio from "cheerio";

const port = 3366;
const app = express();

const url = "https://www.theguardian.com/uk";

app.use(express.json());

axios(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];

    $(".fc-item__title", html).each(function () {
      const title = $(this).text();
      const url = $(this).find("a").attr("href");
      articles.push({
        title,
        url,
      });
    });

    console.log(articles);
  })
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.info(`Server listen on port ${port}`);
});
