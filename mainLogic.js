let check = true
let message = ""
let bg = ""
let border = ""
let currentPage = 1
let lastPage = 1
const urlParms = new URLSearchParams(window.location.search)
const id = urlParms.get("postId")

setTimeout(() => {
setUpNavBar()
}, 1)

function loginBtnClick() {
    const username = document.getElementById("username-name").value
    const password = document.getElementById("password-text").value
    
    const baseUrl = "https://tarmeezacademy.com/api/v1/login"
    const parms = {
        "username": username,
        "password": password
    }
    axios.post(baseUrl, parms)
        .then((response) => {
            check = true
            messageLogin = "Logged in successfully"
            bg = "#dff0d8"
            border = "2px solid green"
            let token = response.data.token
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(response.data.user))
            let modal = document.getElementById("login-modal")
            let modalInstance = bootstrap.Modal.getInstance(modal)
            modalInstance.hide()
            showMessage(check, messageLogin, bg, border)
            setUpNavBar()
            if(id != null){
                setUpComments()
            }

        })
        .catch((error) => {
            check = false
            message = "Invalid login, please try again"
            bg = "#e5a1a1"
            border = "2px solid red "
            showMessage(check, message, bg, border)
        })
}

function registerBtnClick() {
    const name = document.getElementById("register-name-input").value
    const username = document.getElementById("register-username-input").value
    const password = document.getElementById("register-password-input").value
    // const image = document.getElementById("register-image-input").files[0]
    
    const baseUrl = "https://tarmeezacademy.com/api/v1/register"

    let formData = new FormData();
    formData.append("username", username)
    formData.append("password", password)
    // formData.append("image", image)
    formData.append("name", name)

    const headers = {
        "Content-Type": "multipart/form-data"
    }
    axios.post(baseUrl, formData, {
        "headers": headers
    })
        .then((response) => {
            // console.log(response.data.profile_image)
            check = true
            message = "New User Register successfully"
            bg = "#dff0d8"
            border = "2px solid green "
            let token = response.data.token
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(response.data.user))
            let modal = document.getElementById("register-modal")
            let modalInstance = bootstrap.Modal.getInstance(modal)
            modalInstance.hide()
            showMessage(check, message, bg, border)
            setUpNavBar()
            if(id != null){
                setUpComments()
            }

        }).catch((error) => {
            check = false
            if (name == "") {
                message = error.response.data.errors.name[1]
            }
            else {
                message = "The username has already been taken"
            }
            bg = "#e5a1a1"
            border = "2px solid red "
            showMessage(check, message, bg, border)
        })


}

function showMessage(check, message, bg, border) {
    if (check) {
        alertMessage(message, bg, border)
    }
    else {
        alertMessage(message, bg, border)
    }
}

function alertMessage(message, bg, border) {
    document.getElementById("alert-message").classList.add("show-message")
    document.getElementById("alert-message").innerHTML = message
    document.getElementById("alert-message").style.backgroundColor = bg
    document.getElementById("alert-message").style.border = border
    const addPostBtn = document.getElementById("add-post")
    new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log("setTimeout");
            document.getElementById("alert-message").classList.remove("show-message")
            document.getElementById("alert-message").innerHTML = ""
            resolve();
        }, 2500)
    }).then(function () {
        console.log("done")
        console.log(message)
        if(id == null){
        if (message == "Logged in successfully")
            addPostBtn.style.display = "block"
        else {
            console.log("inner else")
        }
    }
    })

}

function setUpNavBar() {
    const token = localStorage.getItem("token")
    const loginBtn = document.getElementById("login-btn")
    const registerBtn = document.getElementById("register-btn")
    const logOutDiv = document.getElementById("logout-div")
    const addPostBtn = document.getElementById("add-post")
    const showDataUser = document.getElementById("show-data-username")
    if (token == null) {
        if (addPostBtn != null) {
            addPostBtn.style.display = "none"
        }
        loginBtn.style.setProperty("display", "block", "important")
        registerBtn.style.setProperty("display", "block", "important")
        logOutDiv.style.display = "none"
        showDataUser.style.display = "none"
        // if(id!=null){
        //     document.getElementById("addComment").style.display = "none"
        //     document.getElementById("delete-btn").style.display = "none"
        //     document.getElementById("edit-btn").style.display = "none"
        // }
        // getPosts()
        
    }
    else {
        loginBtn.style.setProperty("display", "none", "important")
        registerBtn.style.setProperty("display", "none", "important")
        logOutDiv.style.display = "block "
        const usernameNav = document.getElementById("show-username")
        usernameNav.innerHTML = `@ ${getCurrentUser().username}`
        showDataUser.style.display = "block"
        const user = getCurrentUser()
        // document.getElementById("img-username").src = "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
        // document.getElementById("img-username").src = user.profile_image
        // if(id != null){
        //     // console.log()
        // document.getElementById("addComment").style.display = "flex"
        // document.getElementById("delete-btn").style.display = "block"
        // document.getElementById("edit-btn").style.display = "block"
        // }
        // getPosts()
    }
}

function logOut() {
    check = false
    message = "Logged out successfully"
    bg = "#dff0d8"
    border = "2px solid green "
    document.getElementById("alert-message").classList.remove("show-message")
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("isLogin")
    setUpNavBar()
    if(id != null){
        setUpComments()
    }
    showMessage(check, message, bg, border)
}

function getCurrentUser() {
    let user = null;
    const storageUser = localStorage.getItem("user")
    if (storageUser != null) {
        user = JSON.parse(storageUser)
    }
    return user
}
function addPostBtnClicked(){
    document.getElementById("post-modal-title").innerHTML = "Create A New Post"
    document.getElementById("addPost-title-input").value = ""
    document.getElementById("content-input").value = ""
    document.getElementById("createBtn").innerHTML = "Create"
    let postModal = new bootstrap.Modal(document.getElementById("addPost-modal"),{})
    postModal.toggle()
}
function editPostBtnClicked(postObject){
    let post = JSON.parse(decodeURIComponent(postObject))
    document.getElementById("post-modal-title").innerHTML = "Edit Post"
    document.getElementById("addPost-title-input").value = post.title
    document.getElementById("content-input").value = post.body
    document.getElementById("createBtn").innerHTML = "Update"
    document.getElementById("post-id-input").value = post.id
    let postModal = new bootstrap.Modal(document.getElementById("addPost-modal"),{})
    postModal.toggle()
}
function deletePostBtnClicked(postObject){
    let post = JSON.parse(decodeURIComponent(postObject))
    // alert("delete")
    document.getElementById("delete-post-id-input").value = post.id
    let postModal = new bootstrap.Modal(document.getElementById("deletePost-modal"),{})
    postModal.toggle()
}
function deletePost (){
    const token = localStorage.getItem("token")
    const headers = {
        "authorization": `Bearer ${token}`
    }
    const postId = document.getElementById("delete-post-id-input").value
    
    url = `https://tarmeezacademy.com/api/v1/posts/${postId}`
    axios.delete(url, {
        headers: headers
    })
    .then((response) => {
        message = "Post Deleted successfully"
        check = true
        bg = "#dff0d8"
        border = "2px solid green"
        let modal = document.getElementById("deletePost-modal")
        let modalInstance = bootstrap.Modal.getInstance(modal)
        modalInstance.hide()
        showMessage(check, message, bg, border)
        getPosts()
        if(id != null){
            window.open("index.html")    
        }
    })
}

function createNewPost() {
    let postId = document.getElementById("post-id-input").value
    let isCreate = postId == null || postId == "";
    const title = document.getElementById("addPost-title-input").value
    const contentPost = document.getElementById("content-input").value
    const image = document.getElementById("post-image-input").files[0]
    let url = ''
    let check = true
    let formData = new FormData();
    formData.append("body", contentPost)
    formData.append("title", title)
    formData.append("image", image)
    const token = localStorage.getItem("token")
    const headers = {
        "authorization": `Bearer ${token}`
    }
    if(isCreate)
    {
        url='https://tarmeezacademy.com/api/v1/posts'
        axios.post(url, formData, {
            "Content-Type": "multipart/form-data",
            headers: headers
        })
        .then((response) => {
                message = "Post created successfully"
                check = true
                bg = "#dff0d8"
                border = "2px solid green"
                let modal = document.getElementById("addPost-modal")
                let modalInstance = bootstrap.Modal.getInstance(modal)
                modalInstance.hide()
                showMessage(check, message, bg, border)
                getPosts()
                
            })
            .catch((error) => {
                if(isCreate)
                {
                    check = false
                    if (title == "") {
                        message = "The title box is required"
                    }
                    else if ((contentPost) == "") {
                        message = "The post content is required "
                    }
                    else {
                        console.log("error")
                        console.log(error)
                        message = "error in image"
                    }
                    bg = "#e5a1a1"
                    border = "2px solid red "
                    showMessage(check, message, bg, border)
                }
            })
            
            
    }else{
        formData.append("_method", "put")
        url = `https://tarmeezacademy.com/api/v1/posts/${postId}`
        axios.post(url, formData, {
            "Content-Type": "multipart/form-data",
            headers: headers
        })
        .then((response) => {
            message = "Post updated successfully"
            check = true
            bg = "#dff0d8"
            border = "2px solid green"
            let modal = document.getElementById("addPost-modal")
            let modalInstance = bootstrap.Modal.getInstance(modal)
            modalInstance.hide()
            showMessage(check, message, bg, border)
            getPosts()
            if(id != null)
            {
                window.location.reload()
                editPostBtnClicked()
            }
        })
        
        

    }
    
       

}

function postClicked(postId) {
    window.location = `postDetails.html?postId=${postId}`
}

function profileClicked(){
    const user = getCurrentUser()

    window.location = `profile.html?userId=${user.id}`

}