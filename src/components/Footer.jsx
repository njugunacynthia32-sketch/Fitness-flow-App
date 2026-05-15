function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="app-footer">
      <p>Fitness Flow &copy; {year}</p>
      <p>Plan your workout. Track your progress. Keep moving.</p>
    </footer>
  )
}

export default Footer
