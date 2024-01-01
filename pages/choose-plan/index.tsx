import Sidebar from "@/components/Sidebar";
import Search from "@/components/Search";
import SelectedBook from "@/components/SelectedBook";
import RecommendedBooks from "@/components/RecommendedBooks";
import SuggestedBooks from "@/components/SuggestedBooks";
import Footer from "@/components/Footer";

import PlansFeatures from "@/components/PlansFeatures"



export default function forYou() {
  return (
    <section id="choose-plan">
      <div className="plan__header--container rounded-b-[240px] bg-[#032b41] w-[100%]">
        <div className="row flex flex-col items-center justify-center plan__header--wrapper">
          <div className="container">
            <div className="flex flex-col text-center mx-auto justify-center items-center">
              <div className="plan__header font-semibold text-white text-5xl leading-[64px]">
                Get unlimited access to many amazing books to read
              </div>
              <div className="text-white text-xl mt-10">
                Turn ordinary moments into amazing learning opportunities
              </div>
            </div>
          </div>
          <figure>
            <img
              src="/assets/pricing-top.png"
              alt=""
              width={340}
              className="pricing__top--style"
            />
          </figure>
        </div>
      </div>
      <div className="w-screen h-screen mx-auto grid justify-center">
        <PlansFeatures />
      </div>

      <Footer />
    </section>
  );
}
