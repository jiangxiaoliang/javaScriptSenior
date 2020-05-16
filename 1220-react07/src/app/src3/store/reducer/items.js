let items = [
    {
        id: 1,
        name: 'iPhone XR',
        price: 542500
    },
    {
        id: 2,
        name: 'Apple iPad Air 3',
        price: 377700
    },
    {
        id: 3,
        name: 'Macbook Pro 15.4',
        price: 1949900
    },
    {
        id: 4,
        name: 'Apple iMac',
        price: 1629900
    },
    {
        id: 5,
        name: 'Apple Magic Mouse',
        price: 72900
    },
    {
        id: 6,
        name: 'Apple Watch Series 4',
        price: 599900
    }
];
let maxId = 6;

export default (state = items, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return [...state, {
                id: maxId++,
                name: action.payload.name,
                price: 88888
            }]
        default:
            return state
    }
}