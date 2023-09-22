import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getJobApplication } from "../Utility/LocalStorage";
import AppliedJob from "../Appliedjob/AppliedJob";

const AppliedJobs = () => {

    const data = useLoaderData()

    const [appliedJobs, setAppliedJobs] = useState([]);
    const [displayJobs, setDisplayJobs] = useState([]);

    useEffect(() => {
        const storedData = getJobApplication();
        const appliedJob = [];
        if (storedData.length > 0) {

            // const appliedJob = data.filter(job => storedData.includes(job.id));

            for (const id of storedData) {
                const job = data.find(job => job.id === id);
                if (job) {
                    appliedJob.push(job);
                }
            }

            setAppliedJobs(appliedJob);
            setDisplayJobs(appliedJob);
        }
    }, [data])

    const handleJobFilter = filter => {
        if(filter === 'all') {
            setDisplayJobs(appliedJobs);
        }
        else if (filter === 'remote') {
            const remoteJobs = appliedJobs.filter(job => job.remote_or_onsite === 'Remote');
            setDisplayJobs(remoteJobs);
        }
        else if (filter === 'onsite') {
            const onsiteJobs = appliedJobs.filter(job => job.remote_or_onsite === 'Onsite');
            setDisplayJobs(onsiteJobs);
        }
    }


    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-10">Applied Jobs</h1>
            <div className="text-right">
                <details className="dropdown mb-32">
                    <summary className="m-1 btn">Filter By</summary>
                    <ul className="p-4 shadow menu dropdown-content z-[1] bg-base-100 rounded-box">
                        <li onClick={() => handleJobFilter('all')}><a>All</a></li>
                        <li onClick={() => handleJobFilter('remote')}><a>Remote</a></li>
                        <li onClick={() => handleJobFilter('onsite')}><a>Onsite</a></li>
                    </ul>
                </details>
            </div>
            <div>
                {
                    displayJobs.map(job => <AppliedJob key={job.id} job={job}></AppliedJob>)
                }
            </div>
        </div>
    );
};

export default AppliedJobs;