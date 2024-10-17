import React, { useEffect, useState } from 'react'

function Index() {

  const [message, setMessage] = useState('Loading...')
  const [people, setPeople] = useState([])
  useEffect(() => {
    fetch('http://localhost:8080/api/home')
      .then(response => response.json())
      .then(data => {
        setMessage(data.message)
        setPeople(data.people)
      })
  }, [])

  return (
    <div>
      <h1>{message}</h1>
      <ul>
        {people.map(person => (
          <li key={person}>{person}</li>
        ))}
      </ul>
    </div>
  )
}

export default Index