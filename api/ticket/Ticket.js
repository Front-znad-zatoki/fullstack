import mongoose from 'mongoose';

const { Schema } = mongoose;

const ticketSchema = new Schema({
  screening: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Screening',
    required: true,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  seat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seat',
    required: true,
  },
});

export default mongoose.model('Ticket', ticketSchema);
