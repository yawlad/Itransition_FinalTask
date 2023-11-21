import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

interface AuthorizedHeaderPartData {
  username: string;
}

const AuthorizedHeaderPart = ({ username }: AuthorizedHeaderPartData) => {
  return <div className="cursor-pointer">{username} <FontAwesomeIcon icon={faArrowDown}/></div>;
};

export default AuthorizedHeaderPart;
