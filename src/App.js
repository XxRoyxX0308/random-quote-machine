import './App.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faTumblr } from '@fortawesome/free-brands-svg-icons'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
  
function App() {
  const [quotesData, setQuotesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [quote, setQuote] = useState({});
  const [colors, setColors] = useState({backgroundColor: `#333333`, color: `#333333`});

  useEffect(() => {
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then((response) => response.json())
      .then((data) => {
        setQuotesData(data.quotes);
        randomQuote(data.quotes);
        randomColor();
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const randomQuote = (quotesDataCp = quotesData) => {
    setQuote(quotesDataCp[Math.floor(Math.random() * quotesDataCp.length)]);
  };

  const randomColor = () => {
    const r1 = Math.floor(Math.random() * 255), r2 = Math.floor(Math.random() * 255), r3 = Math.floor(Math.random() * 255);
    setColors({backgroundColor: `rgb(${r1}, ${r2}, ${r3})`, color: `rgb(${r1}, ${r2}, ${r3})`});
  };

  const diffusionAnimationEnter = (e) => {
    const button = e.currentTarget;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    button.style.setProperty('--enter-x', `${x}px`);
    button.style.setProperty('--enter-y', `${y}px`);
  };

  const diffusionAnimationLeave = (e) => {
    const button = e.currentTarget;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    button.style.setProperty('--leave-x', `${x}px`);
    button.style.setProperty('--leave-y', `${y}px`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='app' style={colors}>
      <div id='quote-box' className='app-container'>
        <div className='quote'>
          <FontAwesomeIcon icon={faQuoteLeft}/>
          <span id='text' className='quote-text'>{quote.quote}</span>
        </div>
        <div className='author'>
          <span id='author'>{quote.author}</span>
        </div>
        <div className='button-bar'>
          <div>
            <a id='tweet-quote' className='button' style={{backgroundColor: colors.backgroundColor}} onMouseEnter={diffusionAnimationEnter} onMouseLeave={diffusionAnimationLeave} href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(`"${quote.quote}" ${quote.author}`)}`} target='_blank' rel="noreferrer noopenner">
              <FontAwesomeIcon icon={faTwitter} size='lg'/>
            </a>
            <a id='tumblr-quote' className='button' style={{backgroundColor: colors.backgroundColor}} onMouseEnter={diffusionAnimationEnter} onMouseLeave={diffusionAnimationLeave} href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${encodeURIComponent(quote.author)}&content=${encodeURIComponent(quote.quote)}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`} target='_blank' rel="noreferrer noopenner">
              <FontAwesomeIcon icon={faTumblr} size='lg'/>
            </a>
          </div>
          <button id='new-quote' className='button' style={{backgroundColor: colors.backgroundColor}} onMouseEnter={diffusionAnimationEnter} onMouseLeave={diffusionAnimationLeave} onClick={() => {randomQuote(); randomColor();}}>New quote</button>
        </div>
      </div>
      <a className='app-author' style={{color: '#fff'}} href='https://github.com/XxRoyxX0308' target='_blank' rel="noreferrer noopenner">by roy</a>
    </div>
  );
}

export default App;