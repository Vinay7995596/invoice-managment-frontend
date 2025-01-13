import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

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
        const response = await fetch("http://localhost:5500/fetching-details");
        if (response.ok) {
          const result = await response.json();
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
      <div>This is invoice page</div>
      <button onClick={formadding}>Add</button>
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
                <button onClick={() => updateButton(items._id)}>Update</button>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Invoice;
