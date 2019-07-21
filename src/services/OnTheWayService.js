import axios from 'axios'
import querystring from 'querystring'

const Api = axios.create({
    baseURL: `http://9f7853e9.ngrok.io`
  })

export function findOptimalStops(src, dest, taskLocation, callback) {
    let endpoint = `/find_stops`
    let params = {'src': [37.78988, -122.40119], 'dst': [37.3980360,-122.0895727], "mid" :[37.5525143,-122.3291306]}
    //let queryParams = querystring.stringify(params)
    //if(queryParams)
    //    endpoint = endpoint + '?' + api_creds + '&' + queryParams
    
    let response = Api.post(endpoint, params).then(callback)
    //console.log(response.data);
    //return response.data;
}