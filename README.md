# react-fav-icons

## Why?
##### It helps to load a loader and a badge in the favicon of the webPage

## Installation
`npm i react-fav-icons`

`yarn add react-fav-icons`

## Usage

#### 1. Loader

```javascript
import React from 'react';
import logo from './logo.svg';
import './App.css';

import FavIcon from 'react-fav-icons';

function App() {
  return (
    <div className="App">
      <FavIcon loading={true}>
        <p>Hello world</p>
      </FavIcon>
    
    </div>
  );
}

export default App;

```

#### 2. Badge

```javascript
import React from 'react';
import logo from './logo.svg';
import './App.css';

import FavIcon from 'react-fav-icons';

function App() {
  return (
    <div className="App">
      <FavIcon text="9">
        <p>Hello world</p>
      </FavIcon>
    
    </div>
  );
}

export default App;

```

 
| Props       | Description           | required  |
| ------------- |:-------------:| -----:|
| `loading`     | boolean value  which enables or disable a loader in the favicon web page| `false` |
| `text`     | text to be displayed as a badge in the favicon of web page | `false` |