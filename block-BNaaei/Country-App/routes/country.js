var express = require('express');
var User = require('../models/User');
var State = require('../models/State');
var Country = require('../models/Country');
var router = express.Router();

//create new country

router.get('/', (req, res, next) => {
  Country.find({}, (err, country) => {
    if (err) return next(err);
    res.status(200).json({ country });
  });
});

router.post('/new', (req, res, next) => {
  let data = req.body;
  Country.create(data, (err, createdCountry) => {
    if (err) return next(err);
    res.status(200).json({ createdCountry });
  });
});

//update country
router.get('/:id/update', (req, res, next) => {
  let countryId = req.params.id;

  Country.findById(countryId, (err, country) => {
    if (err) return next(err);
    res.json({ country });
  });
});

router.post('/:id/update', (req, res, next) => {
  let countryId = req.params.id;

  let data = req.body;

  Country.findByIdAndUpdate(countryId, data, (err, updatedCountry) => {
    if (err) return next(err);
    res.json({ updatedCountry });
  });
});

//add state to country

router.post('/:id/state/add', (req, res, next) => {
  let countryId = req.params.id;

  let data = req.body;
  data.country = countryId;
  State.create(data, (err, createdState) => {
    if (err) return next(err);

    Country.findByIdAndUpdate(
      countryId,
      {
        $push: { states: createdState.id },
      },
      (err, country) => {
        if (err) return next(err);
        res.json({ createdState, country });
      }
    );
  });
});

module.exports = router;
