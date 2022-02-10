import './style.css'
import ReactPaginate from 'react-paginate'
import { Roller } from 'react-spinners-css';
import React, { useEffect, useState } from 'react';
import searchIcon from './../../assets/Images/searchIcon.png'


function Home() {
  const [showMore, SetShowMore] = useState({})
  const [buttonText, SetbuttonTexte] = useState({})
  const [isPending, setIsPending] = useState(true)
  const [allCostumers, setAllCosutumers] = useState(null)
  const [displayedCostumers, setDisplayedCostumers] = useState(null)

  // pagination
  const costumerPerPage = 4
  const [pageNumber, setPageNumber] = useState(0)
  const visitedPages = pageNumber * costumerPerPage

  const HandleShowMore = (e, id) => {
    e.preventDefault();
      if (showMore[id]){
        SetShowMore({[id]: false});
        SetbuttonTexte({[id]: "Show More"})
      }
      else{
        SetShowMore({[id]: true});
        SetbuttonTexte({[id]: "Show Less"})
      }
  }


// Display the new list of customers filtered based on the value of the search box
// create new list and assign it to displayedCostumers variable

  const HandleSearch = (value) => {
    const newList = allCostumers.filter((costumer) => costumer.UserName.includes(value))
    setDisplayedCostumers(newList.slice(visitedPages, visitedPages + costumerPerPage))
  }


// Fetch data from the server watched (/data/db)

  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:8000/costumers')
      .then(result => {
        return result.json()
      }).then(data => {
        setAllCosutumers(data)
        setDisplayedCostumers(data.slice(visitedPages, visitedPages + costumerPerPage))
        setIsPending(false)
      })
    }, 1000)
  }, [])

// Change page when Onclick on pagination buttons
// Change the current page by assigning the value of the page clicked => setPageNumber(new value)

  const onPageChange = async ({selected}) => {
    setPageNumber(selected)
    setDisplayedCostumers(allCostumers.slice(selected * costumerPerPage, (selected * costumerPerPage) + costumerPerPage))
    setUpdate({});
  }

// Update state
const [, setUpdate] = useState();


// Calculate how many page based on how total customers and customers per page
  const pageCount = (allCostumers ? Math.ceil(allCostumers.length / costumerPerPage) : 0)

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
        {displayedCostumers && displayedCostumers.map((val, key) => {
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
                <div style={{marginTop: 10}} >{!showMore[val.id] ? "" : "Gender : " + val.Gender}</div>
                <div style={{marginTop: 10}} >{!showMore[val.id] ? "" : "Adress : " +  val.Adresse}</div>
                <div style={{marginTop: 10}} >{!showMore[val.id] ? "" : "PhoneNumber : " + val.PhoneNumber}</div>
              </div>
              <button
                onClick={(e) => HandleShowMore(e, val.id)}
                className='ShowMore-btn'>
                {buttonText[val.id] ? buttonText[val.id] : "Show more" }
              </button>
          </div>
          )
        })}
        </div>
        <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={onPageChange}
        containerClassName='pagination-btns'
        previousLinkClassName='previous-btn'
        nextLinkClassName='next-btn'
        activeClassName='paginationActive'
        />
      </div>
    );
  }

  export default Home;