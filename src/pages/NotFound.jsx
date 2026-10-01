import { Link } from 'react-router-dom'
export default function NotFound() { return <section className="not-found container"><p className="eyebrow">404 / Not found</p><h1>This page took<br /><em>a different route.</em></h1><Link className="text-link" to="/">Back to home ↗</Link></section> }
