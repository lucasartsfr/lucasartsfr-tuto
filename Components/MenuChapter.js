import {FaBook as CloseBook} from "react-icons/fa";
import {GiWhiteBook as CloseBookB} from "react-icons/gi";
import {GiBookCover as OpenBook} from "react-icons/gi";
import { v4 as uuidv4 } from 'uuid';

export default function MenuChapter({SubTitle, content}){

    const Trunk = 20;
    
    const SelectChapter = (e) =>{ 
        document.querySelector('.Active')?.classList.remove('Active');
        e.currentTarget.classList.add('Active');
    }

    const MenuChapter = (!Array.isArray(content[SubTitle])) && Object.keys(content[SubTitle]).map((Chapter) => {
        const TitleOnly = Chapter.split(' - ')[1];
        const String = TitleOnly.length > Trunk ? TitleOnly.substr(0, Trunk)+"..." : TitleOnly;

        return (
          <a href={`#${Chapter}`} key={uuidv4()}>
            <div className={`MenuChapter`} data-id={Chapter} onClick={SelectChapter} title={Chapter}>
              <div className='HoverMarker'></div>
                <OpenBook className="OpenBook" />
                <CloseBookB className="CloseBook"/>
              {String}
            </div>
          </a>
        )
      })


    return MenuChapter;
}