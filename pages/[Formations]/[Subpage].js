import React, { useEffect, useState, memo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import MenuChapter from '@/Components/MenuChapter';
import Player from '@/Components/Player';
import FormattedTime from '@/Components/FormattedTime';

export default React.memo(({params, content}) => {
  const SubTitle = params?.Subpage;
  const Title = params?.Formations;

  function getAllDurations(obj) {
    let durationSum = 0;
    for (let key in obj) {
      if (key === "Duration") {
        durationSum += parseInt(obj[key]);
      } else if (typeof obj[key] === 'object') {
        durationSum += getAllDurations(obj[key]);
      }
    }
    return durationSum;
  }


  return (
    <div className='Formation'>
      <div className='Menu'>
        <h1>{SubTitle}</h1>
        <h2><FormattedTime mode="h" seconds={getAllDurations(content[SubTitle])} /></h2>
        <div className='MenuChapterContainer'>          
          <h2>Chapitres</h2>
          <MenuChapter content={content} SubTitle={SubTitle} />
        </div>
      </div>
      <Player params={params} content={content} />
    </div>
  );
});





export const getStaticProps = async ({params}) => {
  //const { getVideoDurationInSeconds } = require('get-video-duration');
  const Id = params.Formations;
  const Subpage = params.Subpage;
  const res = await fetch('https://formation.lucasarts.fr/');
  var posts = await res.json();
  var files = posts[Id][Subpage];

  return {
    props: {
      params, // Le dossier Parent
      content : posts[Id], // Contenu des Dossiers Parents
    },
    revalidate : 5,
  };
};


// Create Paths from Folder
export const getStaticPaths = async () => {

  const res = await fetch('https://formation.lucasarts.fr/');
  const posts = await res.json();

  const paths = [];
  for (const [item, subItem] of Object.entries(posts)) {
      for (const [subpage, value] of Object.entries(subItem)) {
          paths.push({
              params: {
                  Formations: item,
                  Subpage: subpage
              }
          });
      }
  }
  
  return {
    paths,
    fallback: false,
  };
};

