import './Home.css'

export default function Home() {
  return (
    <div className="container">
        <section className="greeting">
      <h1 className="home-title">🔮 Привет, странник фанфиков!</h1>
      <h2 className="home-descr">21 век - рай для интровертов!</h2>
      <p className="home-text">Добро пожаловать в FanficVerse — твою вселенную любимых историй!</p>
        <div className="channel">
            Зацени наш тг бот {" "}
        <a href="https://t.me/FanficVerseBot">FanficVerseBot</a>
        </div>
        </section>

    </div>
  );
}
