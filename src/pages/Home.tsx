import Card from "@/components/Card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchTrending } from "@/services/api";
import { Movie } from "@/services/models/interface";
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState<Movie[]>();
  const [timeWindow, setTimeWindow] = useState("day");

  useEffect(() => {
    fetchTrending(timeWindow)
      .then((res) => setData(res.results))
      .catch((error) => console.log(error));
  }, [timeWindow]);
  return (
    <div className=" max-w-6xl m-auto cursor-pointer">
      <div className="flex items-center gap-3 justify-between">
        <h1 className="text-xl py-5 text-white">Trending</h1>
        <Tabs defaultValue="day" className="w-52 ">
          <TabsList className="grid w-full grid-cols-2 bg-gray-500/20">
            <TabsTrigger
              value="day"
              onClick={() => setTimeWindow("day")}
              className="font-mono"
            >
              Day
            </TabsTrigger>
            <TabsTrigger
              value="week"
              onClick={() => setTimeWindow("week")}
              className="font-mono"
            >
              Week
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {data && data?.map((item) => <Card key={item.id} item={item} />)}
      </div>
    </div>
  );
};

export default Home;
