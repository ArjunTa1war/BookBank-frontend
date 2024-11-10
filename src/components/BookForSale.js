import React, { useContext, useEffect } from 'react'
import SaleCard from './helper/saleCard';
import bookContext from '../context/document/bookContext';
import {useNavigate} from 'react-router-dom';

export default function BookForSale(props) {
    const context = useContext(bookContext);
    const {books,getBooks} = context;
    useEffect(()=>{
      if(localStorage.getItem("token")){
        getBooks();
      }
      else{
         navigate("/login");
      }
    },[])

    let navigate = useNavigate();
    return (
      <div className="mt-16 pt-16">
        {/* Grid layout for books */}
        <div style={styles.grid}>
          {books.filter((book) => book.status === 'available').map((book, index) => (
            <SaleCard
              key={index}
              bookId={book._id}
              imageUrl={book.coverImageUrl}
              title={book.title}
              description={book.description}
              author={book.author}
              condition={book.condition}
              showAlert = {props.showAlert}
              isRequested = {book.requestedBy.toString()}
            />
          ))}
        </div>
      </div>
    );
  }
  
  const styles = {
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
      justifyItems: 'center', 
    },
}
