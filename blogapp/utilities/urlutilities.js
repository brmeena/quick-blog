module.exports={
    getSeoFriendlyName,
}

function getSeoFriendlyName(inputStr){
    if(!inputStr)
        return inputStr
    console.log(inputStr)
    inputStr=inputStr.replaceAll(" ","-")
    inputStr=inputStr.toLowerCase()
    return inputStr
}