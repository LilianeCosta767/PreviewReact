import React from 'react';
import axios from 'axios';
import cheerio from 'cheerio';
import './App.css';

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

const parseHTML = (html) => {
  const $ = cheerio.load(html);

  $('head meta').map((i, item) => {
    if(!item.attribs) return null;

    const property = item.attribs.property || null;
    const content = item.attribs.content || null;

    if (!property || !content) return null;

    console.log(property, content);
    
  }); // pega todas as tags meta do html
}

// função para pegar a url informada no input
const getUrl = (text) => {
  if(!text) return null;

  const a = document.createElement('a');
  a.href = text;

  const { protocol, host, pathname, search, hash } = a;

  const url = `${protocol}//${host}${pathname}${search}${hash}`;

  const isSameHost = (host === window.location.host);

  if( isSameHost ) return null;

  return url;
}

// buscar a página
const fetchUrl = (url) => {
  return  axios(CORS_PROXY + url)
    .then(response => response.data); // vai pegar o html da página
}

function App() {

  const onBlur = (e) => {
    const url = getUrl(e.target.value);
    if(!url) return null;
    fetchUrl(url)
      .then(parseHTML)
      .then(console.log)
      .catch(console.error);
  }

  return (
    <div>
      <h1>React Link Preview</h1>
      <input type="text" onBlur={onBlur}/> 
    </div>
  );
}

export default App;
