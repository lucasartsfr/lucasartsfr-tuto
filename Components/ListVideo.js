import React, { useRef, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {HiPlay as Player} from "react-icons/hi2";
import {FiClock as Clock} from "react-icons/fi";
import FormattedTime from './FormattedTime';

export default function ListVideo({SubTitle, Name, SelectVideo, Duration, Path, setSelectVideo, Index}){
    const [isPaused, setIsPaused] = useState(false); // ajouter l'état initial

    // Set Video Path on Play
    const ClickPlay = (e) =>{ 
      SelectVideo !== Path && setSelectVideo(Path) 
      e.currentTarget.classList.toggle('ToPause')
      setIsPaused(!isPaused); // mettre à jour l'état de ToPause
    } 
    
    // Custom Icon on Play
    const AnimatedPlay = <div className='AnimatedPlay'><div></div><div></div><div></div></div>;
    const PausePlay = <Player className='PlayerVideo'/>;
    const PlayIcon = isPaused ? PausePlay : (SelectVideo == Path) ? AnimatedPlay : PausePlay; // utiliser l'état de ToPause Dynamique
    const Active = (SelectVideo == Path) ? "Active" : ""; // Class

    return(
        <div className={`ListVideo ${Active}`} key={uuidv4()} onClick={ClickPlay} >
          <div className='PlayerVideoContainer'>   
          {PlayIcon}   
          </div>
          <div className='PosterVideo'>
            <img src={`https://formation.lucasarts.fr/poster/${SubTitle.split('/')[0]}.jpg`}></img>
          </div>
          <h4 className='TitleVideo'>{Name.split('.mp4')[0]}</h4>
          {/* <span className='ChapterVideo'>{SubTitle.split('/')[1]}</span> */}
          <span className='DurationVideo'>
            <Clock className='ClockVideo'/>
            <FormattedTime mode="d" seconds={Duration} />
          </span>
        </div>
    )
}