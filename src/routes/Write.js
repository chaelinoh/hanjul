import React from 'react';
import HanjulFactory from 'components/HanjulFactory';

//const Writeend= () => <span>Writeend</span>;

const Write = ({ userObj }) => {

  return (
    <div className="container">          
  
        <HanjulFactory userObj={userObj} />
  
    </div>
  );
  };
  export default Write;