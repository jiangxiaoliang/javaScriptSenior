// 存储开启状态
localStorage.setItem('isOpen', true)
// 页面关闭时清除开发状态
window.addEventListener('beforeunload', () => {
    localStorage.removeItem('isOpen')
})
window.addEventListener('storage', () => {
    updateView()
})

window.onload = () => {
    updateView()
    document.querySelector('.deleteAll').onclick = () => {
        localStorage.removeItem('musicData')
        updateView()
    }
    document.querySelector('.deleteItem').onclick = () => {
        let inputs = document.querySelectorAll('.exchange input')
        let musicData = localStorage.getItem('musicData')
        musicData = JSON.parse(musicData) || []
        inputs.forEach((input, index) => {
            if (input.checked) {
                musicData.splice(index, 1)
            }
        })
        localStorage.setItem('musicData', JSON.stringify(musicData))
        updateView()
    }
}

function updateView() {
    let musicData = localStorage.getItem('musicData')
    if (musicData) {
        musicData = JSON.parse(musicData)
        let inner = '';
        musicData.forEach((item) => {
            let str = `
                <ul class=myul>
                    <input type='checkbox' />
                    <li>${item.songName}</li>
                    <li>${item.singer}</li>
                    <li>${item.time}</li>
                </ul>
            `
            inner += str
        })
        document.querySelector('.exchange').innerHTML = inner
    } else {
        document.querySelector('.exchange').innerHTML = ''
    }
}