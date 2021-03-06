import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../context/Auth';
import { getUsersOrder } from '../../../actions/Orders';
import OrderDetails from '../OrderDetails';

function OrderItem({ id, callback }) {
  const { userContext, dispatchUserContext } = useContext(AuthContext);
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState({ id });

  useEffect(() => {
    let isCancelled = false;
    const fetchOrder = async () => {
      try {
        if (!isCancelled) {
          const res = await getUsersOrder(id);
          if (res && res.data) setDetails(res.data);
        }
      } catch (err) {
        if (!isCancelled) throw err;
      }
    };
    fetchOrder();
    return () => {
      isCancelled = true;
    };
  }, []);
  useEffect(() => {}, [userContext]);
  const handleShowDetails = async () => {
    setShowDetails((prevState) => !prevState);
  };
  const handleDelete = async () => {
    callback(id, dispatchUserContext);
  };
  return (
    <li className="profile__list-item">
      <p>
        ORDER: <span className="profile__list-item--bold">{id}: </span>
      </p>
      <button className="button--submit" onClick={handleDelete}>
        Delete order
      </button>
      <button className="button--submit" onClick={handleShowDetails}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails ? <OrderDetails details={details.order} /> : null}
    </li>
  );
}

export default OrderItem;
