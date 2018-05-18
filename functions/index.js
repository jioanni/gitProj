const axios = require('axios')
const base = require('base-64')
const fs = require('fs')


//COMMIT CONSOLIDATOR - Consolidates all of the "added" or "modified" entries in a push log to a single array.

const commitConsolidator = (arr) => {     
    let consolidated = [];
    arr.forEach(ele => {
        if (ele.added.length > 0) consolidated = consolidated.concat(ele.added)
        if (ele.modified.length > 0) consolidated = consolidated.concat(ele.modified)
    })

    let urls = [];

    consolidated.forEach(ele => {
        urls.push('http://api.github.com/repos/jioanni/gitProj/contents/' + ele)
    })

    return urls
}



//ARRAY CLEANER - Removes repeat entries from the consolidated data array.

const arrayCleaner = (arr) => {                 
    let cleanArray = [];
    arr.forEach(ele => {
        if (cleanArray.indexOf(ele) === -1) cleanArray.push(ele)
    })
    
    return cleanArray
}


//REQUEST GENERATOR - Generates requests off array of URLs in the previous function.

const requester = async arr => {
    const responses = []
    await Promise.all(arr.map(async ele=> {
      const resp = await axios({ method: 'GET', url: ele/*, headers: {"Accept" : "application/vnd.github.v3.raw"}*/})
      responses.push(base.decode(resp.data.content))
    }))

    return responses
  }

//FILE WRITER - Writes content of files on GitHub to filesystem. 

const fileWriter = async (files) => {

    const fileNum = 0;
    await Promise.all(files.map(async ele => {
        await fs.writeFile('testFile' + Math.floor(Math.random() * 100) + '.txt', ele, 'utf8')
    })).catch(err => console.error(err))   
}



module.exports = {arrayCleaner, commitConsolidator, requester, fileWriter}






