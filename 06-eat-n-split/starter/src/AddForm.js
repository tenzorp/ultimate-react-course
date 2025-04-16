import { useState } from "react";

const AddForm = ({ setFriendData, setAddFormOpen }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name !== "" && image !== "") {
      setFriendData((prev) => [...prev, { name, image, id: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000, balance: 0 }])
      setName("");
      setImage("");
      setAddFormOpen(false);
    }
  }

  return (
    <form className="form-add-friend">
      <label htmlFor="name">😎Friend name</label>
      <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />

      <label htmlFor="image">🧍🏻‍♀️Image URL</label>
      <input type="text" name="image" value={image} onChange={(e) => setImage(e.target.value)} />

      <button className="button" onClick={handleSubmit}>Add</button>
    </form>
  );
}

export default AddForm;