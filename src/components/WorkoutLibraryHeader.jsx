import { useCallback, useEffect, useState } from 'react'

const quoteApiUrl = 'https://dummyjson.com/quotes/random'

async function fetchQuote() {
  const response = await fetch(quoteApiUrl)

  if (!response.ok) {
    throw new Error('Could not load quote.')
  }

  return response.json()
}

function WorkoutLibraryHeader({ onClearPlan }) {
  const [quote, setQuote] = useState('')
  const [author, setAuthor] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const loadQuote = useCallback(() => {
    setIsLoading(true)
    setError('')

    fetchQuote()
      .then((data) => {
        setQuote(data.quote)
        setAuthor(data.author)
      })
      .catch(() => {
        setError('Could not load quote.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    loadQuote()
  }, [loadQuote])

  return (
    <header className="app-header">
      <div>
        <p className="small-heading">Fitness Flow</p>
        <h1>Simple workout planner</h1>
        <p>
          Choose a few exercises, check the time, and build a small workout for
          today.
        </p>

        <div className="quote-box">
          <p className="small-heading">Daily quote</p>

          {isLoading ? (
            <p className="quote-text">Loading quote...</p>
          ) : error ? (
            <p className="quote-text">{error}</p>
          ) : (
            <blockquote>
              <p>"{quote}"</p>
              <p><b>- {author}</b></p>
            </blockquote>
          )}

          <button
            className="secondary-button"
            disabled={isLoading}
            onClick={loadQuote}
            type="button"
          >
            {isLoading ? 'Loading...' : 'Get q new quote'}
          </button>
        </div>
      </div>

      <button className="secondary-button" onClick={onClearPlan} type="button">
        Start over
      </button>
    </header>
  )
}

export default WorkoutLibraryHeader
