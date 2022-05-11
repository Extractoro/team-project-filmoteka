import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword,  signInWithEmailAndPassword} from 'firebase/auth'
import Notiflix from 'notiflix';
// export { films };


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

// дані для відмальовування бібліотеки перемінна films 
// import { films } from "module-name";
let films = [];
console.log(films)
getDocs(colRef)
    .then((snapshot) => {
        // let films = []
        snapshot.docs.forEach((doc) => {
            films.push({...doc.data(), id: doc.id})
        })
        // console.log(films)
        // return films
    })
    .catch(err => {
    console.log(err.message)
    })


document.getElementById('auth-add-js').addEventListener('click', (title, year,
    jenre, rating) => {

    title = document.querySelector('.moviе-stats__title')
    year = document.querySelector('.moviе-year')
    jenre = document.querySelector('.moviе-genre__item')
    rating = document.querySelector('.moviе-vote')
    
    addDoc(colRef, {
        title: title.textContent,
        year: year.textContent,
        jenre: jenre.textContent,
        rating: rating.textContent,
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
            // ...
            Notiflix.Notify.info(`You are logged in ${email}`);
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
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        window.alert(errorCode + errorMessage)
        });
    })

    const libraryDiv = document.querySelector(`.films__gallery`)
    const refLibrary= document.getElementById('library');
    console.log(refLibrary)
refLibrary.addEventListener('click', renderGallery)
    
 function reGallery(){
 libraryDiv.innerHTML = '';
}

function renderGallery(films) {
        
//     let genreArr = []

// genres.forEach(element => {
//           console.log(element.id)
//           if (element.id == 28) {
//      genreArr.push(element.name)
//               console.log(genreArr)
//           }
// });
 
    const markup = films
    .map(({id, poster_path, title, genre_ids, release_date, vote_average}) => {
        return `<li class='gallery-items films__gallery-item id=${id}'>
        <a href="https://image.tmdb.org/t/p/original${poster_path} class="list-card__link">
            <!-- постер -->
            <div class="moviе-item__img-container">
    
                <img src="https://image.tmdb.org/t/p/w500${poster_path}"
                    alt="${title}"
                    class="moviе-item__img"/>
            </div>
            <div class=""movie-stats" id=${id}>
                <h2 class="movie-stats__title">${title.toLowerCase()}</h2>
                <div class="movie-stats__info">
                    <p class="movie-genre">
                        ${genre_ids} |  ${release_date.slice(0, 4)}
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
   libraryDiv.innerHTML = markup;
   
}

import { genres } from "./base/genres";
// let genreArr = []

// genres.forEach(element => {

//           if (element.id = genre_ids) {

//               console.log(element.name)
//           }
// });

//  .map(({id, poster_path, title, genre_ids, release_date, vote_average