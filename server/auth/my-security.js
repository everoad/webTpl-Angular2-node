
'use strict'
var AuthError = require('../exception/auth.error')

var logger = require('../log/logger')
const ACCESS_DENY = 'ACCESS_DENY'


/**
 * @param {string} session
 * @param {string} idColumn
 * @param {string} roleColumn
 */
module.exports = function (session, idColumn, roleColumn) {

  if (typeof session !== 'string') {
    throw new TypeError('Session value is not String type.')
  }

  if (typeof idColumn !== 'string') {
    throw new TypeError('IdColumn is not String type.')
  }

  if (typeof roleColumn !== 'string') {
    throw new TypeError('RoleColumn is not String type.')
  }


  var module = {}
  /**
   * 
   */
  module.isAnonymous = (req, res, next) => {
    logger.info('isAnonymous')
    if (!req[session]) {
      return next()
    }
    throw new AuthError(ACCESS_DENY)

  }





  /**
   * 로그인 유무 체크.
   */
  module.isAuthenticated = (req, res, next) => {
    logger.info('isAuthenticated')
    if (req[session]) {
      return next()
    }
    throw new AuthError(ACCESS_DENY)

  }





  /**
   * 메소드 실행 전 유저 권한 체크.
   */
  module.preAuthorize = (req, res, next) => {

    logger.info('preAuthorize')
    if(req[session] && (req[session][idColumn] === req.body[idColumn])) {
      return next()
    }
    throw new AuthError(ACCESS_DENY)

  }






  /**
   * Check role. 
   * @param {object} roles
   * @return {function}
   */
  module.hasRole = function (roles) {
    if (roles.constructor !== Array) {
      throw new TypeError('Role is not Array type.')
    }

    return (req, res, next) => {
      logger.info('hasRole')
      for (let role of roles) {
        if (req[session][roleColumn] === role) {
          return next()
        }
      }
      throw new AuthError(ACCESS_DENY)
    }
  }

  return module
}