import heroImage from '../../../assets/home/hero.png'

export function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <img className="hero-section__image" src={heroImage} alt="" />
      <div className="hero-section__content">
        <div className="hero-section__copy">
          <h1 id="hero-title">Reunion Planning Reimagined</h1>
          <p>Say goodbye to scattered planning and hello to stress-free reunions!</p>
          <a className="button button--primary button--large" href="/">
            Start Planning
          </a>
        </div>
      </div>
    </section>
  )
}
