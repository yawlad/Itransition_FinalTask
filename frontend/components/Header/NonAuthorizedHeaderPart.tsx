import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const NonAuthorizedHeaderPart = () => {
  return (
    <Link className="button-standart" href={"/login/"}>
      <FontAwesomeIcon icon={faSignIn} />
    </Link>
  );
};

export default NonAuthorizedHeaderPart;
