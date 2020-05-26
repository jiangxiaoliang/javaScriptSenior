import fn from './fn'
import fn1 from './fn1'
import alert from './alert'
import '../css/index.css'

document.onclick = async function() {
    let rs = await fetch('/api/data')
    // console.log(rs)
    fn()
    // fn1()
}

let input = document.querySelector('input')
input.onfocus = function() {
    fn1()
}

let btn = alert()

// console.log(module.hot)
if (module.hot) {
    module.hot.accept('./fn', () => {
        console.log('fn更新了...')
    });
    module.hot.accept('./fn1', () => {
        console.log('fn1更新了...')
    });
    module.hot.accept('./alert', () => {
        console.log('btn chnage.....')
        // btn.remove()
        // btn = alert()
    })
}