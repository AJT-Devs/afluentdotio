import { RiLoader4Fill } from "react-icons/ri";
import './spinner.css';

export default function Spinner() {
  return (
    <div className="spinner-overlay">
      <RiLoader4Fill className="spinner-icon" />
    </div>
  );
}