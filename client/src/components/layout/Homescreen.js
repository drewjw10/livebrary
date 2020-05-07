import React from "react";
import PerformanceCard from "./PerformanceCard";

const Homescreen = () => {
  return (
    <div className='container'>
      <div className='welcome-box'>
        <h2>Welcome to Livebrary</h2>
        <p>
          Find live performances of your favorite songs from your favorite
          artists! Search by song or artist, or link spotify account for a
          curated list of performances!
        </p>
      </div>

      <div className='perf-boxes'>
        <PerformanceCard
          artist='King Gizzard and the Lizard Wizard'
          song='Robot Stop'
          venue='The Fillmore'
          img_url='https://youtube.com'
        />

        <PerformanceCard
          artist='King Gizzard and the Lizard Wizard'
          song='Robot Stop'
          venue='The Fillmore'
          img_url='https://youtube.com'
        />

        <PerformanceCard
          artist='King Gizzard and the Lizard Wizard'
          song='Robot Stop'
          venue='The Fillmore'
          img_url='https://youtube.com'
        />

        <PerformanceCard
          artist='King Gizzard and the Lizard Wizard'
          song='Robot Stop'
          venue='The Fillmore'
          img_url='https://youtube.com'
        />
      </div>
    </div>
  );
};

export default Homescreen;
