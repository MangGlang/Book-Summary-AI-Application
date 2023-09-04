import logo from "../public/assets/logo.png";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { openLoginModal } from "@/redux/modalSlice";


export default function LandingNavBar() {
  const dispatch = useDispatch();
  return (
    <>
      <nav className="nav">
        <div className="nav__wrapper">
          <figure className="nav__img--mask">
            <Image src={logo} alt="logo" width={200} height={46} />
          </figure>
          <ul className="nav__list--wrapper">
            <li
              className="nav__list nav__list--login"
              onClick={() => dispatch(openLoginModal())}
            >
              Login
            </li>
            <li className="nav__list nav__list--mobile">About</li>
            <li className="nav__list nav__list--mobile">Contact</li>
            <li className="nav__list nav__list--mobile">Help</li>
          </ul>
        </div>
      </nav>
    </>
  );
}
