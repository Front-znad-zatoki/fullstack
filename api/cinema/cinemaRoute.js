import express from 'express';
// Cinema model
import { check, validationResult } from 'express-validator';
import Cinema from './Cinema.js';
import authMiddleware from '../authentication/authMiddleware.js';
import adminMiddleware from '../admin/adminMiddleware.js';

const router = express.Router();

// @route GET api/cinemas
// @desc Get all cinemas
// @access Public
router.get('/', async (req, res) => {
  try {
    const cinemas = await Cinema.find();
    if (!cinemas) {
      return res.status(404).json({ msg: 'No cinemas found' });
    }
    res.status(200).json(cinemas);
  } catch (e) {
    res.status(500).send(e);
  }
});

// @route POST api/cinemas
// @desc Create a Cinema
// @access Admin
router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  check('country', 'Country is required')
    .notEmpty()
    .isString()
    .trim(),
  check('city', 'City is required').notEmpty().isString().trim(),
  check('street', 'Street is required').notEmpty().isString().trim(),
  check('email', 'Please include a valid email')
    .isEmail()
    .trim()
    .normalizeEmail(),
  check('phone', 'Phone is required').notEmpty().isString().trim(),
  check('hours.open', 'Opening hour is required (0-23)')
    .notEmpty()
    .isFloat({ min: 0, max: 23 }),
  check('hours.close', 'Closing tima is required (0-23)')
    .notEmpty()
    .isFloat({ min: 0, max: 23 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { country, city, street, email, phone, hours } = req.body;

    try {
      const newCinema = new Cinema({
        country,
        city,
        street,
        email,
        phone,
        hours,
      });
      await newCinema.save();
      res
        .status(201)
        .json({ msg: 'New cinema created', cinema: newCinema })
        .end();
    } catch (e) {
      res.status(400).send(e);
    }
  },
);

// @route GET api/cinemas/:id
// @desc Get a Cinema
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const cinema = await Cinema.findById(req.params.id);
    if (!cinema) {
      res.status(404).json({
        error: `Cannot find cinema with id: ${req.params.id}`,
      });
    }
    res.status(200).json(cinema);
  } catch (e) {
    res.status(500).send(e);
  }
});

// @route DELETE api/cinemas/:id
// @desc Delete a Cinema
// @access Admin
router.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const cinema = await Cinema.findByIdAndDelete(req.params.id);
      if (!cinema) {
        res.status(404).json({
          error: `Cannot find cinema with id: ${req.params.id}`,
        });
      }
      res.status(200).json({ msg: 'Cinema deleted' }).end();
    } catch (e) {
      res.status(500).send(e);
    }
  },
);

// @route PUT api/cinemas/:id
// @desc Change in a Cinema
// @access Admin
router.put(
  '/:id',
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const { country, city, street, email, phone, hours } = req.body;
    try {
      const newCinema = await Cinema.findById(req.params.id);
      if (!newCinema) {
        res.status(404).json({
          error: `Cannot find cinema with id: ${req.params.id}'`,
        });
        return;
      }
      if (country !== undefined) {
        newCinema.country = country;
      }
      if (city !== undefined) {
        newCinema.city = city;
      }
      if (street !== undefined) {
        newCinema.street = street;
      }
      if (email !== undefined) {
        newCinema.email = email;
      }
      if (phone !== undefined) {
        newCinema.phone = phone;
      }
      if (hours !== undefined) {
        newCinema.hours = hours;
      }
      await newCinema.save();
      res
        .status(200)
        .json({ message: 'Cinema updated successfully', newCinema });
    } catch (e) {
      res.status(400).send(e);
    }
  },
);

export default router;
