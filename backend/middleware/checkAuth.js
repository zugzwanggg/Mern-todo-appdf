import jwt from 'jsonwebtoken'

function checkAuth(req,res,next) {
  try {

    const token = req.cookies.token
    if (!token) return res.status(401).json({
      errorMessage: 'Unauthorized'
    })

    const verified = jwt.verify(token, process.env.JWT_KEY)

    req.user = verified.user


  } catch(err) {
    console.log(err);
    res.status(401).json({
      errorMessage: 'Unauthorized'
    })
  }
}