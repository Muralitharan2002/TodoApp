const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    try {
        const token = req.cookies.Token;
        // console.log("Token got", token);

        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, (err, result) => {
                {
                    if (err) {
                        return res.status(401).json({ message: "authentication failed", status: "error", Error: err.message });
                    }

                    req.data = result;
                    next();
                }
            })
        } else {
            return res.json({ message: "authentication missing", status: "error" });
        }
    } catch (err) {
        console.log("authentication missing", err);
        return res.status(500).json({ message: "authentication process failed", status: "error", Error: err.message });
    }
}

module.exports = authenticate;