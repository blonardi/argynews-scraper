import './App.css'
import Header from './components/Header'
import RowNew from './container/RowNew'
import useGetArticle from './hooks/useGetArticles'

function App() {
  const { allArticles, isLoading, error } = useGetArticle()

  return (
    <main>

      < Header />

      <section className='container-news container'>
        {
          isLoading && <h2>poner los skeletons</h2>
        }
        {
          error && <h2>{error.message}</h2>
        }
        {
          allArticles.map( newSite => {
            const { firstArticles, name, imageSite, urlSite } = newSite
            return(
              < RowNew key={name} name={name} firstArticles={firstArticles} imageSite={imageSite} urlSite={urlSite} />
            )
          })
        }
        {
          /* footer */
        }
      </section>
      
    </main>
  )
}

export default App
