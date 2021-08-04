const Chat = require("../models/Chat");

module.exports = {
    read: async (req, res) => {
        try {
            const chat = await Chat.find();
            res.status(200).json(chat);
          } catch (err) {
            res.status(500).json({
              success: false,
              message: "something wrong",
              err,
            });
          }
    },
    addChat: async(req, res) => {
        try {
        const chat = await Chat.create(req.body)
        res.status(201).json({success: true, data: chat})
        }catch(err){
            res.status(500).json({
                success: false,
                message: "something wrong",
                err,
              });
        }
    }
}