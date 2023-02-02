export default function List({path, videos}){

    const ListVideo = videos?.map((item) =>{
        const Name = item.Name.split('.mp4')[0]
        return(
            <div className="VideosList">
                <h3>{Name}</h3>
                <h4>{item.Duration}</h4>
            </div>
        )
    })    

    return ListVideo;
}