import axios from 'axios'
import querystring from 'querystring'

const Api = axios.create({
    baseURL: `https://places.cit.api.here.com`
  })
const api_creds = querystring.stringify({'app_id': process.env.OTW_HERE_MAPS_APP_ID, 'app_code': process.env.OTW_HERE_MAPS_APP_CODE})

export function getAutosuggestions(text, callback) {
    let endpoint = `/places/v1/autosuggest`
    let params = {'q': text, 'at': '37.7905419,-122.3956178'}
    let queryParams = querystring.stringify(params)
    if(queryParams)
        endpoint = endpoint + '?' + api_creds + '&' + queryParams
    
    let response = Api.get(endpoint).then(callback)
    //console.log(response.data);
    //return response.data;
}