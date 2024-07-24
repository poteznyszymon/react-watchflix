import { fetchDetails, imagePath, imagePathOriginal } from "@/services/api";
import "react-circular-progressbar/dist/styles.css";
import { Media } from "@/services/models/interface";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Details = () => {
  const router = useParams();
  const { type, id } = router;
  const [data, setData] = useState<Media>();

  useEffect(() => {
    fetchDetails(type || "", id || "")
      .then((res) => {
        setData(res);
      })
      .catch((error) => console.log(error));
  }, [type, id]);

  const backgroundImage = data?.backdrop_path
    ? `${imagePathOriginal}/${data.backdrop_path}`
    : "";

  return (
    <div
      className="flex gap-5 bg-cover justify-center sm:justify-start"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.1)), linear-gradient(to left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.1)), url(${backgroundImage})`,
      }}
    >
      <div className="w-2/4  justify-end hidden sm:flex">
        <img
          src={`${imagePath}/${data?.poster_path}`}
          alt=""
          className="h-[27rem]"
        />
      </div>
      <div className="flex flex-col justify-center gap-3 w-3/4">
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
          {data?.genres?.map((category) => <Badge>{category.name}</Badge>)}
        </div>
      </div>
    </div>
  );
};

export default Details;
