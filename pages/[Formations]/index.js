import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Formations({params, content}){
  const [select, setSelect] = useState(null);
  const Title = params?.Formations;
  const SubFolder = (content) && Object.keys(content);
  const router = useRouter();

  // Video Theme List 
  const VideosTheme = SubFolder?.map(item => {
    console.log(item)
    return (
      <div key={item}>
        <Link href={`${Title}/${item}`}>{item}</Link>
      </div>
    );
  })
  

  return (
    <div>       
      {VideosTheme}
    </div>
  );
};


export const getStaticProps = async ({params}) => {
  const Id = params.Formations;
  const res = await fetch('https://formation.lucasarts.fr/');
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
  const res = await fetch('https://formation.lucasarts.fr/');
  const posts = await res.json();
  const paths = Object.keys(posts).map(folder => {
    console.log(folder)
    const SubPath = Object.keys(posts[folder]).map(x => x);
    return {
      params : {
        Formations : folder, // Dossier Parent
        Subpage : SubPath
      }
    }
  })  

  return {
    paths,
    fallback: false,
  };
};

