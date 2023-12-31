import RecommendedBooks from "@/components/RecommendedBooks";
import Search from "@/components/Search";
import SelectedBook from "@/components/SelectedBook";
import Sidebar from "@/components/Sidebar";
import SuggestedBooks from "@/components/SuggestedBooks";

export default function Library() {
  return (
    <section id="library">
      <div className="relative flex">
        <Sidebar />

        <div className="flex-grow ">
          <Search />
          <div className="container row mx-auto justify-center items-center">
            Hello World!
          </div>
        </div>
      </div>
    </section>
  );
}
