import { PrismaClient } from '@prisma/client'
import 'dotenv/config'
import fetch, { FetchError } from 'node-fetch';
//const {PrismaClient} = require('@prisma/client')
//import { fetch } from 'node-fetch';
//const Fetch = require('node-fetch');

const bacdrop_size = ["original", "w300", "w780", "w1280"];
const poster_size = ["w92","w154","w185","w342","w500","w780","original"]

const prisma = new PrismaClient;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const url_configuration = `${process.env.URL_CONFIGURATION}?api_key=${process.env.API_KEY}` 
const url_weekly_movies = `${process.env.URL_MOVIES_WEEKLY}?api_key=${process.env.API_KEY}&language=${process.env.LANGUAGE}`
const url_all_movies = `${process.env.URL_ALL_MOVIES}?api_key=${process.env.API_KEY}`
const url_find_movie = `${process.env.URL_FIND_MOVIE}`

/* fetch(url_configuration).then(res => {
    return res.json();
}).then(json =>{
    //console.log(json);
}) */

/* 
fetch(url_weekly_movies).then(res => {
    return res.json();
}).then(json =>{
    let movies = json.results
    movies.forEach((value, index, array) => {
        console.log("Lista "+index);
        let title = value.title;
        console.log(title);
    })
}) */

//total paginas = 65, movies = 6477


/* 
for(let i=1;i<=65;i++){
    fetch(url_all_movies+`&page=${i}`).then(res=>{
        return res.json()
    }).then(data =>{
        let results = data.results
        results.forEach(value => {
            
            allMoviesId.push(value.id)

            fetch(url_find_movie+`/${value.id}?api_key=${process.env.API_KEY}&language=${process.env.LANGUAGE}`).then(res =>{
                return res.json()
            }).then(info =>{
                

                console.log(info);
            })
        })
        //buscar pelicula segun id
    })
await sleep(2000);

} */


async function fill(id,title, original_title, overview, poster,backdrop ,popularity, release_date, category){
    const movie = await prisma.movie.create({
        data:{
            id:id,
            title:title,
            original_title:original_title,
            Poster:poster,
            overview:overview,
            Backdrop:backdrop,
            popularity:popularity,
            release_date:release_date,
            genres:category
        }
    })
}

//43997
    const i = process.argv[2]
    fetch(`${process.env.URL_POPULAR}?api_key=${process.env.API_KEY}&language=${process.env.LANGUAGE}&page=${i}`).then(res => {return res.json()})
    .then(data =>{
        sleep(200);


        let results = data.results;
        results.forEach((value) => {   
            sleep(200);
            let id= value.id;
            let backdrop = value.backdrop_path
            let title = value.title
            let popularity = value.popularity
            let release_date = value.release_date
            let overview = value.overview
            let original_title = value.original_title
            let poster = value.poster_path
            let aux = "";
            let genres = value.genre_ids





            console.log(genres);
            console.log();
            genres.forEach((value,) => {
                console.log(value);
                aux=aux+(value+" ")
            })
            console.log(aux);
            try {
                fill(id, title, original_title, overview??"no data", poster??"no data", backdrop??"no data", popularity, release_date??"no data", aux);
            } catch (error) {
                console.log("hola");
            }
            console.log(value);
        })

    }).catch(error =>{
        console.log(error);
        sleep(2000);
    })


//probar data


/* 
const main = async ()=>{
    const post = await prisma.post.create({
        data:{
        }
    })
    console.log(post);
}
 */
