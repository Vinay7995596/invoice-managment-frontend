import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./index.css";

const Invoice = () => {
  const [data, setData] = useState([]);
  const [mofifyData, setModifyData] = useState("");
  const [modifiedValue, setModifiedValue] = useState("");
  const navigate = useNavigate();

  const formadding = () => {
    navigate("/create-form");
  };

  const updateButton = (id) => {
    setModifyData(id);
  };

  const logout = () => {
    navigate("/");
  };

  const valueChange = (e) => {
    setModifiedValue(e.target.value);
  };

  const UpdatingStatus = async () => {
    console.log(modifiedValue);
    console.log(mofifyData);
    const payload = {
      updateStatus: modifiedValue,
      id: mofifyData,
    };
    try {
      const response = await fetch("https://invoice-managment-backend.onrender.com/updatedata", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response) {
        setModifyData("");
        setData((prevData) =>
          prevData.map((item) =>
            item._id === mofifyData ? { ...item, amountStatus: modifiedValue } : item
          )
        );
      } else {
        console.log("error in response payload");
      }
    } catch (e) {
      console.log(e, "error in sending data frontend");
    }
  };

  useEffect(() => {
    const fetchingDetails = async () => {
      try {
        const response = await fetch(
          "https://invoice-managment-backend.onrender.com/fetching-details"
        );
        if (response.ok) {
          const result = await response.json();
          console.log(result.response);
          setData(result.response);
        }
      } catch (e) {
        console.log(e, "error in fetching details");
      }
    };
    fetchingDetails();
  }, []);

  return (
    <>
      <div className="heading-invoice">
        <h2>Invoice Details</h2>
      </div>
      <div className="button-container-form">
        <div className="">
          <button onClick={formadding} className="button-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="20"
              fill="currentColor"
              class="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
              />
            </svg>
            Add
          </button>
        </div>
        <div>
          <button className="button-4" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Client Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((items) => (
              <tr key={items._id}>
                <td>{items.invoiceNumber}</td>
                <td>{items.clientName}</td>
                <td>{items.amount}</td>
                <td>{items.date}</td>
                <td>
                  {mofifyData ? (
                    <>
                      {items._id === mofifyData ? (
                        <select onChange={valueChange}>
                          <option value="unpaid">Un Paid</option>
                          <option value="pending">Pending</option>
                          <option value="paid">Paid</option>
                        </select>
                      ) : (
                        items.amountStatus
                      )}
                    </>
                  ) : (
                    items.amountStatus
                  )}
                </td>
                <td>
                  {mofifyData ? (
                    items._id === mofifyData ? (
                      <button
                        className="button-34"
                        onClick={() => UpdatingStatus(items._id)}
                      >
                        Done
                      </button>
                    ) : (
                      <button
                        className="button-34"
                        onClick={() => updateButton(items._id)}
                      >
                        Update
                      </button>
                    )
                  ) : (
                    <button
                      className="button-34"
                      onClick={() => updateButton(items._id)}
                    >
                      Update
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Invoice;
