import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'
import {
    getAuth, createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    getMultiFactorResolver, onAuthStateChanged
} from 'firebase/auth'
import Notiflix from 'notiflix';
import { movieApiService } from './render_movies';
// export { films };

const modal = document.querySelector('.auth-modal')
const openModal = document.querySelector('.open_auth-js')
console.log(openModal)

const firebaseConfig = {
  apiKey: "AIzaSyCgHWVD37iS9SyzyjybiROGSJgrZBuPF74",
  authDomain: "fir-g3-a635e.firebaseapp.com",
  projectId: "fir-g3-a635e",
  storageBucket: "fir-g3-a635e.appspot.com",
  messagingSenderId: "387248887615",
  appId: "1:387248887615:web:53bf0176f3707f756ae58a"
};
initializeApp(firebaseConfig)

const db = getFirestore()
const colRef = collection(db, 'films')
const auth = getAuth();
console.log(auth.currentUser)

// дані для відмальовування бібліотеки перемінна films 
// import { films } from "module-name";
let films = [];

document.getElementById('add-queue-js').addEventListener('click', (genre_ids,poster_path, id, title,  release_date, vote_average ) => {
 
    // const emailll = onAuthStateChanged(auth, user => {
    // // console.log('user status changed', user.email)
    //     console.log('user status changed', user.email)
    //     console.log(emailll)
    // return user.email
    // })
    
    // genre_ids = document.querySelector('.movie-genre')
    // poster_path = document.querySelector('.render-js')
    // id = document.querySelector('.films__gallery-item')
    // title = document.querySelector('.movie-stats__title')
    // release_date = document.querySelector('.moviе-vote')
    // vote_average = document.querySelector('.movie-vote')
  
    addDoc(colRef, {
        genre_ids: 28,
        poster_path: '/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg',
        id: 50,
        title: 'смерть путина',
        release_date: '2022-03-30',
        vote_average: 5,
        status: 'quene',
        user: email
    })
        .then(() => {
        Notiflix.Notify.info(`ADD FILM`);
   
    })
})

// const deleteFilm = document.getElementById('auth-delete-js')
// deleteFilm.addEventListener('click', () => {
//     const filmId = document.querySelector('.moviе-stats__title')
//     const docRef = doc(db, 'films','8wfZd0SKKilPxr1r9pYa')
 

//     deleteDoc(docRef)
//         .then(() => {
//         console.log('Delete')
//     })
    
// })

    document.getElementById("login").addEventListener('click', function () {
        const email = document.getElementById('email').value
        const password = document.getElementById('pass').value

        console.log(email)
        console.log(password)

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            // ...
            Notiflix.Notify.info(`You are logged in ${email}`);
            modal.classList.add('visually-hidden');
            // openModal.setAttribute('disabled', true);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            window.alert(errorCode + errorMessage);
        });
     
        
    })
        
    document.getElementById("register").addEventListener('click', function(){
    const email = document.getElementById('email').value
    const password = document.getElementById('pass').value

    console.log(email)
    console.log(password)

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
            const user = userCredential.user;
            console.log(user)
        // ...
            window.alert('Created')
            // modal.classList.add('visually-hidden');
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        window.alert(errorCode + errorMessage)
        });
        
    })

    const containerFilms = document.querySelector(`.films__gallery`)
    const refLibrary = document.getElementById('library')
    const refHome = document.getElementById('home')
refHome.addEventListener('click', () => {
    // containerFilms.innerHTML =''
  
    movieApiService.getPopularMovies()
    .then(({results}) => renderGalleryFilms(results))
        .catch((error => console.log(error)))
//    refHome.setAttribute('disabled', true);
})
refLibrary.addEventListener('click', (e) => {
    e.preventDefault();
    
   getDocs(colRef)
    .then((snapshot) => {
        // let films = []
        snapshot.docs.forEach((doc) => {
            films.push({ ...doc.data(), id: doc.id })
   const markup = films.filter(film => film.status == 'queue' && film.user == 'kuchmastanislav73@gmail.com').map(({ genre_ids,poster_path, id, title,  release_date, vote_average }) => {
        // console.log(films)
        return `<li class='gallery-items films__gallery-item id=${id}'>
        <a href="#" class="list-card__link">
            <!-- постер -->
            <div class="moviе-item__img-container">
    
                <img src="https://image.tmdb.org/t/p/w500${poster_path}"
                    alt="${title}"
                    class="moviе-item__img"
                    data-id="id=${id}"/>
            </div>
            <div class=""movie-stats">
                <h2 class="movie-stats__title">${title.toLowerCase()}</h2>
                <div class="movie-stats__info">
                    <p class="movie-genre">
                        ${genre_ids} | ${release_date.split(`-`)[0]}
                    </p>
                    <p class="movie-vote">
                      ${vote_average}
                    </p>
                </div>
            </div>
        </a>
    </li>`
      })
                .join('');
   
            containerFilms.innerHTML = markup;
    
        })
 
        // return films
    })
    .catch(err => {
        console.log(err.message)
       
    }) 
 })


import { genres } from "./base/genres";
// let genreArr = []

// genres.forEach(element => {

//           if (element.id = genre_ids) {

//               console.log(element.name)
//           }
// });

function renderGalleryFilms(movies, genres) {
  console.log(movies)
    const markup = movies
      .map(({ genre_ids, id, poster_path, title, release_date, vote_average }) => {

       return `<li class='gallery-items films__gallery-item id="${id}"'>
        <a href="#" class="list-card__link">
            <!-- постер -->
            <div class="moviе-item__img-container">
    
                <img class="render-js" src="https://image.tmdb.org/t/p/w500${poster_path}"
                    alt="${title}"
                    class="moviе-item__img"
                    data-id="id=${id}"/>
            </div>
            <div class=""movie-stats">
                <h2 class="movie-stats__title">${title.toLowerCase()}</h2>
                <div class="movie-stats__info">
                    <p class="movie-genre">
                        ${genre_ids} | ${release_date.split(`-`)[0]}
                    </p>
                    <p class="movie-vote">
                      ${vote_average}
                    </p>
                </div>
            </div>
        </a>
    </li>`
      })
    .join('');
    containerFilms.innerHTML = markup;
  }
const refWatched = document.getElementById('watched-js')
const refQueue = document.getElementById('queue-js')

refQueue.addEventListener('click', (e) => {

    // e.preventDefault();
    refWatched.setAttribute('disabled', true);
   getDocs(colRef)
    .then((snapshot) => {
        // let films = []
        snapshot.docs.forEach((doc) => {
            films.push({ ...doc.data(), id: doc.id })
   const markup = films.filter(film => film.status == 'queue' && film.user == 'kuchmastanislav73@gmail.com').map(({ genre_ids,poster_path, id, title,  release_date, vote_average }) => {
        // console.log(films)
        return `<li class='gallery-items films__gallery-item id=${id}'>
        <a href="#" class="list-card__link">
            <!-- постер -->
            <div class="moviе-item__img-container">
    
                <img src="https://image.tmdb.org/t/p/w500${poster_path}"
                    alt="${title}"
                    class="moviе-item__img"
                    data-id="id=${id}"/>
            </div>
            <div class=""movie-stats">
                <h2 class="movie-stats__title">${title.toLowerCase()}</h2>
                <div class="movie-stats__info">
                    <p class="movie-genre">
                        ${genre_ids} | ${release_date.split(`-`)[0]}
                    </p>
                    <p class="movie-vote">
                      ${vote_average}
                    </p>
                </div>
            </div>
        </a>
    </li>`
      })
                .join('');
   
            containerFilms.innerHTML = markup;
    
        })
 
        // return films
    })
    .catch(err => {
        console.log(err.message)
       
    }) 
 })


refWatched.addEventListener('click', (e) => {

    // e.preventDefault();
    // refWatched.setAttribute('disabled', true);
   getDocs(colRef)
    .then((snapshot) => {
        // let films = []
        snapshot.docs.forEach((doc) => {
            films.push({ ...doc.data(), id: doc.id })
   const markup = films.filter(film => film.status == 'watched' && film.user == 'kuchmastanislav73@gmail.com').map(({ genre_ids,poster_path, id, title,  release_date, vote_average }) => {
        // console.log(films)
        return `<li class='gallery-items films__gallery-item id=${id}'>
        <a href="#" class="list-card__link">
            <!-- постер -->
            <div class="moviе-item__img-container">
    
                <img src="https://image.tmdb.org/t/p/w500${poster_path}"
                    alt="${title}"
                    class="moviе-item__img"
                    data-id="id=${id}"/>
            </div>
            <div class=""movie-stats">
                <h2 class="movie-stats__title">${title.toLowerCase()}</h2>
                <div class="movie-stats__info">
                    <p class="movie-genre">
                        ${genre_ids} | ${release_date.split(`-`)[0]}
                    </p>
                    <p class="movie-vote">
                      ${vote_average}
                    </p>
                </div>
            </div>
        </a>
    </li>`
      })
                .join('');
   
            containerFilms.innerHTML = markup;
    
        })
 
        // return films
    })
    .catch(err => {
        console.log(err.message)
       
    }) 
})
 

// onAuthStateChanged(auth, user => {
//     console.log('user status changed', user.email)
//     return user.email
// })
  // openModal.setAttribute('disabled', true);
    //  .map(({id, poster_path, title, genre_ids, release_date, vote_average