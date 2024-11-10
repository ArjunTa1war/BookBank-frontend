import React, { useEffect, useState } from 'react';
import UserBookCard from '../helper/UserBookCard';
import RequestCard from '../helper/RequestCard';

export default function Requests(props) {
  const [requests,setRequests] = React.useState([]);
  const host = process.env.REACT_APP_PORT;

  useEffect(() => {
    const fetchUserRequests = async () => {
      try {
        const response = await fetch(`${host}/user/allRequests`, {
          method: "GET",
          headers: {
            'Content-Type': "application/json",
            "auth-token": localStorage.getItem('token'),
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }
        const json = await response.json();
        setRequests(json.requestHistory);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    fetchUserRequests();
  }, [host]);


  const handleApprove = (requestId) => {
    // Handle approval logic here
    console.log("Approved request:", requestId);
  };

  const handleDisapprove = (requestId) => {
    // Handle disapproval logic here
    console.log("Disapproved request:", requestId);
  };


  console.log(requests);
  return (
    <div>
      {requests.map((request) => (
        <RequestCard
          key={request._id}
          request={request}
          onApprove={handleApprove}
          onDisapprove={handleDisapprove}
        />
      ))}
    </div>
  )
}
