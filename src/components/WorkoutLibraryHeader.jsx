import { useEffect, useState } from 'react'

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

  function loadQuote() {
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
  }

  useEffect(() => {
    let shouldUpdate = true

    fetchQuote()
      .then((data) => {
        if (!shouldUpdate) return

        setQuote(data.quote)
        setAuthor(data.author)
      })
      .catch(() => {
        if (!shouldUpdate) return

        setError('Could not load quote.')
      })
      .finally(() => {
        if (!shouldUpdate) return

        setIsLoading(false)
      })

    return () => {
      shouldUpdate = false
    }
  }, [])

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
            {isLoading ? 'Loading...' : 'Get new quote'}
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
