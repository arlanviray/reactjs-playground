function SelectedUser({ data }) {
  const { firstName, lastName, image, age, gender } = data[0];

  return (
    <div className="selected-user">
      <img src={image} />
      <h2>
        {firstName} {lastName}
      </h2>
      <p>
        <span>{gender}</span>, {age} years old
      </p>
    </div>
  );
}

export default SelectedUser;
