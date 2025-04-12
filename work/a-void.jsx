import React from 'react';
import './AVoid.css';

const AVoid = () => {
  return (
    <div className="a-void-container">
      <header>
        <h1 className="nav-title"><a href="/work">WORK</a></h1>
        <h1 className="page-title">A VOID: A LIGHT SCULPTURE</h1>
      </header>

      <main>
        <div className="gallery">
          <div className="gallery-item">
            <img 
              src="../img/2017/a-void/avoid_lighting sculpture_mini.png" 
              className="gallery-image" 
              alt="A Void light sculpture - conceptual design"
              loading="lazy"
            />
          </div>
          <div className="gallery-item">
            <img 
              src="../img/2017/a-void/avoid_lighting sculpture_closeup.JPG" 
              className="gallery-image" 
              alt="A Void light sculpture - installation view"
              loading="lazy"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AVoid;
