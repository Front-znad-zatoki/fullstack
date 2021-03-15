/* eslint-disable no-await-in-loop */
import mongoose from 'mongoose';
import Seat from '../seat/Seat.js';
import Screening from '../screening/Screening.js';

const { Schema } = mongoose;

const cinemaHallSchema = new Schema({
  name: { type: String, required: true, unique: true },
  rows: { type: Number, required: true },
  columns: { type: Number, required: true },
  cinema: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Cinema',
  },
});

cinemaHallSchema.statics.generateSeats = async function generateSeats(
  cinemaHallId,
  rows,
  columns,
  cb,
) {
  try {
    for (let i = 0; i < rows; i += 1) {
      for (let j = 0; j < columns; j += 1) {
        const seat = new Seat({
          hall: cinemaHallId,
          row: i,
          column: j,
        });
        await seat.save();
      }
    }
  } catch (err) {
    return cb(err);
  }
};

cinemaHallSchema.statics.deleteSeats = async function deleteSeats(
  cinemaHallId,
  cb,
) {
  try {
    await Seat.deleteMany({
      hall: cinemaHallId,
    });
  } catch (err) {
    return cb(err);
  }
};
cinemaHallSchema.statics.deleteScreenings = async function deleteScreenings(
  cinemaHallId,
  cb,
) {
  try {
    await Screening.deleteMany({
      cinemaHall: cinemaHallId,
    });
  } catch (err) {
    return cb(err);
  }
};

export default mongoose.model('CinemaHall', cinemaHallSchema);
