import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const NonAuthorizedHeaderPart = () => {
  return (
    <Link href={"/login/"} className="button-standart">
      <FontAwesomeIcon icon={faSignIn} />
    </Link>
  );
};

export default NonAuthorizedHeaderPart;
