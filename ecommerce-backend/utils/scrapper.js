const puppeteer = require('puppeteer');

const scrapLink = async(url) => {
    console.log(url)
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'domcontentloaded'})
    
    const table = await page.evaluate(() => document.querySelector('.list').innerText);

    browser.close();
    return table
}


module.exports = { scrapLink }