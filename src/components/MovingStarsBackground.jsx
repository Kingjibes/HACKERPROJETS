import React from 'react';

    const MovingStarsBackground = () => {
      return (
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
        </div>
      );
    };

    export default MovingStarsBackground;