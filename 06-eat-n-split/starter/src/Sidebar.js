import { useState } from "react";
import Friend from "./Friend";
import AddForm from "./AddForm";

const Sidebar = ({ friendData, setFriendData, activeFriend, setActiveFriend }) => {
  const [addFormOpen, setAddFormOpen] = useState(false);

  return (
    <div className="sidebar">
      <ul>
        {friendData.map((item, i) => (
          <Friend data={item} key={i} activeFriend={activeFriend} setActiveFriend={setActiveFriend} />
        ))}
      </ul>
      {!addFormOpen && <button className="button" onClick={() => setAddFormOpen(true)}>Add friend</button>}
      {addFormOpen &&
        <>
          <AddForm setFriendData={setFriendData} setAddFormOpen={setAddFormOpen} />
          <button className="button" onClick={() => setAddFormOpen(false)}>Close</button>
        </>
      }
    </div>
  );
}

export default Sidebar;