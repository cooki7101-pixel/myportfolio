import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="site-header container">
      <NavLink className="brand" to="/" aria-label="Portfolio home">YOUR NAME<span>.</span></NavLink>
      <nav aria-label="Main navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <a href="mailto:hello@example.com">Contact</a>
      </nav>
    </header>
  )
}
