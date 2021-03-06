import express from 'express';
import { check, validationResult } from 'express-validator';
import Seat from './Seat.js';
import CinemaHall from '../cinemaHall/CinemaHall.js';
import authMiddleware from '../authentication/authMiddleware.js';
import adminMiddleware from '../admin/adminMiddleware.js';

const router = express.Router();

// @route GET api/seats
// @desc Get all seats
// @access Public

router.get('/', async (req, res) => {
  try {
    const seats = await Seat.find();
    res.status(200).json(seats);
  } catch (e) {
    res.status(500).send(e);
  }
});

// @route POST api/seats
// @desc Create a seat
// @access Admin
router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  check('row', 'Row is required').notEmpty().isInt(),
  check('column', 'Column is required').notEmpty().isInt(),
  check('hallId', 'HallId is required').notEmpty().trim(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { hallId, row, column } = req.body;
    try {
      const cinemaHall = await CinemaHall.findById(hallId);
      if (!cinemaHall) {
        res.status(404).json({
          msg: `Cannot find cinema hall with id: ${req.params.id}'`,
        });
      }
      const seat = await CinemaHall.findOne({ row, column, hallId });
      if (seat) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Seat already exists' }] });
      }
      const newSeat = new Seat({
        hallId,
        row,
        column,
      });

      await newSeat.save();
      res
        .status(201)
        .json({ msg: 'New seat created', seat: newSeat })
        .end();
    } catch (e) {
      res.status(400).send(e);
    }
  },
);

// @route GET api/seats/:id
// @desc Get a seat
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) {
      return res.status(404).json({
        error: `Cannot find seat with id: ${req.params.id}`,
      });
    }
    return res.status(200).json(seat);
  } catch (e) {
    res.status(500).send(e);
  }
});

// @route DELETE api/seats/:id
// @desc Delete a seat
// @access Admin
router.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const seat = await Seat.findByIdAndDelete(req.params.id);
      if (!seat) {
        return res.status(404).json({
          error: `Cannot find seat with id: ${req.params.id}`,
        });
      }
      return res.status(200).json({ msg: 'Seat deleted' }).end();
    } catch (e) {
      res.status(500).send(e);
    }
  },
);

// @route PUT api/seats/:id
// @desc Change in a seat
// @access Admin
router.put(
  '/:id',
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const { hall, row, column } = req.body;
    try {
      const seat = await Seat.findById(req.params.id);
      if (!seat) {
        res.status(404).json({
          error: `Cannot find seat with id: ${req.params.id}'`,
        });
        return;
      }
      if (hall !== undefined) {
        seat.hall = hall;
      }
      if (row !== undefined) {
        seat.row = row;
      }
      if (column !== undefined) {
        seat.column = column;
      }

      await seat.save();
      res.status(200).json({
        message: 'Seat updated successfully',
        seat,
      });
    } catch (e) {
      res.status(400).send(e);
    }
  },
);

export default router;
