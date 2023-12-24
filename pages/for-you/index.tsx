import Sidebar from "@/components/Sidebar";
import Search from "@/components/Search";
import SelectedBook from "@/components/SelectedBook";
import RecommendedBooks from "@/components/RecommendedBooks";
import SuggestedBooks from "@/components/SuggestedBooks";

export default function forYou() {
  return (
    <section id="for-you">
      <div className="relative flex">
        <Sidebar />

        <div className="flex-grow ">
          <Search />
          <SelectedBook />
          <RecommendedBooks />
          <SuggestedBooks />
        </div>
      </div>
    </section>
  );
}
