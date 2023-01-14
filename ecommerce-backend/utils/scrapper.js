const puppeteer = require('puppeteer');

const scrapLink = async(url) => {
    console.log(url)
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'networkidle2'})
    // const data = await page.evaluate(() => {
    //     let results = [];
    //     let items = document.querySelectorAll('.card');
    //     console.log(typeof items)
    // })
    
        const table = await page.evaluate(() => document.querySelector('.list').innerText);

    browser.close();
    return table
    // console.log(data)
    // return data
}


module.exports = { scrapLink }