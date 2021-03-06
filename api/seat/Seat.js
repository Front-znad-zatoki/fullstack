import mongoose from 'mongoose';

const { Schema } = mongoose;

const seatSchema = new Schema({
  hallId: {
    type: Schema.Types.ObjectId,
    ref: 'CinemaHall',
    required: true,
  },
  row: {
    type: Number,
    required: true,
  },
  column: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('Seat', seatSchema);
