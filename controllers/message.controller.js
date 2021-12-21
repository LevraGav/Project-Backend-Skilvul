const MESSAGE_MODEL = require("../models").Message;

class MessageController {
  // POST New Message
	static postNewMessage(req, res) {
    try{
      const newMessage = {
        context: req.body.context,
        user_id: req.userAccount.user_id
      }
      MESSAGE_MODEL.create(newMessage)
        .then(result => {
        res.status(200).json({ 
            message: 'Success post new message!', 
            result 
         })
        })
        .catch(err => res.status(400).json({ message: err }))
    } catch (error) {
      res.status(500).send({
        error: error.message || "Internal Server Error",
      });
    }
  }

  // GET All Message
  static async getAllMessage(req, res) {
    try {
      const dataMessage = await MESSAGE_MODEL.findAll();

      if (dataMessage.length != 0) {
        res.status(200).send({
          message: "Success Get All Messages",
          messages: dataMessage,
        });
      } else {
        res.status(404).send({
          message: "Data Messages is Empty",
        });
      }
    } catch (error) {
      res.status(500).send({
        error: error.message || "Internal Server Error",
      });
    }
  }
}

module.exports = MessageController;