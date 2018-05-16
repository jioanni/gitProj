const axios = require('axios')


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

const requester = (arr) => {                    //this function will ultimately propagate the requests to individual files in repositores
    const responses = []                        //right now it only makes ONE request with the first URL because of rate limiting.
    console.log(arr[0])
    axios.get(arr[0])
        .then(resp => responses.push(resp))
        .catch(Error)

    return responses
}

module.exports = {arrayCleaner, commitConsolidator, requester}