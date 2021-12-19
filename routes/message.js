const express = require('express')
const messageRoutes = express.Router()
const Message = require('../models').Message

messageRoutes.use(express.json());

messageRoutes.get('/', (req, res) => {
  Message.findAll()
    .then((result) => {
        res.send(result);
    })
    .catch((error) => res.send(error));
})

messageRoutes.post('/', (req, res) => {
  const newMessage = {
		context: req.body["context"],
        user_id: req.body["message"]
	};    
	
	Message.create(newMessage)
		.then((result)=>{
			res.send(result);
		})
		.catch(error => console.log(error))
})

module.exports = messageRoutes