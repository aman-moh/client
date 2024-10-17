import React, { useEffect, useState } from 'react'

function index() {

  const [message, SetMessage] = useState('Loading...')
  const [people, SetPeople] = useState([])
  useEffect(() => {
    fetch('http://localhost:8080/api/home')
      .then(response => response.json())
      .then(data => {
        SetMessage(data.message)
        SetPeople(data.people)
      })
  }, [])

  return (
    <div>
      <h1>{message}</h1>
      <ul>
        {people.map((person, index) => (
          <li key={person}>{person}</li>
        ))}
      </ul>
    </div>
  )
}

export default index