const jwt = require('jsonwebtoken')

// create middileware with 3 arguments  request, response and next

const jwtMidleware = (req, res, next) => {
    console.log("inside jwtMiddileware");
    //  get token from reqHeaders
    const token = req.headers["authorization"].split(" ")[1]
   


    //  to check token is avilable
    if (token) {

        try {
            // to check token verify
            const jwtResponse = jwt.verify(token,process.env.JWT_PASSWORD)
            console.log(jwtResponse);
             
            req.userId = jwtResponse.userId

            //  move to project controller page
            next()
        } catch (err) {
            res.status(401).json("Authorization failed please Login")
        }

    }else {
        res.status(404).json("authorizationfailed... Token is missing")
    }






}

module.exports = jwtMidleware