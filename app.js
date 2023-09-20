const puppeteer = require("puppeteer");

async function scrapeWebsite() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  try {
    await page.goto(
      "https://mateuszwoj-bit.github.io/chuck-norris-api-test-app/"
    );

    await page.waitForFunction(
      () => {
        const jokeElement = document.querySelector("#joke-text");
        return jokeElement && jokeElement.textContent.trim() !== "";
      },
      { timeout: 2000 }
    );

    const jokeText = await page.$eval(
      "#joke-text",
      (element) => element.textContent
    );

    console.log(jokeText);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await browser.close();
  }
}

scrapeWebsite();
