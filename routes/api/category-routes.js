const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryInfo = await Category.findAll({
      include: [{ model: Product }],
    })
    res.status(200).json(categoryInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const productInfo = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
if (!productInfo) {
  res.status(404).json({message: "Please type a valid category ID!"});
  return;
}
  } catch {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
        product_id: req.body.product_id,
    })
    res.status(200).json(newCategory)
  } catch {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateCategory) {
      res.status(404).json({ message: "There are no Categories with this id!"})
    }
     } catch (err) {
    res.status(500).json(err);
  }

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryInfo = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

  if (categoryInfo) {
    res.status(404).json({ message: "No Category with that ID, start over you fool!!!"});
    return;
  }
  res.status(200).json(categoryInfo);
  } catch {
    res.status(500).json(err);
  }
});

module.exports = router;
