import { useEffect, useState } from "react";
import { getArticles } from "../utils/utils";

const useGetArticle = () => {
    const [ allArticles, setAllArticles ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)
    const [ error, setError ] = useState('')
    
    useEffect(() => {
        setIsLoading(true)
        getArticles()
        .then( data => {
            setAllArticles(data)
        })
        .catch( error => {
            setError(error)
        })
        .finally(() => setIsLoading(false))
    }, [])

    return {
        allArticles,
        isLoading,
        error
    }
}

export default useGetArticle