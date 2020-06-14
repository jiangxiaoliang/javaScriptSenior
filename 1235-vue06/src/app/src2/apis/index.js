import axios from 'axios'
import URLS from './URLS'

export async function getItems(sort) {
    let rs = await axios({
        url: URLS.ITEMS + '?sort=' +sort
    })
    return rs
}
export async function getItem(id) {
    let rs = await axios({
        url: URLS.ITEM + '/' + id
    })
    return rs
}