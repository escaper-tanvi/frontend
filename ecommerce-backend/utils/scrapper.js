const puppeteer = require('puppeteer');

const scrapLink = async(url) => {
    console.log(url)
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'domcontentloaded'})
    // const data = await page.evaluate(() => {
    //     let results = [];
    //     let items = document.querySelectorAll('.card');
    //     console.log(typeof items)
    // })
    
        const table = await page.evaluate(() => document.querySelector('div').textContent);
        console.log(table)
    
    await page.screenshot({
        path:'screenshot.png'
    })
    browser.close();
    // console.log(data)
    // return data
}

module.exports = { scrapLink }