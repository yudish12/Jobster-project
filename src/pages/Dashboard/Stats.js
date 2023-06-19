import { useEffect } from "react";
import StatsContainer from "../../Components/StatsContainer";
import ChartsContainer from "../../Components/ChartsContainer";
import { useDispatch, useSelector } from "react-redux";
import { jobStats } from "../../features/AllJob slice/AlljobSlice";
import Loader from "../../Components/Loader";

const Stats = () => {
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.allJobs
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(jobStats());
    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader width="80" height="80" color="#2563eb" />;
      </div>
    );
  }
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
