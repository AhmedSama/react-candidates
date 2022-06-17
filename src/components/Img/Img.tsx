import style from "./Img.module.css"


export const Img = ({src,id,onClick} : {src:string,id:string,onClick : (id:string) => void}) => {


  if(id==="21"){
    return (
      <div onClick={()=>onClick(id)} style={{width : 81, height :81}}  className={style['image-container']}>
          <img src={src} alt={src} />
      </div>
    )
  }
  return (
    <div onClick={()=>onClick(id)} className={style['image-container']}>
        <img src={src} alt={src} />
    </div>
  )
}
