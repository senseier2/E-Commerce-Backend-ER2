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
  res.status(200).json(productInfo);
if (!productInfo) {
  res.status(404).json({message: "Please type a valid category ID!"});
  return;
}
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
        category_name: req.body.category_name
    })
    res.status(200).json(newCategory)
  } catch (err) {
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
      res.status(404).json({ message: "There are no Categories with this id!"});
    }
    res.status(200).json(updateCategory);
     } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  console.log("Hello")
  try {
    const categoryDelete = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryDelete) {
      res.status(404).json({ message: "No Category with that ID, try again buddy!"})
  }
    res.status(200).json(categoryDelete + "Category Deletion completed");
   } catch (err) {
    res.status(500).json(err);
  }
});

// router.delete('/:id', async (req, res) => {
//   // delete a category by its `id` value
//   try {
//     const categoryData = await Category.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });
//     if (!categoryData) {
//       res.status(404).json({ message: 'Invalid' });
//       return;
//     }
//     res.status(200).json(categoryData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });



module.exports = router;
