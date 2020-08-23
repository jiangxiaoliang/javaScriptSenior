const cloneDeepWith = require('lodash/cloneDeepWith')
const path = require('path')
const sizeOf = require('image-size')
const { Duplex } = require('stream')
const fs = require('fs')

exports.filterDef = function(obj) {
    const cloneObj = { ...obj }
    // eslint-disable-next-line prefer-const
    for (let key in cloneObj) {
        if (cloneObj.hasOwnProperty(key)) {
            if (typeof cloneObj[key] === 'undefined' || cloneObj[key] === null) {
                delete cloneObj[key]
            }
        }
    }
    return cloneObj
}

exports.sleep = function(t) {
    return new Promise(r => setTimeout(r, t))
}

exports.cloneDeepWith = function(object) {
    return cloneDeepWith(object)
}

const bufferToStream = function(buffer) {
    const stream = new Duplex()
    stream.push(buffer)
    stream.push(null)
    return stream
}

const streamToBuffer = function(stream) {
    return new Promise((resolve, reject) => {
        const buffers = []
        stream.on('error', reject)
        stream.on('data', data => buffers.push(data))
        stream.on('end', () => resolve(Buffer.concat(buffers)))
    })
}

const getStreamInfo = async function(stream) {
    const fileBuffer = await streamToBuffer(stream)
    return {
        ...sizeOf(fileBuffer),
        fileBuffer,
        size: fileBuffer.length
    }
}
exports.getStreamInfo = getStreamInfo

exports.wirteStreamToDisk = async function(stream, options) {
    const defaults = {
        path: path.join(process.cwd(), './app/public'),
        filename: '',
        width: Infinity,
        height: Infinity,
        size: Infinity,
        just: false
    }
    Object.assign(defaults, options)
    const { width, height, size, just } = defaults
    const streamInfo = await getStreamInfo(stream)
    console.log(streamInfo.width, streamInfo.height, width, height)
    if (just && !(streamInfo.width === width && streamInfo.height === height)) {
        return {
            error: 1,
            mes: '文件尺寸不符合要求1'
        }
    }
    if (!just && (streamInfo.width > width || streamInfo.height > height)) {
        return {
            error: 1,
            mes: '文件尺寸不符合要求2'
        }
    }
    if (streamInfo.size > size) {
        return {
            error: 1,
            mes: '文件尺寸不符合要求3'
        }
    }
    const parse = path.parse(stream.filename)
    const filename = parse.name + Date.now() + parse.ext
    const fileStream = bufferToStream(streamInfo.fileBuffer)
    const target = path.join(this.config.multipart.tmpdir, defaults.path, filename)
    const writeStream = fs.createWriteStream(target)
    fileStream.pipe(writeStream)
    return {
        success: 0,
        filename,
        uploadPath: options.path,
        accessPath: path.join(this.config.static.prefix, options.path, filename),
        mes: '文件上传成功'
    }
}
