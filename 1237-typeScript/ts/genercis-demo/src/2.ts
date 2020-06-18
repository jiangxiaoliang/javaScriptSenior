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

function getOption<K>(obj: any, key: K) {
    return obj[key]
}

getOption<'el' | 'template'>(vueOptions, 'el')
getOption<'props' | 'state'>(reactOption, 'state')

export default {}