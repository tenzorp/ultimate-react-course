const Friend = ({ data, activeFriend, setActiveFriend }) => {
  const owe = () => {
    if (data.balance > 0) return (
      <p className="green">{data.name} owes you ${data.balance}</p>);
    if (data.balance < 0) return (
      <p className="red">You owe {data.name} ${Math.abs(data.balance)}</p>);
    else return (
      <p>You and {data.name} are even</p>);
  };

  return (
    <li>
      <img src={data.image} alt={"profile"} />
      <h3>{data.name}</h3>
      {owe()}
      <button className="button"
        onClick={activeFriend?.name === data.name ? (() => setActiveFriend(null)) : (() => setActiveFriend(data))}>
        {activeFriend?.name === data.name ? "Close" : "Select"}
      </button>
    </li>
  );
}

export default Friend;