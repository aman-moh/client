import React, { useEffect, useState } from 'react'

interface HookScript {
  content: string;
  sentences?: Array<{
    sentence: string;
    length_in_words: number;
  }>;
  total_length_in_words?: number;
}

function Index() {
  const [hookScript, setHookScript] = useState<HookScript | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('http://localhost:8080/api/home')
      .then(response => response.json())
      .then(data => {
        setHookScript(data.hook_script)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
        setError('Error loading content. Please try again later.')
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div>
      <h1>Hook Analysis Result</h1>
      {hookScript && (
        <div>
          <h2>Hook Content:</h2>
          <p>{hookScript.content}</p>
          {hookScript.sentences && hookScript.sentences.length > 0 && (
            <>
              <h2>Sentences:</h2>
              <ul>
                {hookScript.sentences.map((sentence, index) => (
                  <li key={index}>
                    {sentence.sentence} (Words: {sentence.length_in_words})
                  </li>
                ))}
              </ul>
            </>
          )}
          {hookScript.total_length_in_words !== undefined && (
            <h2>Total Words: {hookScript.total_length_in_words}</h2>
          )}
        </div>
      )}
    </div>
  )
}

export default Index
