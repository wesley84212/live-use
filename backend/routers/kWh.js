var express = require('express');
var router = express.Router();
var kHwModel = require('../model/data_test')
/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const data = await kHwModel.getList();
    res.json(data);
  } catch (error) {
    throw error;
  }
});

router.post('/create', async function (req, res) {
  try {
    const result = await kHwModel.createList(req.body.data);
    res.json(result);
  } catch (error) {
    throw error;
  }
})

module.exports = router;
