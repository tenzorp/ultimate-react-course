import { useState } from "react";
import Sidebar from "./Sidebar";
import SplitForm from "./SplitForm";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [activeFriend, setActiveFriend] = useState(null);
  const [friendData, setFriendData] = useState(initialFriends);

  const handleSplit = (formData) => {
    let newActiveFriend = { ...activeFriend };
    if (formData.payer === 0) {
      newActiveFriend.balance += Number(formData.friendCost);
    } else {
      newActiveFriend.balance -= Number(formData.myCost);
    }

    const newFriendData = friendData.map(item => (item === activeFriend ? newActiveFriend : item))
    setFriendData(newFriendData);
    setActiveFriend(null);
  }

  return (
    <div className="app">
      <Sidebar friendData={friendData} setFriendData={setFriendData} activeFriend={activeFriend} setActiveFriend={setActiveFriend} />
      {activeFriend &&
        <SplitForm activeFriend={activeFriend} handleSplit={handleSplit} />
      }
    </div>
  )
}