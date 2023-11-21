import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const NonAuthorizedHeaderPart = () => {
  return (
    <div className="button-standart">
      <Link href={"/login/"}>
        <FontAwesomeIcon icon={faSignIn} />
      </Link>
    </div>
  );
};

export default NonAuthorizedHeaderPart;
