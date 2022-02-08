import './style.css'
import React, { useState } from 'react';
import searchIcon from './../../assets/Images/searchIcon.png'

function Home() {
  const [showMore, SetShowMore] = useState(false)
  const [buttonText, SetbuttonTexte] = useState("Show More")
  const [costumersList, setCosutumerList] = useState([
    {id: 1, FullName: "Mouhcine Houiri", UserName: "mhouiri", Email: "mouhcinehouiri@gmail.com", Gender: "Male", PhoneNumber: "+971568170492", Adresse: "Abudhabi - UAE", Url: "https://cdn.intra.42.fr/users/ahel-men.jpg"},
    {id: 2, FullName: "Amine Morchid", UserName: "mmorchid", Email: "aminemorchid@gmail.com", Gender: "Male", PhoneNumber: "+971568170492", Adresse: "Khouribga - Morocco",  Url: "https://cdn.intra.42.fr/users/mmorchid.jpg"},
    {id: 3, FullName: "Youssef Abakhar", UserName: "yabakhar", Email: "yabakhar@gmail.com", Gender: "Male", PhoneNumber: "+971568170492", Adresse: "Casablanca - France",  Url: "https://cdn.intra.42.fr/users/yabakhar.jpg"},
    {id: 4, FullName: "Ayoub Daouli", UserName: "adaouli", Email: "ayoubdaouli@gmail.com", Gender: "Male", PhoneNumber: "+971568170492", Adresse: "Paris - France",  Url: "https://cdn.intra.42.fr/users/fel-boua.jpg"},
  ])
  const [dynamicCostumersList, setdynamicCostumersList] = useState(costumersList)

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
  const newList = costumersList.filter((costumer) => costumer.UserName.includes(value))
  setdynamicCostumersList(newList)
}
 
    return (

      <div>
        <div className="Header" style={{color: '#622A93'}}>
          <div style={{fontSize: 30}}>List of customers</div>
          <div className="search">
            <button
            className='search-button'>
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