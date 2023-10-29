import Sidebar from "@/components/Sidebar";
import Search from "@/components/Search";
import SelectedBook from "@/components/SelectedBook";

export default function forYou() {
  return (
    <section id="for-you">
      <div className="relative flex">
        <Sidebar />

        <div className="flex-grow ">
        <Search />
        <SelectedBook />
        </div>
      </div>
    </section>
  );
}
