const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagsData = await Tag.findAll({
      include: [{model: Product},{model: ProductTag}],
    });
    res.status(200).json(tagsData);
  } catch {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagsData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}, {model: ProductTag}],
    });

    if (!tagsData) {
      res.status(404).json({ message: 'Please re-enter your tag ID'});
      return;
    }
    res.status(200).json(tagsData);
  } catch {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_id: req.body.tag_id,
    });
    res.status(200).json(newTag);
  } catch {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((results) => {
    if (!results[0]) {
      res.status(404).json({
        message: `No result found with ID ${req.params.id} found. Please try again with a different ID`,
      });
      return;
    }
    res.json(result);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });

});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((results) => {
    if(!result) {
      res.status(404).json({
        message: `No results found with ID ${req.params.id} found. Please try again with a different ID.`,
      });
      return;
    }
    res.json(result);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
