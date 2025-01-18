import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./index.css";

const Invoice = () => {
  const [data, setData] = useState([]);
  const [mofifyData, setModifyData] = useState("");
  const navigate = useNavigate();

  const formadding = () => {
    navigate("/create-form");
  };

  const updateButton = (id) => {
    setModifyData(id);
  };

  useEffect(() => {
    const fetchingDetails = async () => {
      try {
        const response = await fetch("https://invoice-managment-backend.onrender.com/fetching-details");
        if (response.ok) {
          const result = await response.json();
          console.log(result.response)
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
      <div className="button-add-style"> 
      <button onClick={formadding} className="button-3"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
</svg>Add</button>
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
                        <select>
                          <option>Paid</option>
                          <option>Un Paid</option>
                          <option>Pending</option>
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
                  <button className="button-34" onClick={() => updateButton(items._id)}>
                    Update
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Invoice;
