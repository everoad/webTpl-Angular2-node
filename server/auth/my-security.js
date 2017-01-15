
'use strict'

const DENY = '잘못된 접근입니다.'
const ROLE_ADMIN = 'ROLE_ADMIN'
const ROLE_USER = 'ROLE_USER'



/**
 * 
 */
exports.isAnonymous = (req, res, next) => {
  if (!req.user) {
    return next()
  }
  res.send({ result: DENY })
}



/**
 * 로그인 유무 체크.
 */
exports.isAuthenticated = (req, res, next) => {
  if (req.user) {
     return next()
  }
  res.send({ result: DENY })
}


/**
 * 메소드 실행 전 유저 권한 체크.
 */
exports.preAuthorize = (req, res, next) => {

  if(req.user && (req.user.user_email === req.body.user_email)) {
    return next()
  }
  res.send({ result: DENY })
}




/**
 * 메소드 실행 후 유저 권한 체크.
 */
exports.postAuthorize = (req, res) => {
  let result = req.result

  if(!req.user && !(req.user.user_email === result.user_email)) {
    return res.send({ result: DENY })
  }

  res.send(result)
}




/**
 * 관리자 체크. 
 */
exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.user_role === ROLE_ADMIN) {
    return next()
  }
  res.send({ result: DENY })
}
