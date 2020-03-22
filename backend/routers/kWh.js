var express = require('express');
var router = express.Router();
var kHwModel = require('../model/data_test')
/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    let data = await kHwModel.getList();
    data = data.sort((a, b) => {
      return new Date(a.create_date) - new Date(b.create_date)
    });
    res.json(data);
  } catch (error) {
    throw error;
  }
});

router.get('/:month', async function (req, res, next) {
  try {
    let data = await kHwModel.getListByMonth(req.params.month);
    data = data.sort((a, b) => {
      return new Date(a.create_date) - new Date(b.create_date)
    });
    if (data.length === 0) {
      data['status'] = 400
    }else {
      data['status'] = 200
    }
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
