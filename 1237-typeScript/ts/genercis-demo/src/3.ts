interface IVueOptions {
    el: string
    template: string
}
interface IReactOptions {
    props: string,
    state: string
}

let vueOptions: IVueOptions = {
    el: '#app',
    template: '<div></div>'
}
let reactOption: IReactOptions = {
    props: 'props',
    state: 'state'
}

function getOption<T>(obj: T, key: keyof T) {
    return obj[key]
}

getOption<IVueOptions>(vueOptions, 'el')
getOption<IReactOptions>(reactOption, 'state')

export default {}