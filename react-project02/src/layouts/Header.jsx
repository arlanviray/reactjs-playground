import { Link } from "react-router-dom";
import logo from "../assets/logo-av.png";

function Header() {
  return (
    <header>
      <Link to="/">
        <img src={logo} width={40} />
      </Link>
    </header>
  );
}

export default Header;
