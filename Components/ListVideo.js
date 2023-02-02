import React, { useRef, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function ListVideo({SubTitle, Name, Title, Duration}){

    const VideoRef = useRef(null);

    const handleLoadedMetadata = (e) => {
        // const video = VideoRef.current;
        // setDuration(video.duration);
        // const canvas = document.createElement("canvas");
        // canvas.width = video.videoWidth;
        // canvas.height = video.videoHeight;
        // canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
        // video.currentTime = 4;
      };
   

    return(
        <div key={uuidv4()}>
          <h4>{Name.split('.mp4')[0]}</h4>
            <span key={uuidv4()}> {Duration || 0} secondes</span>
            <video className={this} ref={VideoRef} key={uuidv4()} width={200} onLoadedMetadata={handleLoadedMetadata} preload="metadata">
              <source               
                type="video/mp4" 
                src={`https://drive.lucasarts.fr/admin/uploads/Formations/${Title}/${SubTitle}/${Name}`}/>
            </video>
        </div>
    )
}