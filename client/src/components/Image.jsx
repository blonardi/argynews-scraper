import './Image.css'
import { defaultImageUrl } from '../utils/utils'

export default function Image({imageUrl, isSiteImage, alt}) {

  const imageClassName = isSiteImage ? 'site-image' : 'new-image'
  const altImage = isSiteImage ? `Foto del sitio de noticias ${alt}` : alt
  const srcImage = imageUrl ?? defaultImageUrl

  return (
    <div className='image-container'> 
        <img className={imageClassName} src={srcImage} alt={altImage} />
    </div>
  )
}
