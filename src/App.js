import './App.css';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faTumblr } from '@fortawesome/free-brands-svg-icons'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
  
function App() {
  const [quotesData, setQuotesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [quote, setQuote] = useState({});
  const [fakeQuote, setFakeQuote] = useState({});

  const [backgroundColor, setBackgroundColor] = useState({backgroundColor: `#333333`});
  const [color, setColor] = useState({color: `#333333`});
  const [fadeTransition, setFadeTransition] = useState({});
  const [heightTransition, setHeightTransition] = useState({});
  
  const fakeAppRef = useRef(null);
  const fakeHeight = useRef(0);
  const isMoreHeight = useRef(true);



  useEffect(() => {
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then((response) => response.json())
      .then((data) => {
        setQuotesData(data.quotes);
        getQuote(data.quotes);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const currentTextHeight = fakeAppRef.current.scrollHeight;
    
    isMoreHeight.current = currentTextHeight >= fakeHeight.current;
    if(currentTextHeight > fakeHeight.current) setHeightTransition({height: currentTextHeight});
    fakeHeight.current = currentTextHeight;
  }, [fakeQuote]);



  const getQuote = (quotesDataCp = quotesData) => {
    const currentQuote = quotesDataCp[Math.floor(Math.random() * quotesDataCp.length)], r1 = Math.floor(Math.random() * 256), r2 = Math.floor(Math.random() * 256), r3 = Math.floor(Math.random() * 256);
    
    setFakeQuote(currentQuote);
    setBackgroundColor({backgroundColor: `rgb(${r1}, ${r2}, ${r3})`});
    setFadeTransition({opacity: 0});

    setTimeout(() => {
      setQuote(currentQuote);
      setColor({color: `rgb(${r1}, ${r2}, ${r3})`});
      setFadeTransition({opacity: 1});
      if(!isMoreHeight.current) setHeightTransition({height: fakeHeight.current});
    }, 500);
  };

  const diffusionAnimation = (e) => {
    const button = e.currentTarget;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    button.style.setProperty('--mouse-x', `${x}px`);
    button.style.setProperty('--mouse-y', `${y}px`);
  };



  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='app' style={{...backgroundColor, ...color}}>
      <div id='quote-box' className='app-container'>

        <div className='text fake-element' ref={fakeAppRef}>
          <div className='quote'>
            <FontAwesomeIcon icon={faQuoteLeft}/>
            <span className='quote-text'>{fakeQuote.quote}</span>
          </div>
          <div className='author'>
            <span>{fakeQuote.author}</span>
          </div>
        </div>
        
        <div className='text' style={{...fadeTransition, ...heightTransition}}>
          <div className='quote'>
            <FontAwesomeIcon icon={faQuoteLeft}/>
            <span id='text' className='quote-text'>{quote.quote}</span>
          </div>
          <div className='author'>
            <span id='author'>{quote.author}</span>
          </div>
        </div>
        
        <div className='button-bar'>
          <div>
            <a id='tweet-quote' className='button' style={backgroundColor} onMouseEnter={diffusionAnimation} onMouseLeave={diffusionAnimation} href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(`"${quote.quote}" ${quote.author}`)}`} target='_blank' rel="noreferrer noopenner">
              <FontAwesomeIcon icon={faTwitter} size='lg'/>
            </a>
            <a id='tumblr-quote' className='button' style={backgroundColor} onMouseEnter={diffusionAnimation} onMouseLeave={diffusionAnimation} href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${encodeURIComponent(quote.author)}&content=${encodeURIComponent(quote.quote)}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`} target='_blank' rel="noreferrer noopenner">
              <FontAwesomeIcon icon={faTumblr} size='lg'/>
            </a>
          </div>
          <button id='new-quote' className='button submit-btn' style={backgroundColor} onMouseEnter={diffusionAnimation} onMouseLeave={diffusionAnimation} onClick={() => {getQuote();}}>New quote</button>
        </div>
      </div>
      <a className='app-author' style={{color: '#fff'}} href='https://github.com/XxRoyxX0308' target='_blank' rel="noreferrer noopenner">by roy</a>
    </div>
  );
}



export default App;