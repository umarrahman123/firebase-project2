// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
  import { getDatabase,set,ref,get,remove,update} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
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

  const auth = getAuth(app)
  const db = getDatabase(app)

  const my_blog = document.querySelector('.my_blog')
  const login_page = document.querySelector('.login')

  
  onAuthStateChanged(auth,(user)=>{
    if (user) {
        my_blog.classList.add('show')
        login_page.classList.add('hide')
    } else{
        my_blog.classList.remove('show')
        login_page.classList.remove('hide')
    }
  })

  function signInUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) =>{
            console.log(userCredentials.user.uid);
        })
        .catch((error) => {
            console.error("Error signing in:", error.message);
        });
}

const signInBtn = document.querySelector('#sign_in');
signInBtn.addEventListener('click', signInUser);


// sign out logout
const signOutBtn = document.querySelector('#logout')
signOutBtn.addEventListener('click',()=>{
    signOut(auth).then(()=>{
        //
    }).catch((error)=>{
        console.log("error" + error)
    })
})

//........
// blog section code
const notify =document.querySelector('.notifiy')

const add_post_btn = document.querySelector('#post_btn')

function Add_posting() {
    const title = document.querySelector('#title').value;
    const post_content = document.querySelector('#post_content').value;
    const id = Math.floor(Math.random() * 100);

    set(ref(db, 'post/' + id), {
        title: title,
        post_content: post_content,
    })
    .then(() => {
        notify.innerHTML = "Data Added";
        document.querySelector('#title').value = "";
        document.querySelector('#post_content').value = "";
    })
    .catch((error) => {
        console.error("Error adding post:", error);
        notify.innerHTML = "Failed to add data";
    });
    GetPostData()
}



add_post_btn.addEventListener('click',Add_posting)


function GetPostData(){
    const user_ref = ref(db, 'post/');
    get(user_ref).then((snapshot)=>{
        const data = snapshot.val();
        
        let html = "";
        const table = document.querySelector('table');
        for(const key in data){
            const { title, post_content } = data[key];
            html += `
                <tr>
                    <td><span class="postNumber"></span></td>
                    <td>${title}</td>
                    <td><button class="delete" onclick="delete_data('${key}')">Delete</button></td>
                    <td><button class="update" onclick="update_data('${key}')">Update</button></td>
                </tr>
            `;
        }
        table.innerHTML = html;
    }).catch((error) => {
        console.error("Error fetching data:", error.message);
    });
}



GetPostData()

// delete_Data


window.delete_data = function(key) {
    // alert(key);
    remove(ref(db, `post/${key}`)) // Add backticks around `post/${key}`
        .then(() => {
            notify.innerHTML = "Data Deleted";
            GetPostData(); // Ensure this function is defined
        })
        .catch((error) => {
            console.error("Error deleting data:", error.message);
        });
}

//get and update data

window.update_data = function(key) {
   const user_ref =  ref(db, `post/${key}`)
   get(user_ref).then((item)=>{
    document.querySelector('#title').value = item.val().title
    document.querySelector('#post_content').value = item.val().post_content
})
    const update_btn = document.querySelector('.update_btn')
    update_btn.classList.add('show')
    console.log('update show horaha hen');
    document.querySelector('.post_btn').classList.add('hide')
// Update
    update_btn.addEventListener('click',Update_Form)
    function Update_Form(){
        const title = document.querySelector('#title').value;
        const post_content = document.querySelector('#post_content').value;
        update(ref(db,`post/${key}`),{
            title:title,
            post_content:post_content
        })
        GetPostData()

        document.querySelector('#title').value = "";
        document.querySelector('#post_content').value = "";
        
    }
   
   
}