// // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
// import { signOut, } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getDatabase,get,ref,} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCr14V0FvRQJZi2An0Zb_Q_We6azOgazzk",
  authDomain: "fireblog-986fb.firebaseapp.com",
  projectId: "fireblog-986fb",
  storageBucket: "fireblog-986fb.appspot.com",
  messagingSenderId: "830922702290",
  appId: "1:830922702290:web:e6a8fcddb313fb47f3dc0b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const auth = getAuth(app)
const db = getDatabase(app)




function GetPostData(){
    const user_ref = ref(db, 'post/');
    get(user_ref).then((snapshot)=>{
        const data = snapshot.val();
        
        let html = "";
        const table = document.querySelector('.main');
        for(const key in data){
            const { title, post_content } = data[key];
           console.log(post_content);

            html +=`
            <div class="post">
            <h2>${title}</h2>
            <p>
            ${post_content}
            </p>
            </div>
            `
            
            // `
            //     <tr>
            //         <td><span class="postNumber"></span></td>
            //         <td>${title}</td>
            //         <td><button class="delete" onclick="delete_data('${key}')">Delete</button></td>
            //         <td><button class="update" onclick="update_data('${key}')">Update</button></td>
            //     </tr>
            // `;
        }
        table.innerHTML = html;
    })
}
GetPostData()






// sign out logout
// const signOutBtn = document.querySelector('#logout')
// signOutBtn.addEventListener('click',()=>{
//     signOut(auth).then(()=>{
//         //
//     }).catch((error)=>{
//         console.log("error" + error)
//     })
// })



// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
// import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
// import { getDatabase, get, ref } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCr14V0FvRQJZi2An0Zb_Q_We6azOgazzk",
//   authDomain: "fireblog-986fb.firebaseapp.com",
//   projectId: "fireblog-986fb",
//   storageBucket: "fireblog-986fb.appspot.com",
//   messagingSenderId: "830922702290",
//   appId: "1:830922702290:web:e6a8fcddb313fb47f3dc0b"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getDatabase(app);


// //Sign-outlogout functionality
// const signOutBtn = document.querySelector('#signout');
// signOutBtn.addEventListener('click', () => {
//     signOut(auth).then(() => {
//         console.log("User signed out successfully");
        
//     }).catch((error) => {
//         console.log("Error signing out: " + error);
//     });
// });

