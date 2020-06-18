let options = {
    el: '#app',
    template: '<dv></div>'
};
function fn(options) {
}
// key: keyof IOption => key: 'el' | 'template'
function getOptions(key) {
    return options[key];
}
getOptions('template');
export default {};
