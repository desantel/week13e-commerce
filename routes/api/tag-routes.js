const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagAll = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(tagAll);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagId = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagId) {
      res.status(404).json({ message: 'Unable to find tag' });
      return;
    }
    res.status(200).json(tagId);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_id: req.body.tag_id,
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).jsoon(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const findCat = await Tag.findByPk(req.params.id);

    if (findCat) {
      const upTag = await Tag.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(upTag);
    } else {
      res.status(404).json({ message: 'No tag found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const delTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!delTag) {
      res.status(404).json({ message: 'No tag found' });
      return;
    }
    res.status(200).json(delTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
