const fs = require('fs');
const writeInFile = (price) => {
    const priceData = { price: price }
    console.log(priceData)
    fs.writeFileSync('logger.json', JSON.stringify(priceData), function(err) {
        if(err=="Invalid coupon") throw price;
        else if(err) throw err;
        console.log('saved!')
    })
}
const readInFile = () => {
    fs.readFile('logger.txt', function(err, data) {
        if(err) throw err;
        console.log(data)
        return data
    })
}

module.exports = { writeInFile, readInFile }