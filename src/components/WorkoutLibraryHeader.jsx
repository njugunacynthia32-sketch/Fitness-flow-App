import { useEffect, useState } from 'react'

const quoteUrlApi = 'https://dummyjson.com/quotes/random'

function WorkoutLibraryHeader({ onClearPlan }) {
  const [quote, setQuote] = useState('')
  const [author, setAuthor] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(quoteUrlApi)
      .then((response) => response.json())
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

  function loadNewQuote() {
    setIsLoading(true)
    setError('')

    fetch(quoteUrlApi)
      .then((response) => response.json())
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
            onClick={loadNewQuote}
            type="button"
          >
            {isLoading ? 'Loading' : 'Get youre New quote'}
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
