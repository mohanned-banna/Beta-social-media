const urlId = new URLSearchParams(window.location.search)
const userId = urlId.get("userId")

const user = getCurrentUser()

// console.log(user_id)
// function getDataPost(){
//     let userStorge = localStorage.getItem("user")
//     if(userStorge != null){
//         const user = getCurrentUser()
//         //    console.log(user)
//            document.getElementById("user-email").innerHTML = user.email
//            document.getElementById("user-name").innerHTML = user.name
//            document.getElementById("user-username").innerHTML = user.username
//             document.getElementById("post-num").innerHTML = user.posts_count
//             document.getElementById("comment-num").innerHTML = user.comments_count
//     } 
// }
// getDataPost()

function getUser(){
    // const id = 935
    // const userId = user_id
    axios.get(`https://tarmeezacademy.com/api/v1/users/${userId}`)
    .then((response) => {
        const email = response.data.data.email
        const name = response.data.data.name
        const username = response.data.data.username
        const postNum = response.data.data.posts_count
        const commentNum = response.data.data.comments_count
        
        document.getElementById("user-email").innerHTML = email
        document.getElementById("user-name").innerHTML = name
        document.getElementById("user-username").innerHTML = username
        document.getElementById("post-num").innerHTML = postNum
        document.getElementById("comment-num").innerHTML = commentNum
        document.getElementById("name-posts").innerHTML = `${username}'s`
    })
}
getUser()
function getPostsUser() {
    // const id = 935
    // console.log(userID)
    axios.get(`https://tarmeezacademy.com/api/v1/users/${userId}/posts`)
        .then((response) => {
            const posts = response.data.data
            document.getElementById("user-posts").innerHTML = ""
            for (post of posts) {
                const Author = post.author
                let postTitle = ""
                const user = getCurrentUser()
                const isMyPost = user != null && post.author.id == user.id
                let editBtnContent = ``
                let deleteBtnContent = ``
                if(isMyPost)
                {
                    editBtnContent = `<button id="edit-btn" class="btn btn-secondary" style="float: right;" onclick="editPostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')" data-bs-toggle="modal"  data-bs-whatever="@mdo">Edit</button>`
                    deleteBtnContent = `<button id="delete-btn" class="btn btn-danger" style="float: right; margin-left:1%;" onclick="deletePostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')" data-bs-toggle="modal"  data-bs-whatever="@mdo">Delete</button>`
                }
                if (post.title != null) {
                    postTitle = post.title
                }
                
                const content = `
            <div class="post">
                 <div class="card shadow card-mutual "  style="max-width: 100%; ">
                    <div class="card-header">
                         <img src="images/profile.webp" >
                         <b class="profile-name">@${Author.username}</b>
                         ${deleteBtnContent}
                         ${editBtnContent}
                    </div>
                    <div class="card-body" onclick="postClicked(${post.id})" >
                        
                        <img src="${post.image}"  alt="Post Image" style="width:100%;" class="image-slide" >
                        <p class="card-text"><small class="text-muted">${post.created_at}</small></p>
                        <h5 class="card-title">${postTitle}</h5>
                        <p class="card-text">${post.body}</p>
                        <div class="line"></div>
                        <p class="comment"><i class=" fa fa-light fa-pen-clip"></i> (${post.comments_count}) Comments</p>
                    </div>
                </div>
            </div> `
                document.getElementById("user-posts").innerHTML += content
            }
        })
}
getPostsUser()