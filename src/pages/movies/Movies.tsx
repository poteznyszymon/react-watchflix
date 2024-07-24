import Card from "@/components/Card";
import { PaginationFooter } from "@/components/PaginationFooter";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchMovies } from "@/services/api";
import { Media } from "@/services/models/interface";
import { useEffect, useState } from "react";

const Movies = () => {
  const [data, setData] = useState<Media[]>();
  const [type, setType] = useState("popular");
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  function handlePageChange(page: number) {
    setActivePage(page);
  }

  useEffect(() => {
    setIsLoading(true);
    fetchMovies(type, activePage)
      .then((res) => {
        setData(res?.results);
        setTotalPages(res?.total_pages);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [type, activePage]);

  return (
    <div className="max-w-6xl m-auto">
      <div className="flex items-center gap-3 justify-between">
        <h1 className="text-sm md:text-lg py-5 text-slate-50">
          Discover movies
        </h1>
        <Tabs defaultValue="popular" className="w-42 ">
          <TabsList className="grid w-full grid-cols-2 bg-gray-500/20">
            <TabsTrigger
              value="popular"
              onClick={() => {
                setType("popular");
              }}
            >
              Popular
            </TabsTrigger>
            <TabsTrigger
              value="top_rated"
              onClick={() => {
                setType("top_rated");
              }}
            >
              Top rated
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ${isLoading ? "gap-4" : "gap-3"}`}
      >
        {isLoading
          ? Array.from({ length: 20 }).map((_, index) => (
              <Skeleton
                className="w-[100%] aspect-[2/3] rounded-none"
                key={index}
              />
            ))
          : data?.map((item) => (
              <Card key={item.id} item={item} type={"movie"} />
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

export default Movies;
