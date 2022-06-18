import style from "./Card.module.css"
import dollar_icon from "../../images/dollar-icon.svg"
import left_arrow from "../../images/left-arrow.svg"
import right_arrow from "../../images/right-arrow.svg"
import { Img } from "../Img/Img"
import { products } from "../../product"
import React, { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"

interface IState{
  id: string;
  interest: string;
  name: string;
  min_amount: string;
  max_amount: string;
  min_tenure: string;
  max_tenure: string;
  image: string;
}
export const Card = () => {
  const [state,setState] = useState<IState | undefined | null>(products[0])
  const [numberOfMonths,setNumberOfMonths] = useState(Number(state?.min_tenure))
  const [loanAmount,setLoanAmount] = useState(Number(state?.min_amount))
  const [totalAmount,setTotalAmount] = useState<number | null>(null)
  const [monthlyAmount,setMonthlyAmount] = useState<number | null>(null)
  const [date,setDate] = useState(new Date())
  useEffect(()=>{
    setNumberOfMonths(Number(state?.min_tenure))
    setLoanAmount(Number(state?.min_amount))
  },[state])
  useEffect(()=>{
    const now = new Date()
    setDate(new Date(now.setMonth(now.getMonth()+numberOfMonths)))
  },[numberOfMonths])
  useEffect(()=>{
    setTotalAmount(loanAmount + (loanAmount * Number(state?.interest)))
  },[loanAmount,state?.interest])
  useEffect(()=>{
    // monthly installment = total amount / # months
    if(totalAmount !== null)
      setMonthlyAmount(totalAmount/ numberOfMonths)
  },[totalAmount,numberOfMonths])
  const changeProduct = (id : string) => {
    const newState = products.find(p=>p.id === id)
    toast.dismiss()
    toast.success(`${newState?.name} is chosen!`,
    {
      position: "bottom-right",
      duration: 6000,
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    }
  );
    setState(newState)
  }
  const handleMounthUp = () => {
    if(numberOfMonths === Number(state?.max_tenure))return 
    setNumberOfMonths(numberOfMonths+1)
  }
  const handleMounthDown = () => {
    if(numberOfMonths === Number(state?.min_tenure))return 
    setNumberOfMonths(numberOfMonths-1)
  }
  const handleKey = (e : React.KeyboardEvent) => {
    if(e.key === "ArrowUp"){
      handleMounthUp()
    }
    else if(e.key === "ArrowDown"){
      handleMounthDown()
    }
  }
  const handleLoanAmount = (e:any) => {
    const re = /^[0-9\b]+$/;
    if (parseFloat(e.target?.value.replace(/,/g, '')) > Number(state?.max_amount)){
      return
    }
    if (parseFloat(e.target?.value.replace(/,/g, '')) < Number(state?.min_amount)) return
    
    if (e.target?.value.replace(/,/g, '') === '' || re.test(e.target?.value.replace(/,/g, ''))) {
       setLoanAmount(Number(e.target?.value.replace(/,/g, '')))
    }
  }
  const formatDate = (d : Date) => {
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    return mo + " " + ye
  }
  return (
    <>
    <div className={style.card}>
      <div className={style.products}>
        {
          products.map(p=>{
            return <Img onClick={changeProduct} id={p.id} key={p.id} src={p.image}/>
          })
        }
        
      </div>
    <div className="wrapper">    
    <div className={style["inputs"]}>
      <div className="form-input-container loan">
        <label htmlFor="" className="label">Loan amount</label>
        <div className="form-input">
          <img src={dollar_icon} alt="dollar icon"/>
          <input type="text" value={loanAmount.toLocaleString('en-US')} onChange={handleLoanAmount} />
        </div>
      </div>
      <div className="form-input-container month">
        <label htmlFor="" className="label">Number of mounths</label>
        <div className="form-input">
          <img className="pointer" onClick={handleMounthDown} src={left_arrow} alt={left_arrow}/>
          <input value={numberOfMonths} onKeyDown={handleKey} type="number" className="text-center" />
          <img className="pointer" onClick={handleMounthUp} src={right_arrow} alt={right_arrow}/>
        </div>
      </div>
    </div>

      <div className="monthly-amount-container">
        <div className="monthly-amount details-container">
            <h2>Monthly amount</h2>
            <h3>${
              monthlyAmount&& Math.floor(monthlyAmount)
              }</h3>
        </div>
        <div className="details details-container">
          <p>You’re planning {numberOfMonths} <span className={"bold"}>monthly deposits</span> to reach your <span className={"bold"}>{loanAmount.toLocaleString('en-US')}$</span> goal  by <span className={"bold"}>{formatDate(date)}</span>  The total amount loaned will be <span className={"bold"}>{totalAmount?.toLocaleString('en-US')}</span></p>
        </div>
      </div>

      <div className="btn-container">
        <button className="btn">Apply Now</button>
      </div>
    </div>
    </div>
    <Toaster />
    </>
  )
}
