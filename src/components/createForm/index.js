import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const FormCreate = () => {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [clientName, setClientName] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [amountStatus, setAmountStatus] = useState("");
  const navigate = useNavigate();

  const invoiceNumberChange = (e) => {
    setInvoiceNumber(e.target.value);
  };

  const clientNameChange = (e) => {
    setClientName(e.target.value);
  };

  const dateChange = (e) => {
    setDate(e.target.value);
  };

  const amountChange = (e) => {
    setAmount(e.target.value);
  };

  const amountStatusChange = (e) => {
    setAmountStatus(e.target.value);
  };

  const formSubmit = async () => {
    const payload = {
      invoicenumber: invoiceNumber,
      clientname: clientName,
      date: date,
      amount: amount,
      amountStatus: amountStatus,
    };
    try {
      const response = await fetch("https://invoice-managment-backend.onrender.com/formSubmit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        navigate("/form");
      }
    } catch (e) {
      console.log(e, "fetching to send data in frontend");
    }
  };
  return (
    <>
      <div className="heading-invoice">
        <h2>Create Invoice</h2>
      </div>
      <div  className="total-main-page-container-form-create">
      <div className="form-conteiner-create">
        <div className="input-container">
          <label className="placeholder">Invoice Number</label>
          <input
            className="input"
            type="number"
            onChange={invoiceNumberChange}
            value={invoiceNumber}
          />
        </div>
        <div className="input-container">
          <label className="placeholder">Client Name</label>
          <input
            className="input"
            type="text"
            onChange={clientNameChange}
            value={clientName}
          />
        </div>
        <div className="input-container">
          <label className="placeholder">Date</label>
          <input
            className="input"
            type="date"
            onChange={dateChange}
            value={date}
          />
        </div>
        <div className="input-container">
          <label className="placeholder">Amount</label>
          <input
            className="input"
            type="number"
            onChange={amountChange}
            value={amount}
          />
        </div>
        <div className="input-container">
          <label className="placeholder">Status</label>
          <select   className="input" onChange={amountStatusChange}>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>
        <div>
          <button className="button-9" onClick={formSubmit}>
            Submit
          </button>
        </div>
      </div>
      </div>
    </>
  );
};

export default FormCreate;
