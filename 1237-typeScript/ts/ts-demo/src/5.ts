import m4 from './4'

let input = document.querySelector('input')

// m4.add('2', 4)
// m4.add(2, 4)
if (input) {
    m4.add(Number(input.value), 4)
}