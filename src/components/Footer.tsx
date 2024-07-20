import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="text-center text-xs flex flex-col items-center justify-center m-5">
      <Link to="https://github.com/poteznyszymon">
        <div className="flex items-center gap-1">
          <p>Created by</p>
          <FaGithub size={15} />
        </div>
      </Link>
    </div>
  );
};

export default Footer;
