import {
  fetchCredits,
  fetchDetails,
  imagePath,
  imagePathOriginal,
} from "@/services/api";
import "react-circular-progressbar/dist/styles.css";
import { Cast, Media } from "@/services/models/interface";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Skeleton } from "@/components/ui/skeleton";

const Details = () => {
  const router = useParams();
  const { type, id } = router;
  const [data, setData] = useState<Media>();
  const [castData, setCastData] = useState<Cast[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchDetails(type || "", id || "")
      .then((res) => {
        setData(res);
        fetchCredits(type || "", id || "").then((res) => {
          setCastData(res?.cast);
          setIsLoading(false);
        });
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [type, id]);

  const backgroundImage = data?.backdrop_path
    ? `${imagePathOriginal}/${data.backdrop_path}`
    : "";

  return (
    <div>
      <div
        className="flex gap-5 bg-cover justify-center sm:justify-start"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1)), linear-gradient(to left, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1)), url(${backgroundImage})`,
        }}
      >
        <div className="w-2/4  justify-end hidden sm:flex">
          <img
            src={`${imagePath}/${data?.poster_path}`}
            alt=""
            className="h-[27rem]"
          />
        </div>
        <div className="flex flex-col justify-center gap-3 w-4/4 sm:w-5/6 ">
          <h1 className="text-2xl font-bold">
            {data?.name || data?.title}{" "}
            <span className="font-normal">
              (
              {data?.first_air_date?.slice(0, 4) ||
                data?.release_date?.slice(0, 4)}
              )
            </span>
          </h1>
          <p className="flex items-center text-white/50 gap-1">
            <FaCalendarAlt />
            {data?.first_air_date || data?.release_date}
          </p>
          <section className="flex gap-2 items-center">
            <div>
              <CircularProgressbar
                minValue={0}
                maxValue={100}
                value={Number(data?.vote_average.toFixed(1)) * 10}
                text={`${Number(data?.vote_average.toFixed(1) || 0) * 10}%`}
                className="w-12 h-12"
              />
            </div>
            <Button variant={"outline"}>Add to watchlist</Button>
          </section>
          <h1 className="font-bold text-lg">Overview</h1>
          <p className="w-full line-clamp-[7] sm:w-3/4">{data?.overview}</p>
          <div className="flex gap-2">
            {data?.genres?.map((category) => (
              <Badge>{category.name.toLowerCase()}</Badge>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-6xl m-auto">
        <h1 className="text-2xl font-bold pt-5">Cast</h1>
        <div className="flex gap-2 overflow-scroll py-5 scroll-smooth">
          {!isLoading
            ? castData?.map((item) => (
                <div className="min-w-36 max-w-36 aspect-[3/4]">
                  <img
                    className="h-52"
                    src={
                      item?.profile_path
                        ? `${imagePath}/${item?.profile_path}`
                        : "https://placehold.co/530x800"
                    }
                    alt="image_photo"
                  />
                  <p className="text-sm">{item?.name}</p>
                  <p className="text-xs text-gray-500">{item?.character}</p>
                </div>
              ))
            : Array.from({ length: 20 }).map((_, index) => (
                <Skeleton
                  className="min-w-36 aspect-[3/4] rounded-none"
                  key={index}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
