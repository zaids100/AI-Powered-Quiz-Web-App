const User = require('../Models/User.js');
const jwt=require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ msg: "User already exists,you can login", success: false });
        }
        const encryptedPass = await bcrypt.hash(password, 10);
        const userModel = await User.create({ name: name, email: email, password: encryptedPass });

        res.status(200).json({
            msg: "Signup Success",
            success: true
        })

    } catch (err) {
        res.status(500).json({
            msg: "Internal server error",
            success: false
        })
    }
}

const login = async (req,res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });

        if(!user){
            return res.status(403).json({
                msg : "Authentication Failed Email or Password is wrong",
                success : false
            })
        }
        const isPassEqual=await bcrypt.compare(password,user.password);
        if(!isPassEqual){
            return res.status(403).json({
                msg : "Authentication Failed Email or Password is wrong",
                success : false
            })
        }

        const jwToken=jwt.sign({email : user.email,_id : user._id},
            process.env.JWT_SECRET,
            {expiresIn : '24h'}
        );
        
        console.log(jwToken);

        res.status(200).json({
            msg : "Login Success",
            success : true,
            jwToken,
            email,
            name : user.name
        });
    } catch (err) {
        res.status(500).json({
            msg: "Internal server error",
            success: false
        })
    }
}

module.exports = {
    signup,
    login,
}