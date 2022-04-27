import { useEffect, useState } from "react";
import NewsCards from "../public/components/NewsCards/NewsCards";
// i write my enviroment variables at vercel config.
import wordsToNumbers from "words-to-numbers";
import useStyles from "../styles/HomeStyle";
export default function Home() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArt, setActiveArt] = useState(-1);
  const classes = useStyles();

  useEffect(() => {
    const alanBtn = require("@alan-ai/alan-sdk-web");
    alanBtn({
      key: process.env.alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
        } else if (command === "highlight") {
          setActiveArt((prev) => prev + 1);
        } else if (command === "open") {
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, {
                  fuzzy: true,
                })
              : number;
          if (parsedNumber > 20) {
            alert("please say that again");
          } else {
            window.open(articles[parsedNumber - 1].url, "_blank");
          }
        }
      },
      rootEl: document.getElementById("alan-btn"),
    });
  }, []);
  return (
    <div>
      <div className={classes.logoContainer}>
        <img
          src={"	https://alan.app/static/alan-logo-medium.79f960a7.svg"}
          className={classes.alanLogo}
          alt="alan logo"
        />
      </div>
      <NewsCards articles={newsArticles} activeArt={activeArt} />
    </div>
  );
}
