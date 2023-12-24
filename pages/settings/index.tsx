import RecommendedBooks from "@/components/RecommendedBooks";
import Search from "@/components/Search";
import SelectedBook from "@/components/SelectedBook";
import Sidebar from "@/components/Sidebar";
import SuggestedBooks from "@/components/SuggestedBooks";

export default function Settings() {
  return (
    <section id="settings">
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
