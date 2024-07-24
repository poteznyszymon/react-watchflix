import Card from "@/components/Card";
import { Input } from "@/components/ui/input";
import { searchData } from "@/services/api";
import { Media } from "@/services/models/interface";
import { useEffect, useState } from "react";

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState<Media[]>([]);

  useEffect(() => {
    searchData(inputValue)
      .then((res) => {
        console.log(res?.results);
        if (res?.results.length > 0) {
          setData(res?.results);
        }
      })
      .catch((error) => console.log(error));
  }, [inputValue]);

  return (
    <div className="max-w-6xl m-auto">
      <div className="pb-3">
        <Input
          placeholder="Search movie or tv show"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3`}
      >
        {data
          .filter(
            (item) => item.media_type === "movie" || item.media_type === "tv"
          )
          .map((item, idx) => (
            <Card key={idx} item={item} type={item.media_type}></Card>
          ))}
      </div>
    </div>
  );
};

export default Search;
