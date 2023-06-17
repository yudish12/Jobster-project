import React, { useEffect } from "react";
import Job from "./Job";
import Loader from "./Loader";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useDispatch, useSelector } from "react-redux";
import { getAlljobs } from "../features/AllJob slice/AlljobSlice";

const JobsContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAlljobs());
  }, []);

  const { isLoading, jobs } = useSelector((store) => store.allJobs);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader width="80" height="80" color="#2563eb" />
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>jobs info</h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
