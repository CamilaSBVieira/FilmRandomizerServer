const express = require('express')
const axios = require('axios')
const cors = require('cors')
require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 5000
const API_KEY = process.env.API_KEY

app.use(cors())

app.set('trust proxy', 1);

app.get('/genres', async (req, res) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
        const responseData = await response.data;
        return res.json(responseData)
    } catch(err) {
        console.log("genres" + err)
        return err
    }
})

app.get('/movies?:query', async (req, res) => {
    console.log("page" + req.query.page)
    console.log("genre" + req.query.genre)
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&page=${req.query.page}&with_genres=${req.query.genre}`);
        const responseData = await response.data;
        return res.json(responseData)
    } catch (err) {
        console.log("movies" + err)
        return err;
    }
})

app.get('/cast?:query', async (req, res) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${req.query.id}/credits?api_key=${API_KEY}`);
        const responseData = await response.data;
        return res.json(responseData)
    } catch(err) {
        console.log("cast" + err)
        return err;
    }
})

app.get('/info?:query', async (req, res) => {
    console.log("id" + req.query.id)
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${req.query.id}?api_key=${API_KEY}`);
        const responseData = await response.data;
        return res.json(responseData)
    } catch(err) {
        console.log("info" + err)
        return err;
    }
})

app.get('/providers?:query', async (req, res) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${req.query.id}/watch/providers?api_key=${API_KEY}`);
        const responseData = await response.data;
        return res.json(responseData)
    } catch(err) {
        console.log("provider" + err)
        return err;
    }
})

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))