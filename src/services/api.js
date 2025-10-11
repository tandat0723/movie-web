import axios from "axios";

export const imagePath = 'https://image.tmdb.org/t/p/w500'
export const imagePathOriginal = 'https://image.tmdb.org/t/p/original'

const baseUrl = 'https://api.themoviedb.org/3'
const APIKey = import.meta.env.VITE_API_KEY

//Trending
export const fetchTrending = async (timeWindow = 'day') => {
    const { data } = await axios.get(
        `${baseUrl}/trending/all/${timeWindow}?api_key=${APIKey}`
    )

    return data?.results
}

//Movies - Details
export const fetchDetails = async (type, id) => {
    const res = await axios.get(`${baseUrl}/${type}/${id}?api_key=${APIKey}`)

    return res?.data
}

//Movies & series - credits
export const fetchCredits = async (type, id) => {
    const res = await axios.get(`${baseUrl}/${type}/${id}/credits?api_key=${APIKey}`)

    return res?.data
}

//Movies & series - videos
export const fetchVideos = async (type, id) => {
    const res = await axios.get(`${baseUrl}/${type}/${id}/videos?api_key=${APIKey}`)

    return res?.data
}

// Discover
export const fetchMovies = async (page, sortBy) => {
    const res = await axios.get(`
        ${baseUrl}/discover/movie?api_key=${APIKey}&page=${page}&sort_by=${sortBy}`)

    return res?.data
}

export const fetchTvSeries = async (page, sortBy) => {
    const res = await axios.get(`
        ${baseUrl}/discover/tv?api_key=${APIKey}&page=${page}&sort_by=${sortBy}`)

    return res?.data
}

//Search
export const searchData = async (query) => {
    const res = await axios.get(`
        ${baseUrl}/search/multi?api_key=${APIKey}$query=${query}`)

    return res?.data
}