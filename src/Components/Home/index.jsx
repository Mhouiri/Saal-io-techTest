import './style.css'
import ReactPaginate from 'react-paginate'
import { Roller } from 'react-spinners-css';
import React, { useEffect, useState } from 'react';
import searchIcon from './../../assets/Images/searchIcon.png'


function Home() {
  const [showMore, SetShowMore] = useState({})
  const [buttonText, SetbuttonTexte] = useState({})
  const [isPending, setIsPending] = useState(true)
  const [allCustomers, setAllCosutumers] = useState(null)
  const [displayedCustomers, setDisplayedCustomers] = useState(null)

  // pagination
  const customerPerPage = 4
  const [pageNumber, setPageNumber] = useState(0)
  const visitedPages = pageNumber * customerPerPage

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
// create new list and assign it to displayedCustomers variable

  const HandleSearch = (value) => {
    const newList = allCustomers.filter((customer) => customer.UserName.includes(value))
    setDisplayedCustomers(newList.slice(visitedPages, visitedPages + customerPerPage))
  }


// Fetch data from the server watched (/data/db)

  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:8000/Customers')
      .then(result => {
        return result.json()
      }).then(data => {
        setAllCosutumers(data)
        setDisplayedCustomers(data.slice(visitedPages, visitedPages + customerPerPage))
        setIsPending(false)
      })
    }, 1000)
  }, [])

// Change page when Onclick on pagination buttons
// Change the current page by assigning the value of the page clicked => setPageNumber(new value)

  const onPageChange = async ({selected}) => {
    setPageNumber(selected)
    setDisplayedCustomers(allCustomers.slice(selected * customerPerPage, (selected * customerPerPage) + customerPerPage))
    setUpdate({});
  }

// Update state
const [, setUpdate] = useState();


// Calculate how many page based on how total customers and customers per page
  const pageCount = (allCustomers ? Math.ceil(allCustomers.length / customerPerPage) : 0)

    return (
      // The view could be responsive , But due to my work and my schedule i had no time
      <div>
        <div className="Header" style={{color: '#622A93'}}>
          <div style={{fontSize: 15}}>List of customers</div>
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
        {displayedCustomers && displayedCustomers.map((val, key) => {
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