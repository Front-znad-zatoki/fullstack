import { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ReservationContext } from '../../../context/Reservation';
import { AuthContext } from '../../../context/Auth';
import { loadUser } from '../../../actions/Auth';
import { placeOrder } from '../../../actions/Reservation';

function ReservationForm() {
  const { reservation, dispatchReservation } = useContext(ReservationContext);
  const { movieDetails, selectedSeats } = reservation;
  const { _id } = reservation.screening;
  const { userContext, dispatchUserContext } = useContext(AuthContext);
  const { isAuthenticated, user } = userContext;
  const history = useHistory();
  const [formData, setFormData] = useState({
    status: 'pending',
    screening: _id,
    ticketsData: selectedSeats,
    email: user && user.email ? user.email : '',
    // phone: user.phone ? user.phone : '',
  });

  useEffect(() => {
    if (user.id && !user.email) {
      loadUser(dispatchUserContext);
    }
  }, []);
  useEffect(() => {
    setFormData({
      ...formData,
      user: user.id || '',
      email: user && user.email ? user.email : '',
    });
  }, [user]);

  const { email, phone } = formData;

  const onChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const wasPlaced = await placeOrder(formData, dispatchReservation);
    if (!wasPlaced) {
      alert('Could post order. Try again');
      return;
    }
    history.push('/reservation/confirmation');
  };
  const handleGoBack = (event) => {
    event.preventDefault();
    history.push(`/reservation/seats/${_id}`);
  };
  return (
    <form className="reservation__form" onSubmit={onSubmit}>
      Rendering Reservation Form
      <label htmlFor="reservationEmail" className="auth__form-group">
        <input
          type="email"
          id="reservationEmail"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
      </label>
      {/* <label htmlFor="reservationPhone" className="auth__form-group">
        <input
          type="string"
          id="reservationPhone"
          placeholder="Phone Number"
          name="phone"
          value={phone}
          onChange={onChange}
          required
        />
      </label> */}
      <div className="button__group">
        <button onClick={handleGoBack}>Go Back</button>
        <button type="submit" className="button--submit">
          Confirm your reservation
        </button>
      </div>
    </form>
  );
}

export default ReservationForm;
