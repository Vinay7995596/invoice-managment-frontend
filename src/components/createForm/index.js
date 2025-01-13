import { useState } from "react"
import { useNavigate } from "react-router-dom"

const FormCreate = () => {
    const [invoiceNumber, setInvoiceNumber] = useState('')
    const [clientName, setClientName] = useState('')
    const [date, setDate] = useState('')
    const [amount, setAmount] = useState('')
    const [amountStatus, setAmountStatus] = useState('')
    const navigate = useNavigate()

    const invoiceNumberChange = (e) => {
        setInvoiceNumber(e.target.value)
    }

    const clientNameChange = (e) => {
        setClientName(e.target.value)
    }

    const dateChange = (e) => {
        setDate(e.target.value)
    }

    const amountChange = (e) => {
        setAmount(e.target.value)
    }

    const amountStatusChange = (e) => {
        setAmountStatus(e.target.value)
    }

    const formSubmit = async () => {
        const payload = {
            invoicenumber : invoiceNumber,
            clientname: clientName,
            date : date,
            amount : amount,
            amountStatus:amountStatus
        }
        try {
            const response = await fetch('http://localhost:5500/formSubmit', {
                method:'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(payload)
            })
            if (response.ok) {
                navigate('/form')
            }
        }catch(e) {
            console.log(e, 'fetching to send data in frontend')
        }
    }
    return (
        <>
        <div>this is form create</div>
        <div>
            <label>Invoice Number</label>
            <input type="number" onChange={invoiceNumberChange} value={invoiceNumber}/>
        </div>
        <div>
            <label>Client Name</label>
            <input type="text" onChange={clientNameChange} value={clientName}/>
        </div>
        <div>
            <label>Date</label>
            <input type="date" onChange={dateChange} value={date}/>
        </div>
        <div>
            <label>Amount</label>
            <input type="number" onChange={amountChange} value={amount}/>
        </div>
        <div>
            <label>status</label>
            <select onChange={amountStatusChange}>
                <option value='pending'>Pending</option>
                <option value='paid'>Paid</option>
                <option value='unpaid'>Unpaid</option>
            </select>
        </div>
        <div>
            <button onClick={formSubmit}>Submit</button>
        </div>
        </>
    )
}

export default FormCreate