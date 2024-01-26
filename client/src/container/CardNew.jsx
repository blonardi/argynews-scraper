import './CardNew.css'
import TitleNew from '../components/TitleNew'
import Image from '../components/Image'

export default function CardNew({  urlSite, firstArticles }) {

  return (
    <>
        {
          firstArticles.map(article => {
            const { title, image, url } = article
						//console.log({url})
            //const fixedUrl = url === 'undefined' ? urlSite : url
						const fixedUrl = (url !== undefined && url.startsWith('/')) ? `${urlSite}${url}` : url;
						console.log({fixedUrl})
            const href = fixedUrl.startsWith('/') ? `${urlSite}${url}` : url
						
            return(
              <article className='card-new' key={title}>
                <a href={href} target='_blank' rel='noreferrer' >
                  <TitleNew title={title} />
                  <Image imageUrl={image} alt={title} />
                </a>
              </article>
            )
          })
        }
    </>
  )
}
