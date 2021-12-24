const TAG_MODEL = require("../models").Tag;

class TagController {
  // POST New Tag
	static postNewTag(req, res) {
    try{
      const newTag = {
        title: req.body.title,
      }
      TAG_MODEL.create(newTag)
        .then(result => {
        res.status(200).json({ 
          message: 'Success post new Tag!', 
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

  // GET All Tags
  static async getAllTags(req, res) {
    try {
      const dataTag = await TAG_MODEL.findAll();

      if (dataTag.length != 0) {
        res.status(200).send({
          message: "Success Get All Tags",
          tags: dataTag,
        });
      } else {
        res.status(404).send({
          message: "Data Tags is Empty",
        });
      }
    } catch (error) {
      res.status(500).send({
        error: error.message || "Internal Server Error",
      });
    }
  }

	// GET Tag by Id
  static async getTagbyId(req, res) {
    try {
      const tagID = req.params.id;

      const dataTag = await TAG_MODEL.findOne({
        where: {
          tag_id: Number(tagID),
        },
      });

      if (dataTag) {
        res.status(200).send({
          message: `Success Get Tag where Tag Id is ${tagID}`,
          tags: dataTag,
        });
      } else {
        res.status(404).send({
          message: `Data Tag where Tag Id is ${tagID} Not Found`,
        });
      }
    } catch (error) {
      res.status(500).send({
        error: error.message || "Internal Server Error",
      });
    }
  }

	// UPDATE Tag by Id
  static async updateTagById(req, res) {
    try {
      const tagID = req.params.id;
			console.log(tagID);
      const { title } = req.body;

      const updateTag = {
        title: title,
				createdAt: new Date(),
				updatedAt: new Date()
      };

      const dataTag = await TAG_MODEL.findOne({
        where: {
          tag_id: Number(tagID),
        },
      });

      if (dataTag) {
        await TAG_MODEL.update(updateTag, {
          where: {
            tag_id: Number(tagID),
          },
        });
        res.status(200).send({
          message: `Data Tag where Tag Id is ${tagID} was Updated Successfully`,
          updatedTag: updateTag,
        });
      } else {
        res.status(404).send({
          message: `Data Tag where Tag Id is ${tagID} Not Found`,
        });
      }
    } catch (error) {
      res.status(500).send({
        error: error.message || "Internal Server Error",
      });
    }
  }

	// DELETE Tag by Id
  static async deleteTagById(req, res) {
    try {
      const tagID = req.params.id;

      const dataTag = await TAG_MODEL.findOne({
        where: {
          tag_id: Number(tagID),
        },
      });

      if (dataTag) {
        await TAG_MODEL.destroy({
          where: {
            tag_id: Number(tagID),
          },
        });
        res.status(200).send({
          message: `Data Tag where Tag Id is ${tagID} was Deleted Successfully`,
          deletedTag: dataTag,
        });
      } else {
        res.status(404).send({
          message: `Data Tag where Tag Id is ${tagID} Not Found`,
        });
      }
    } catch (error) {
      res.status(500).send({
        error: error.message || "Internal Server Error",
      });
    }
  }
}

module.exports = TagController;