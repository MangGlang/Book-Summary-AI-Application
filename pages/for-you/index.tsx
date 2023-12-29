import Sidebar from "@/components/Sidebar";
import Search from "@/components/Search";
import SelectedBook from "@/components/SelectedBook";
import RecommendedBooks from "@/components/RecommendedBooks";
import SuggestedBooks from "@/components/SuggestedBooks";

export default function forYou() {
  return (
    <section id="for-you">
      <div className="flex">
        <Sidebar />

        <div className="flex-row max-w-[100%] w-full">
          <Search />
          <div className="row">
            <div className="container">
              <SelectedBook />
              <RecommendedBooks />
              <SuggestedBooks />
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
