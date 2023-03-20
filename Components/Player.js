import React, { useEffect, useState, memo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ListVideo from '@/Components/ListVideo';
import FormattedTime from '@/Components/FormattedTime';

export default function Player({params, content}) {
  
  const [SelectVideo, setSelectVideo] = useState("");
  const [ActiveVideo, setActiveVideo] = useState("");

  const SubTitle = params?.Subpage;
  const Title = params?.Formations;

  useEffect(() =>{
    // var file = URL.createObjectURL( new Blob([SelectVideo],{"type" : "video\/mp4"}));
    setActiveVideo("file")
  }, [SelectVideo])

  // Check If Tuto as Chapter or Not
  const AsChapter = (Array.isArray(content[SubTitle])) ?

    // If It does not Have Chapter
    content[SubTitle].map((video, index) => {      
      return(
        <ListVideo Index={index+1} SelectVideo={SelectVideo} setSelectVideo={setSelectVideo} key={uuidv4()} Blob={video.Blob} Path={video.Path} Name={video.Name} Duration={video.Duration} Title={Title} SubTitle={SubTitle} /> 
      )
    }):
    // If it does Have Chapter (SubFolder)
    Object.keys(content[SubTitle]).map((Chapter) => {
      // Return VIDEO Only (Not PDF etc...)
      var ChapterDuration = 0;
      var VideoCount = 0;
      const Name = content[SubTitle][Chapter].map((video, index) =>{        
        ChapterDuration += parseInt(video.Duration); // Get Duration Of Each Chapter
        VideoCount += 1;
        return (
          video.Name?.includes('.mp4') && 
          <ListVideo Index={index+1} SelectVideo={SelectVideo} setSelectVideo={setSelectVideo} key={uuidv4()} Blob={video.Blob} Path={video.Path} Duration={video.Duration} Name={video.Name} Title={Title} SubTitle={`${SubTitle}/${Chapter}`} />
        )
      });

      // Get Number of Video for Each Chapter
      const NbVideo = (VideoCount > 1) ? VideoCount+" vidéos" : VideoCount+" vidéo";

      return (
      <div key={uuidv4()} className="ListVideoContainer">
        <h2 id={Chapter}>{Chapter} - <span>{NbVideo}</span> - <FormattedTime mode="h" seconds={ChapterDuration} /></h2>
        <div>{Name}</div>
      </div>
      )
    })
  
  return (      
      <div className='Content'>       
        <div className='PlayerContainer'>
          <video controls className="MainPlayer" key={uuidv4()}>
            <div>test</div>
            <source src={ActiveVideo} type="video/mp4"></source>
          </video>
        </div>
        <div className='ListVideoWrapper'>
          {AsChapter}
        </div>
      </div>
  );
};

