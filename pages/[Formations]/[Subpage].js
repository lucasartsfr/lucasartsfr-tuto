import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
// import ListVideo from '@/Components/ListVideo';
import dynamic from 'next/dynamic';

export default function Subpage({params, content, active}){
  
  const ListVideo = dynamic(import('@/Components/ListVideo'), { ssr: false }) // Fix Duration 
  const [select, setSelect] = useState(null);
  const SubTitle = params?.Subpage;
  const Title= params?.Formations;
  const AsChapter = (Array.isArray(content[SubTitle])) ?
    // If It does not Have Chapter
    content[SubTitle].map((video, index) => {
      return(
        <ListVideo Duration={video.Duration} key={uuidv4()} Name={video.File} Title={Title} SubTitle={SubTitle} /> //Duration={active[index].Duration}
      )
    })
    :
    // If it does Have Chapter (SubFolder)
    Object.keys(content[SubTitle]).map(Chapter =>{
      // Return VIDEO Only (Not PDF etc...)
      const Files = content[SubTitle][Chapter].map(video =>{
        return (
          video.File.includes('.mp4') && 
          <ListVideo key={uuidv4()} Name={video.File} Title={Title} SubTitle={`${SubTitle}/${Chapter}`} />
        )
      });

      return <div key={uuidv4()}>
        <h2>{Chapter}</h2>
        <div>{Files}</div>
      </div>
    })

  
  return (
    <div>
      <h1>SUBPAGE {Title}</h1>
      {AsChapter}
    </div>
  );
};



// Get Videos
// export async function getStaticProps(context){
//   const slug = context.params.Formations;  
//   const { getVideoDurationInSeconds } = require('get-video-duration')
//   const fs = require("fs");
//   const ffmpeg = require('ffmpeg-static');
//   const Directory = './public/formations/'+slug;
//   const PublicDirectory = Directory.split("./public")[1];

//   return new Promise(async (resolve, reject) => {
//     fs.readdir(Directory, async (err, files) => {
//       if (err) {
//         reject(err);
//       } else {
//         const videos = await Promise.all(files.map(async name => {
//           const duration = await getVideoDurationInSeconds(`${Directory}/${name}`);
//           return {
//             Name: name,
//             Duration: duration,
//           };
//         }));
//         resolve({
//           props : {
//             videos,
//             PublicDirectory
//           },
//           revalidate: 3600,
//         });
//       }
//     });
//   });
// }

export const getStaticProps = async ({params}) => {
  const { getVideoDurationInSeconds } = require('get-video-duration');
  const Id = params.Formations;
  const Subpage = params.Subpage;
  const Directory = "https://drive.lucasarts.fr/admin/uploads/Formations/"
  const res = await fetch('https://drive.lucasarts.fr/admin/uploads/Formations/');
  var posts = await res.json();
  var files = posts[Id][Subpage];

    // If Has no Chapter
    Array.isArray(files) && await Promise.all(files.map(async name => {
      const Path = `${Directory}/${Id}/${Subpage}/${name.File}`;
      const duration = await getVideoDurationInSeconds(Path); 
      name.Duration = duration;        
    }));

    // If has Chapter
    !Array.isArray(files) && await Promise.all(Object.keys(files).map(Sub =>{
      files[Sub].map( async name => {
        const Path = `${Directory}${Id}/${Subpage}/${Sub}/${name.File}`;
        const duration = Path.includes('.mp4') && await getVideoDurationInSeconds(Path); 
        // name.Duration = duration;   
        name.Duration = "0";   
      })
    }))
   

  return {
    props: {
      params, // Le dossier Parent
      content : posts[Id], // Contenu des Dossiers Parents
    },
  };
};

// Create Paths from Folder
export const getStaticPaths = async () => {

  const res = await fetch('https://drive.lucasarts.fr/admin/uploads/Formations/');
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

