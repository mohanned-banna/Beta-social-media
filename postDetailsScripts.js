// setTimeout(() => {
//     setUpNavBar()
//     setUpComments()
//     }, 1)
function getPost() {
    axios.get(`https://tarmeezacademy.com/api/v1/posts/${id}`)
        .then((response) => {
            document.getElementById("post").innerHTML = ""
            const post_user = response.data.data
            const comments = post_user.comments
            const author = post_user.author
            document.getElementById("username-span").innerHTML = author.username
            let commentsContent = ``
            for(currentComment of comments){
                
                commentsContent += 
                `<div class="card-header">
                    <img src="images/profile.webp" alt="" style="margin-bottom: 10px;">
                    <b>${currentComment.author.username}</b>
                    <p id="commentBody">${currentComment.body}</p>
                </div>
                <div id="comment">
                    <hr>
                </div>`
                
            }
            const user = getCurrentUser()
                const isMyPost = user != null && post_user.author.id == user.id
                let editBtnContent = ``
                let deleteBtnContent = ``
                if(isMyPost)
                {
                    editBtnContent = `<button id="edit-btn" class="btn btn-secondary" style="float: right;" onclick="editPostBtnClicked('${encodeURIComponent(JSON.stringify(post_user))}')" data-bs-toggle="modal"  data-bs-whatever="@mdo">Edit</button>`
                    deleteBtnContent = `<button id="delete-btn" class="btn btn-danger" style="float: right; margin-left:1%;" onclick="deletePostBtnClicked('${encodeURIComponent(JSON.stringify(post_user))}')" data-bs-toggle="modal"  data-bs-whatever="@mdo">Delete</button>`
                }
            const postContent = `
                        <div class="card shadow card-mutual "  style="max-width: 100%; " id="post" target="_blank">
                            <div class="card-header">
                                <img src="images/profile.webp" >
                                <b class="profile-name">@${author.username}</b>
                                ${deleteBtnContent}
                                ${editBtnContent}
                            </div>
                            <div class="card-body" >
                                
                                <img src="${post_user.image}"  alt="Post Image" style="width:100%;" class="image-slide" >
                                <p class="card-text"><small class="text-muted">${post_user.created_at}</small></p>
                                <h5 class="card-title">${post_user.title}</h5>
                                <p class="card-text">${post_user.body}</p>
                                <div class="line"></div>
                                <p class="comment"><i class=" fa fa-light fa-pen-clip"></i> (${post_user.comments_count}) Comments</p>
                                <div class="line"></div>
                            </div>
                            
                            
                                <div id="commentPost" class=" col-9 " style="background: #e5e1f5;">
                                    ${commentsContent}
                                </div>
                                <div class="addComment" id="addComment" >
                                    <input type="text" placeholder="add your comment..." id="comment-input">
                                    <button type="button" id="sendComment"  class="btn btn-outline-primary" onclick="createCommentClicked()">send</button>
                                </div>
                            
                                
                        </div>
                    `
            document.getElementById("post").innerHTML += postContent
            setUpNavBar()
            setUpComments()
        })
}
getPost()

function createCommentClicked(){
    const commentBody = document.getElementById("comment-input").value
     let param = {
         "body": commentBody
     }
     let token = localStorage.getItem("token")
     let url = `https://tarmeezacademy.com/api/v1/posts/${id}/comments`
     axios.post(url,param,{
         headers : {
             "authorization": `Bearer ${token}`
         }
     })
     .then((response) =>{
         document.getElementById("post").innerHTML = ""
         message = "The comment has been created successfully"
         check = true
         bg = "#dff0d8"
         border = "2px solid green"
         showMessage(check,message,bg,border)
         getPost()
         
     })
     .catch((error)=>{
         check = false
         message = error.response.data.message
         bg = "#e5a1a1"
         border = "2px solid red "
         showMessage(check,message,bg,border)
     })
 }

 function setUpComments(){
    token = localStorage.getItem("token")
    // console.log(token)
    if (token == null) {
            document.getElementById("addComment").style.display = "none"
            document.getElementById("delete-btn").style.display = "none"
            document.getElementById("edit-btn").style.display = "none"
    }
    else {
        document.getElementById("addComment").style.display = "flex"
        document.getElementById("delete-btn").style.display = "block"
        document.getElementById("edit-btn").style.display = "block"
    }
 }