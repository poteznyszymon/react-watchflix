import { imagePath } from "@/services/api";
import { Media } from "@/services/models/interface";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";

interface CardProps {
  item: Media;
}

const Card = ({ item }: CardProps) => {
  const [isOnHover, setIsOnHover] = useState(false);

  return (
    <div
      className="hover:scale-[1.02] ease-in-out transition-transform duration-300 relative p-1 cursor-pointer"
      onMouseEnter={() => setIsOnHover(true)}
      onMouseLeave={() => setIsOnHover(false)}
    >
      <img src={`${imagePath}/${item?.poster_path}`} alt="image_photo" />
      <div
        className={`bg-black bottom-0 left-0 h-24 absolute w-full transition-all duration-300 ease-in-out flex flex-col justify-center items-center gap-1 ${
          isOnHover ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="font-bold truncate w-[80%] text-center">
          {item.name ? item.name : item.title}
        </h1>
        <p className="text-xs font-sans">
          {item.release_date
            ? item.release_date.slice(0, 4)
            : item.first_air_date
              ? item.first_air_date.slice(0, 4)
              : "N/A"}
        </p>
        <div className="flex justify-center items-center gap-1">
          <FaStar size={11} />
          <p className="text-xs">{item.vote_average.toFixed(1)}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
