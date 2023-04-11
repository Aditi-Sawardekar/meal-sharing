import React from 'react';


const Header = ({title}) => {
  return (
    <header className="App-Header">
      <img
              src={require(`../../../public/images/NamasteLady.jpg`).default}
              className="namaste-logo"
              alt=""
            />
      <h1 className="App-Title">{title}</h1>
      <img
              src={require(`../../../public/images/NamasteLady.jpg`).default}
              className="namaste-logo"
              alt=""
            />
    </header>
  )
}

export default Header