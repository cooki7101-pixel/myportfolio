export default function ImageGrid({ images }) {
  return <div className="image-grid">{images.map((image, index) => <div key={image} className={`grid-image grid-image-${index + 1}`} style={{ backgroundImage: `url(${image})` }} role="img" aria-label={`Project image ${index + 1}`} />)}</div>
}
