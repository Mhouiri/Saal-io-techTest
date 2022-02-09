import './style.css'
import { Roller } from 'react-spinners-css';
import React, { useEffect, useState } from 'react';
import searchIcon from './../../assets/Images/searchIcon.png'

function Home() {
  const [showMore, SetShowMore] = useState(false)
  const [buttonText, SetbuttonTexte] = useState("Show More")
  const [costumers, setCosutumerList] = useState(null)
  const [isPending, setIsPending] = useState(true)
  const [dynamicCostumersList, setdynamicCostumersList] = useState(costumers)

  const HandleShowMore = () => {
    if (showMore){
      SetShowMore(false);
      SetbuttonTexte("Show More")
    }
    else{
      SetShowMore(true);
      SetbuttonTexte("Show Less")
    }
  }

  const HandleSearch = (value) => {
    const newList = costumers.filter((costumer) => costumer.UserName.includes(value))
    setdynamicCostumersList(newList)
  }

  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:8000/costumers')
      .then(result => {
        return result.json()
      }).then(data => {
        setCosutumerList(data)
        setdynamicCostumersList(data)
        setIsPending(false)
      })
    }, 1000)
  }, [])

    return (
      <div>
        <div className="Header" style={{color: '#622A93'}}>
          <div style={{fontSize: 30}}>List of customers</div>
          <div className="search">
            <button
            className='search-icon'>
            <img
                  src={searchIcon} alt=""
                  style={{ width: 20, height: 20}}
              />
            </button>
              <input
              onChange={(e) => HandleSearch(e.target.value)}
              className="input"
            />
          </div>
        </div>
        <div className="Container">
        {isPending && <div className='Roller'><Roller color='#3e4c5c' /></div>}
        {dynamicCostumersList && dynamicCostumersList.map((val, key) => {
          return(
            <div
            key={key}
            className="User-Card">
              <img
                  className="ProfileImage"
                  src={val.Url} alt=""
                  style={{ width: 90, height: 90, marginTop: 20}}
              />
              <div className="User-infos">
                <div style={{marginTop: 10}}>Full Name : {val.FullName}</div>
                <div style={{marginTop: 10}}>Username : {val.UserName}</div>
                <div style={{marginTop: 10}}>Email : {val.Email}</div>
                <div style={{marginTop: 10}} >{!showMore ? "" : "Gender : " + val.Gender}</div>
                <div style={{marginTop: 10}} >{!showMore ? "" : "Adress : " +  val.Adresse}</div>
                <div style={{marginTop: 10}} >{!showMore ? "" : "PhoneNumber : " + val.PhoneNumber}</div>
              </div>
              <button
                onClick={HandleShowMore}
                className='ShowMore-btn'>
                {buttonText}
              </button>
          </div>
          )
        })}
        </div>
      </div>
    );
  }

  export default Home;