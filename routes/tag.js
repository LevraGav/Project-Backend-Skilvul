const express = require('express')
const tagRoutes = express.Router()
const Tag = require('../models').Tag

tagRoutes.use(express.json());

tagRoutes.get('/', (req, res) => {
  Tag.findAll()
    .then((result) => {
        res.send(result);
    })
    .catch((error) => res.send(error));
})

tagRoutes.get('/:id', (req, res) => {
	Tag.findOne({
    where: {
      tag_id: Number(req.params.id),
    },
  }).then((result) => {
        res.send(result);
  })
	.catch((error) => res.send(error));
})

tagRoutes.post('/', (req, res) => {
  const newTag = {
		title: req.body["title"]
	};    
	
	Tag.create(newTag)
		.then((result)=>{
			res.send(result);
		})
		.catch(error => console.log(error))
})

module.exports = tagRoutes