const Credits = () => {
    const gitHubProfileUrl = 'https://github.com/Abraao-S';
    const gitHubUserName = 'Abraao-S';

    return (
        <h5>
            Developed by 
            <a href={gitHubProfileUrl}> 
            &nbsp; {gitHubUserName}
            </a>
        </h5>
    )
}

export default Credits