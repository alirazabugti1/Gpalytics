import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import './Sendbutton.css';

const SendButton = ({ sendMessage }) => {
  return (
    <button className="send-btn" onClick={sendMessage}>
      <FontAwesomeIcon icon={faPaperPlane} />
    </button>
  );
};

export default SendButton;
