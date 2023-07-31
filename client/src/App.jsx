import './App.css'
import CardPlaceholder from './components/CardPlaceholder'
import Header from './components/Header'
import LoadingSpinner from './components/LoadingSpinner'
import RowNew from './container/RowNew'
import useGetArticle from './hooks/useGetArticles'
import Footer from './components/Footer'

function App() {
   const { allArticles, isLoading, error } = useGetArticle()
   return (
      <main>
         < Header />

         <section className='container-news container'>
            {
               isLoading &&
               <>
                  < LoadingSpinner />

                  <div className='placeholder-grid'>
                     < CardPlaceholder />
                     < CardPlaceholder />
                     < CardPlaceholder />
                     < CardPlaceholder />
                  </div>

               </>
            }
            {
               error && <h2>{error.message}</h2>
            }
            {
               allArticles.map(newSite => {
                  const { firstArticles, name, imageSite, urlSite } = newSite
                  return (
                     < RowNew key={name} name={name} firstArticles={firstArticles} imageSite={imageSite} urlSite={urlSite} />
                  )
               })
            }
            {
               /* footer */
            }
         </section>
         
         < Footer />
      </main>
   )
}

export default App
