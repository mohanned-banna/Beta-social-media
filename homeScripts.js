//------infiniteScroll -------//
window.addEventListener("scroll", () => {
    const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
    if (endOfPage && currentPage < lastPage) {
        currentPage += 1
        getPosts(false, currentPage)
    }
});

function getPosts(reload = true, page = 1) {
    axios.get(`https://tarmeezacademy.com/api/v1/posts?page=${page}`)
        .then((response) => {
            lastPage = response.data.meta.last_page
            if (reload) {
                document.getElementById("posts").innerHTML = ""
            }
            for (post of response.data.data) {
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
                    <div id="user-image-name" onclick="userClicked(${Author.id})">
                        <img src="images/profile.webp" class="user-image">
                        <b class="profile-name">@${Author.username}</b>
                    </div>
                         
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
                document.getElementById("posts").innerHTML += content
            }
        })
}
getPosts()

function userClicked(userId){
    window.location = `profile.html?userId=${userId}`
}


