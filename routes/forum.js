const express = require('express')
const forumRoutes = express.Router()
const Forum = require('../models').Forum

forumRoutes.use(express.json());

forumRoutes.get('/', (req, res) => {
  Forum.findAll()
    .then((result) => {
        res.send(result);
    })
    .catch((error) => res.send(error));
})

forumRoutes.get('/:id', (req, res) => {
	Forum.findOne({
    where: {
      forum_id: Number(req.params.id),
    },
  }).then((result) => {
        res.send(result);
  })
	.catch((error) => res.send(error));
})

forumRoutes.post('/', (req, res) => {
  const newForum = {
		title: req.body["title"],
		image: req.body["image"],
		description: req.body["description"],
	};    
	
	Forum.create(newForum)
		.then((result)=>{
				res.send(result);
		})
		.catch(error => console.log(error))
})

module.exports = forumRoutes