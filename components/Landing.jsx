import LoginModal from "@/components/modals/LoginModal";
import landing from "../public/assets/landing.png";
import Image from "next/image";

export default function Landing() {
  return (
    <section id="landing">
      <div className="row">
        <div className="container">
          <div className="landing__wrapper">
            <div className="landing__content">
              <div className="landing__content__title">
                Gain more knowledge <br className="remove--tablet" />
                in less time
              </div>
              <div className="landing__content__subtitle">
                Great summaries for busy people,
                <br className="remove--tablet" />
                individuals who barely have time to read,
                <br className="remove--tablet" />
                and even people who don’t like to read.
              </div>
              <LoginModal />
            </div>
            <figure className="landing__image--mask">
              <Image src={landing} alt="landing" />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
