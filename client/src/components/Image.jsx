import './Image.css'
import { defaultImageUrl } from '../utils/utils'
import { useState } from 'react'
import ImagePlaceholder from './ImagePlaceholder'

export default function Image({ imageUrl, isSiteImage, alt }) {
   /* const [ isImageLoaded, setIsImageLoaded] = useState(false)
   const classNameImage = isImageLoaded ? 'card-image' : 'inactive' */
   const [ isImageLoaded, setIsImageLoaded] = useState(false)
   // const imageClassName = isSiteImage ? 'site-image' : 'new-image'
   let imageClassName
   if(!isImageLoaded){
      imageClassName = 'inactive'
   } else if( isImageLoaded && isSiteImage){
      imageClassName = 'site-image'
   } else {
      imageClassName = 'new-image'
   }
   const altImage = isSiteImage ? `Foto del sitio de noticias ${alt}` : alt
   const srcImage = imageUrl ?? defaultImageUrl

   return (
      <div className='image-container'>
         { !isImageLoaded && < ImagePlaceholder /> }
         <img className={imageClassName} onLoad={() => setIsImageLoaded(true)} src={srcImage} alt={altImage} />
      </div>
   )
}
