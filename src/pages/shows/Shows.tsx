import Card from "@/components/Card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchShows } from "@/services/api";
import { Media } from "@/services/models/interface";
import { useEffect, useState } from "react";

const Shows = () => {
  const [data, setData] = useState<Media[]>();
  const [type, setType] = useState("popular");

  useEffect(() => {
    fetchShows(type)
      .then((res) => setData(res.results))
      .catch((error) => console.log(error));
  }, [type]);

  return (
    <div className="max-w-6xl m-auto">
      <div className="flex items-center gap-3 justify-between">
        <h1 className="text-sm md:text-lg py-5 text-slate-50">
          Discover TV shows
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {data && data?.map((item) => <Card key={item.id} item={item} />)}
      </div>
    </div>
  );
};

export default Shows;
