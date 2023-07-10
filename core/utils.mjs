import dotenv from 'dotenv'
dotenv.config() 
export function getEnv(key, cast='string'){
    let ret = ''
    switch (cast) {
        case 'number':
            ret = toNumber(process.env[key])
            break;
        case 'bool':
            if (process.env[key] === 'true') {
                ret = true
            } else if(process.env[key] === 'false'){
                ret = false
            }

            break;
            default:
                ret = process.env[key]
            break;
    }
    return ret ?? ''
}
export function log(obj) {
    console.log('from loger =>>', obj);
}
export function toNumber(str){
    try {
        const ret = Number(str)
        return isNaN(ret) ? 0 : ret
    } catch (e) {
        return 0
    }
}

export function sleep(ms)
{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true)
        }, ms);
    })
}

export function random(min, max){
    try {
        return Math.floor(
            Math.random()*(max-min+1)+min
        )
    } catch (e) {
        return 0
    }
}
export function stringify(obj) {
    try {
        return JSON.stringify(obj)
    } catch (e) {
        return ''
    }
}

export   function isJSON(str)
{
    try {
        JSON.parse(str)
    } catch (e) {
        return false
    }
    return true
}

export   function toJSON(str)
{
    try {
       return JSON.parse(str)
    } catch (e) {
        return {}
    }
}

export function returner(data){
    
}