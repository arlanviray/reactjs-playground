function Suggestions({ data, handleClick }) {
  return (
    <ul>
      {data.map(({ id, firstName, lastName }) => (
        <li key={id} onClick={handleClick} data-id={id}>
          {firstName} {lastName}
        </li>
      ))}
    </ul>
  );
}

export default Suggestions;
