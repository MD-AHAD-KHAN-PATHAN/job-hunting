import { useEffect, useState } from "react";
import Job from "../Job/Job";

const FeaturedJobs = () => {

    const [job, setJob] = useState([]);
    const [dataLength, setDataLength] = useState(4);

    useEffect(() => {
        fetch('jobs.json')
            .then(res => res.json())
            .then(data => setJob(data));
    }, [])

    return (
        <div>
            <div className="text-center mb-8">
                <h1 className="text-5xl font-bold mb-4">Featured Jobs</h1>
                <p>Explore thousands of job opportunities with all the information you need. Its your future</p>
            </div>
            

            <div className="grid grid-cols-2 gap-6">
                {
                    job.slice(0, dataLength).map(job => <Job job={job} key={job.id}></Job>)
                }
            </div>

            <div className={`${dataLength === job.length && 'hidden'} text-center`}>
                <button onClick={() => setDataLength(job.length)} className="btn my-10">See All Jobs</button>
            </div>
        </div>
    );
};

export default FeaturedJobs;