const getJobApplication = () => {
    const jobApplication = localStorage.getItem('job-application');
    if(jobApplication) {
        return JSON.parse(jobApplication);
    }

    return [];
}


const setJobApplication = id => {
    const jobApplications = getJobApplication();

    const exists = jobApplications.find(jobId => jobId === id);

    if(!exists) {
        jobApplications.push(id);
        localStorage.setItem('job-application', JSON.stringify(jobApplications));
    }

}

export {getJobApplication, setJobApplication};