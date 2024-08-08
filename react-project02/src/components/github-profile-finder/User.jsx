function User({ userData }) {
  const {
    avatar_url,
    login,
    name,
    company,
    followers,
    following,
    public_repos,
    created_at,
  } = userData;

  const createdDate = new Date(created_at);

  return (
    <div className="user-data">
      <img src={avatar_url} />
      <div className="info">
        <p>
          <strong>Username:</strong>{" "}
          <a href={`https://github.com/${login}`} target="_blank">
            {login}
          </a>
        </p>
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Joined:</strong>{" "}
          {`${createdDate.getDate()} ${createdDate.toLocaleString("en-us", {
            month: "short",
          })} ${createdDate.getFullYear()}`}
        </p>
        <p>
          <strong>Company:</strong> {company}
        </p>
        <p>
          <strong>Public Repos:</strong> {public_repos}
        </p>
        <p>
          <strong>Followers:</strong> {followers}
        </p>
        <p>
          <strong>Following:</strong> {following}
        </p>
      </div>
    </div>
  );
}

export default User;
