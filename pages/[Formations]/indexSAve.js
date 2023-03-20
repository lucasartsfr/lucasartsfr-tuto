import React, { useState } from 'react';
import Link from 'next/link';

export default function Formations({params, content}){

  const [select, setSelect] = useState(null);
  const Title = params?.Formations;
  const SubFolder = (content) && Object.keys(content);

  // Video Theme List
  const VideosTheme = SubFolder?.map(item => {
    return (
      <div key={item}>
        <Link href={`/${Title}/[SubPage]`} as={`/${Title}/${item}`}>{item}</Link>
      </div>
    );
  })
  

  return (
    <div>       
      {VideosTheme}
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
  const Id = params.Formations;
  const res = await fetch('https://drive.lucasarts.fr/admin/uploads/Formations/');
  const posts = await res.json();

  return {
    props: {
      params, // Le dossier Parent
      content : posts[Id] // Contenu des Dossiers Parents
    },
  };
};

// Create Paths from Folder and SubFolder
export const getStaticPaths = async () => {
  const res = await fetch('https://drive.lucasarts.fr/admin/uploads/Formations/');
  const posts = await res.json();
  const paths = Object.keys(posts).map(item => {
  const SubPath = Object.keys(posts[item]).map(x => x);

    return {
      params : {
        Formations : item, // Dossier Parent
        Subpage : SubPath
      }
    }
  })  

  return {
    paths,
    fallback: false,
  };
};

