const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const category = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const catId = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!catId) {
      res.status(404).json({ message: 'No category with ID' });
      return;
    }
    res.status(200).json(catId);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCat = await Category.create({
      category_id: req.body.category_id,
    });
    res.status(200).json(newCat);
  } catch (err) {
    res.status(400).jsoon(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const findCat = await Category.findByPk(req.params.id);

    if (findCat) {
      const upCat = await Category.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(upCat);
    } else {
      res.status(404).json({ message: 'No category found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const delCat = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!delCat) {
      res.status(404).json({ message: 'No category by that name' })
      return
    }
    res.status(200).json(delCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
