interface IOption {
    el: string
    template: string
}
let options: IOption = {
    el: '#app',
    template: '<dv></div>'
}
function fn(options: IOption) {

}

// key: keyof IOption => key: 'el' | 'template'
function getOptions(key: keyof IOption) {
    return options[key]
}

getOptions('template')

export default {}