//gate keeping middleware
const adminCheck = (req, res, next) => {
  if (!req.user || (req.user && !req.user.isAdmin)) {
    const error = new Error('You do not have Administrator access!')
    error.status = 401
    return next(error)
  } else {
    next()
  }
}

module.exports = adminCheck
