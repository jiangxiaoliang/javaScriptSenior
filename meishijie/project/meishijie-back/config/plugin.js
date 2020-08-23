'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };

exports.mongoose = {
  enable: true,
  package: 'egg-mongoose'
}

// 用于密码加密解密
exports.bcrypt = {
  enable: true,
  package: 'egg-bcrypt'
}

exports.jwt = {
  enable: true,
  package: 'egg-jwt'
}

exports.validate = {
  enable: true,
  package: 'egg-validate'
}

exports.validatePlus = {
  enable: true,
  package: 'egg-validate-plus',
}
