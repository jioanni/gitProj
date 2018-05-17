const axios = require('axios')
const base = require('base-64')
const fs = require('fs')


const commitConsolidator = (arr) => {       /* this function consolidates all "added" or "modified" to a 
                                            single array after iterating over the commit object */
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



const arrayCleaner = (arr) => {                 //this function removes repeats
    let cleanArray = [];
    arr.forEach(ele => {
        if (cleanArray.indexOf(ele) === -1) cleanArray.push(ele)
    })
    
    return cleanArray
}


const requester = async arr => {
    const responses = []
    await Promise.all(arr.map(async ele=> {
      const resp = await axios.get(ele)
      responses.push(base.decode(resp.data.content))
    }))

    return responses
  }

const fileWriter = async (files) => {

    const fileNum = 0;
    await Promise.all(files.map(async ele => {
        await fs.writeFile('testFile' + Math.floor(Math.random() * 100) + '.txt', ele, 'utf8')
    })).catch(err => console.error(err))   
}



module.exports = {arrayCleaner, commitConsolidator, requester, fileWriter}




