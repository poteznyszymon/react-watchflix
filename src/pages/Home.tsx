import Card from "@/components/Card";
import { PaginationFooter } from "@/components/PaginationFooter";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchTrending } from "@/services/api";
import { Media } from "@/services/models/interface";
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState<Media[]>();
  const [timeWindow, setTimeWindow] = useState("day");
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  function handlePageChange(page: number) {
    setActivePage(page);
  }

  useEffect(() => {
    fetchTrending(timeWindow, activePage)
      .then((res) => {
        setData(res?.results);
        setTotalPages(res?.total_pages);
      })
      .catch((error) => console.log(error));
  }, [timeWindow, activePage]);
  return (
    <div className="max-w-6xl m-auto">
      <div className="flex items-center gap-3 justify-between">
        <h1 className="text-sm md:text-lg py-5 text-slate-50">
          Trending of the {timeWindow}
        </h1>
        <Tabs defaultValue="day" className="w-32 ">
          <TabsList className="grid w-full grid-cols-2 bg-gray-500/20">
            <TabsTrigger value="day" onClick={() => setTimeWindow("day")}>
              Day
            </TabsTrigger>
            <TabsTrigger value="week" onClick={() => setTimeWindow("week")}>
              Week
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {data &&
          data?.map((item) => (
            <Card key={item.id} item={item} type={item?.media_type} />
          ))}
      </div>
      <PaginationFooter
        activePage={activePage}
        totalPages={totalPages}
        handleClick={handlePageChange}
      />
    </div>
  );
};

export default Home;
