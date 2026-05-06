import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page" data-testid="notfound-page1">
      <div className="empty-state" data-testid="notfound-empty-state">
        <h1>404</h1>
        <p>The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primarya" data-testid="notfound-home-btn">
          Go home →
        </Link>
      </div>
    </div>
  )
}
