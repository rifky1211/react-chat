const User = require("../models/User");
const secretKey = "reactchat";
var jwt = require("jsonwebtoken");
module.exports = {
    get: async(req, res) => {
        try {
            const data = await User.find();
            res.status(200).json(data);
          } catch (err) {
            res.status(500).json({
              success: false,
              message: "something is wrong",
              err,
            });
          }
    },

    register: async(req, res) => {
        try {
            const user = await User.create(req.body);
            if (!user)
              return res.json({
                success: false,
                message: "Authentication failed. User not found.",
              });
        
             user.validatePassword(req.body.password, async function (err, match) {
              try {
                if (err || !match)
                  return res.json({
                    success: false,
                    message: "Authentication failed. Wrong password.",
                  });
        
                var token = jwt.sign(
                  {
                    id: user._id,
                    email: user.email,
                  },
                  secretKey,
                  { expiresIn: 60 * 60 }
                );
        
                // return the information including token as JSON
                await User.findByIdAndUpdate(user._id, {
                  token: token,
                });
        
                res.status(201).json({
                 data: {
                   email: user.email,
                   fullname: user.fullname
                 },
                  
                  token: token,
                });
              } catch (err) {
                res.status(500).json({message:"a", err });
              }
            });
          } catch (err) {
            res.status(500).json({message:"b", err });
          }
    },
    login: async(req, res) => {
        try {
            const user = await User.findOne({
              email: req.body.email,
            });
            if (!user)
              return res.json({
                success: false,
                message: "Authentication failed. User not found.",
              });
        
            user.validatePassword(req.body.password, async function (err, match) {
              try {
                if (err || !match)
                  return res.json({
                    success: false,
                    message: "Authentication failed. Wrong password.",
                  });
        
                var token = jwt.sign(
                  {
                    id: user._id,
                    email: user.email,
                  },
                  secretKey,
                  { expiresIn: 60 * 60 }
                );
        
                // return the information including token as JSON
                const inputToken = await User.findByIdAndUpdate(user._id, {
                  token: token,
                });
        
                res.status(201).json({
                  data: {
        
                    email: user.email
                  },
                  token: token
                });
              } catch (err) {
                res.status(500).json({ err });
              }
            });
          } catch (err) {
            res.status(500).json({ err });
          }
    }
}