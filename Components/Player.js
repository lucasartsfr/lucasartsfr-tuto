export default function Player({path, id}){
    return(
        <video controls width="250" poster='https://www.vuescript.com/wp-content/uploads/2018/11/Show-Loader-During-Image-Loading-vue-load-image.png'>
            <source type="video/mp4" src={`${path}/${id}`} />
        </video>
    )
}