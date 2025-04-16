import { useState } from "react";

const SplitForm = ({ activeFriend, handleSplit }) => {
  const [formData, setFormData] = useState({
    bill: "",
    myCost: "",
    friendCost: "",
    payer: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    newFormData.friendCost = (Number(newFormData.bill) - Number(newFormData.myCost)).toString();

    setFormData(newFormData);
  };

  const handleSubmit = () => {
    if (formData.bill && formData.myCost && formData.friendCost) {
      handleSplit(formData);
    }
  };

  return (
    <form className="form-split-bill">
      <h2>SPLIT A BILL WITH {activeFriend.name}</h2>

      <label htmlFor="bill">💰Bill value</label>
      <input type="number" name="bill" min={0} step={0.01} value={formData.bill} onChange={handleChange} />

      <label htmlFor="myCost">😩Your expense</label>
      <input type="number" name="myCost" min={0} step={0.01} max={formData.bill} value={formData.myCost} onChange={handleChange} />

      <label htmlFor="friendCost">😀{activeFriend.name}'s expense</label>
      <input type="number" name="friendCost" value={formData.friendCost} onChange={handleChange} disabled />

      <label htmlFor="payer">🤔Who is paying the bill</label>
      <select name="payer" defaultValue={formData.payer} onChange={handleChange}>
        <option value={0}>You</option>
        <option value={1}>{activeFriend.name}</option>
      </select>

      <button className="button" onClick={handleSubmit}>Split bill</button>

    </form>
  );
}

export default SplitForm;