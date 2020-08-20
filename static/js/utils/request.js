import * as Cookies from 'js-cookie';
import qs from 'querystring'

const token = qs.parse(window.location.search.slice(1)).token || null


export const REQUEST_CONFIG = {
  // defaults to same origin
  origin: process.env.NODE_ENV == 'production'? "https://sukien.lienminh.garena.vn" : 'http://localhost:8000',
}

export const ENDPOINT = {
  config: '/api/user/config',
  draw: '/api/user/draw',
  getInventory: '/api/user/get_inventory',
  convertToReward: '/api/user/convert_to_reward',
  convertToInevent: '/api/user/convert_to_inevent',
  giveCharacter: '/api/user/give_to_character',
  history: '/api/user/history',
}

export default async (uri, options = {}) => {
  const { body } = options

  console.log('body', body)

  const response = await fetch(`${ REQUEST_CONFIG.origin }${ uri }`, {
    method: body ? 'POST' : 'GET',
    headers: {
      'X-CSRFToken':  Cookies.get('csrftoken'),
      token,
      'content-type': body ? 'application/json' : null,
    },
    body: body ? JSON.stringify(body) : null,
    credentials: 'same-origin',
  })

  return response.json()
}
