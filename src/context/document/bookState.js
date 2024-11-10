import React from "react";
import bookContext from "./bookContext";

const BookState = (props)=>{
   const host = process.env.REACT_APP_PORT;
   const [books,setBooks] = React.useState([]);


/************************** Get all books ******************/
   const getBooks = async ()=>{
    const response = await fetch(`${host}/book/findAllBooks`,{
     method : "GET",
      headers:{
        'Content-Type':"application/json",
        "auth-token" : localStorage.getItem('token')
      }
    })
    const json = await response.json();
    console.log("all the books are " + json);
    setBooks(json);
}



 return(
    <bookContext.Provider value = {{books,getBooks}}>
    {props.children}
    </bookContext.Provider>
 )
}
export default BookState;