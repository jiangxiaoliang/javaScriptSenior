let users = [{
    id: 1,
    username: 'baoge',
    password: '123'
},
{
    id: 2,
    username: 'MT',
    password: '123'
},
{
    id: 3,
    username: 'dahai',
    password: '123'
},
{
    id: 4,
    username: 'zMouse',
    password: '123'
}]

export default (state = users, action) => {
    switch (action.type) {
        default:
            return state
    }
}