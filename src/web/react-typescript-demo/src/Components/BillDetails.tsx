import './Component.css';
import { ReservationReturn} from '../Components/ReservationTypes';;

interface DetailsProps {
  reservation: ReservationReturn;
  onClose: () => void;
}

const BillDetails: React.FC<DetailsProps> = ({ reservation, onClose }) => {
  const charges = reservation.charge;

  const renderGridItems = () => {
    return charges.map((charge, index) => {
      const { description, timestamp, amount, type } = charge;
      const content = `Date: ${timestamp.toDateString()}, Amount: ${amount}, Type: ${type}`;
      return (
        <div className="det-container" key={index}>
          <span>{description}</span>
          <span>{content}</span>
        </div>
      );
    });
  };

  return (
    <div className="det-button-container">
      {renderGridItems()}
      <div className="button-container">
        <button className="blueButton" type="submit" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default BillDetails;
