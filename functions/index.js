const axios = require('axios')
const base = require('base-64')


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



const requester = (arr) => {                                     //Generates responses based on the contents of the passed URL array
    const responses = arr.forEach(async ele => {   
        const resp = await axios.get(ele)
        responses.push(base.decode(resp.data.content))
        console.log(base.decode(resp.data.content))
        console.log(responses)
    }).catch(Error)

    

    return responses

}

module.exports = {arrayCleaner, commitConsolidator, requester}




