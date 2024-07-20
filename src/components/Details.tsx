import { useParams } from "react-router-dom"

const Details = () => {
  const router = useParams();
  const {type, id} = router;
  return (
    <div className="h-screen flex justify-center items-center">{id} {type}</div>
  )
}

export default Details