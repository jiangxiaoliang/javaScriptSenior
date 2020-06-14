export function RMB(val, flag="￥") {
    return flag + ' ' + (val / 100).toFixed(2)
}