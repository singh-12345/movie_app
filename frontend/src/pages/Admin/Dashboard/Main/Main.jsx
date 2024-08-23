import SecondaryCard from "./SecondaryCard";
import VideoCard from "./VideoCard";
import ReactTimeCard from "./RealTimeCard";

import {
  useGetTopMoviesQuery,
  useGetAllMoviesQuery,
} from "../../../../redux/api/movies";
import { useGetUsersQuery } from "../../../../redux/api/users";
import RealTimeCard from "./RealTimeCard";

const Main = () => {
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: visitors } = useGetUsersQuery();
  const { data: allMovies } = useGetAllMoviesQuery();

  const totalCommentsLength = allMovies?.map((m) => m.numReviews);
  const sumOfCommentsLength = totalCommentsLength?.reduce(
    (acc, length) => acc + length,
    0
  );

  return (
    <div>
      <section className="flex justify-around ml-10">
        <div className="ml-[17rem] mt-10">
          <div className="-translate-x-4 flex bg-white rounded-xl ml-5">
            <SecondaryCard
              pill="Users"
              content={visitors?.length}
              info="20.2k more then usual"
              gradient="from-teal-700 to-lime-500"
            />
            <SecondaryCard
              pill="Comments"
              content={sumOfCommentsLength}
              info="742.8 more then usual"
              gradient="from-[#CCC814] to-[#CDCB8E]"
            />
            <SecondaryCard
              pill="Movies"
              content={allMovies?.length}
              info="372+ more then usual"
              gradient="from-green-800 to-lime-400"
            />
          </div>


          <div className="flex justify-between w-[90%] text-white mt-10 font-bold">
            <p>Top Content</p>
            <p>Comments</p>
          </div>


          {topMovies?.map((movie) => (
            <VideoCard
              key={movie._id}
              image={movie.image}
              title={movie.name}
              date={movie.year}
              comments={movie.numReviews}
            />
          ))}
        </div>

             <div>
          <RealTimeCard />
              </div>
              </section>
         </div>         
  );
};

export default Main;