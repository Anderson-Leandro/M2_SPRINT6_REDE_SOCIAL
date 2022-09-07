import { Requests } from "../../scripts/models/api.js";

class Homepage {

      static async userInfo() {
            const user = await Requests.getLoggedUser()

            const userImg = document.querySelector("#userImg")
            userImg.src = await user.image

            const userName = document.querySelector("#userName")
            userName.innerText = await user.username

            const userFollowers = document.querySelector("#userFollowers")
            userFollowers.innerText = await `${user.followers_amount} seguidores`

            const userWork = document.querySelector("#userWork")
            userWork.innerText = await user.work_at

            return user
      }


      static postButton() {
            const form = document.querySelector("#postForm")
            const btnPost = document.querySelector("#btnPost")

            form.addEventListener("input", () => {
                  if (form[0].value.length > 1 && form[1].value.length > 1) {
                        btnPost.classList.remove("disableButton")
                        btnPost.classList.add("buttonPrimary")
                  }

                  else {
                        btnPost.classList.remove("buttonPrimary")
                        btnPost.classList.add("disableButton")
                  }
            })

            form.addEventListener("submit", (event) => {
                  event.preventDefault()

                  const obj = {
                        title: form[0].value,
                        description: form[1].value
                  }

                  form[0].value = ""
                  form[1].value = ""

                  Requests.makePost(obj)

            })
      }


      static async followersSugestionCard(user) {
            const li = document.createElement("li")

            const divUser = document.createElement("div")
            divUser.classList.add("divUser")

            const img = document.createElement("img")
            img.classList.add("imgUser")
            img.src = user.image

            const divTexts = document.createElement("div")
            divTexts.classList.add("divTexts")

            const h3 = document.createElement("h3")
            h3.classList.add("title2")
            h3.innerText = user.username

            const span = document.createElement("span")
            span.classList.add("text2")
            span.innerText = user.work_at

            const button = await this.validButton(user.uuid)


            divTexts.append(h3, span)

            divUser.append(img, divTexts)

            li.append(divUser, button)

            return li
      }


      static async randomUsers() {
            const users = await Requests.getUsers()

            const random = Math.floor(Math.random() * (users.count) - 10)

            const users2 = await Requests.getUsers(3, random)

            return this.listUser(users2.results)
      }


      static listUser(users) {

            const ul = document.querySelector("#recomendationsList")

            ul.innerHTML = ""

            users.forEach(async element => {
                  ul.append(await this.followersSugestionCard(element))
            })

            return ul

      }



      static async validButton(id) {

            const button = document.createElement("button")
            button.id = id

            const follow = await this.isFollowing(id)

            if (follow[0] == true) {
                  button.classList = "buttonPrimary btnHeight3"
                  button.innerText = "Seguindo"
            }

            else {
                  button.classList = "buttonOutlineMedium btnHeight3"
                  button.innerText = "Seguir"
            }

            return button
      }



      static async isFollowing(id) {
            const following = []

            const me = await Requests.getLoggedUser()

            me.following.forEach(element => {
                  let userID = element.following_users_id.uuid

                  if (userID == id) {
                        following.push(true)
                        following.push(element.uuid)
                  }
            })

            return following
      }


      static follow() {
            const list = document.querySelector("#recomendationsList")

            list.addEventListener("click", async (event) => {
                  const target = event.target

                  if (target.tagName == "BUTTON") {

                        const userFollow = await this.isFollowing(target.id)

                        if (userFollow[0] == true) {
                              Requests.userUnfollow(userFollow[1])
                              target.classList = "buttonOutlineMedium btnHeight3"
                              target.innerText = "Seguir"
                        }
                        else {
                              const obj = {
                                    following_users_uuid: target.id
                              }

                              Requests.userFollow(obj)
                              target.classList = "buttonPrimary btnHeight3"
                              target.innerText = "Seguindo"
                        }
                  }
            })
      }


      static postCard(post) {

            const li = document.createElement("li")
            li.classList.add("postsList-item")
            li.id = post.uuid

            const divGeral = document.createElement("div")

            const img = document.createElement("img")
            img.classList.add("imgUser")
            img.src = post.author.image

            const divInfo = document.createElement("div")
            divInfo.classList.add("aboutUser")

            const h3 = document.createElement("h3")
            h3.classList.add("title2")
            h3.innerText = post.author.username

            const span = document.createElement("span")
            span.classList.add("text2")
            span.innerText = post.author.work_at

            const h2 = document.createElement("h2")
            h2.classList.add("title1")
            h2.innerText = post.title

            const p = document.createElement("p")
            p.classList = "text1 textLimit"

            p.innerText = post.description

            const divLikes = document.createElement("div")
            divLikes.classList.add("postInteractions")

            const button = document.createElement("button")
            button.classList = "buttonGrey1 btnHeight1"
            button.innerText = "Abrir Post"
            button.id = post.uuid

            const imgHeart = document.createElement("img")
            // imgHeart.src = "../../assets/heartBlack.png"
            imgHeart.src = this.isLiked(post).src
            imgHeart.id = this.isLiked(post).id

            const spanLikes = document.createElement("span")
            spanLikes.innerText = post.likes.length

            divLikes.append(button, imgHeart, spanLikes)

            divInfo.append(h3, span)

            divGeral.append(img, divInfo)

            li.append(divGeral, h2, p, divLikes)

            return li
      }


      static async listPosts() {

            const postList = document.querySelector("#postsList")

            postList.innerHTML = ""

            const posts = await Requests.getPosts()

            posts.results.forEach(async element => {
                  postList.append(await this.postCard(element))
            })

            return postList
      }


      static isLiked(post) {
            let img = {
                  src: "../../assets/heartBlack.png"
            }

            post.likes.forEach(element => {
                  if (element.user.uuid == localStorage.getItem("kenzieRedeSocial:user_uuid")) {
                        img.src = "../../assets/heartRed.png"
                        img.id = element.uuid
                  }
            })

            return img
      }


      static async likePost() {
            const postsList = document.querySelector("#postsList")

            postsList.addEventListener("click", async (event) => {
                  const target = event.target



                  if (target.tagName == "IMG" && target.id) {

                        const divLikes = target.parentElement

                        const likes = divLikes.children[2]

                        const postId = target.parentElement.parentElement.id

                        if (target.src.includes("assets/heartBlack.png")) {
                              const obj = {
                                    post_uuid: postId
                              }
                              const resp = await Requests.likePost(obj)
                              target.id = resp.uuid
                              target.src = "../../assets/heartRed.png"

                        }
                        else {
                              Requests.unlikePost(target.id)
                              target.src = "../../assets/heartBlack.png"
                        }

                        const posts = await Requests.getPosts()
                        posts.results.forEach(element => {
                              if (postId == element.uuid) {
                                    likes.innerText = element.likes.length
                              }
                        })
                  }
            })
      }

      static openPost() {

            const postsList = document.querySelector("#postsList")

            const modal = document.querySelector("#modal")

            postsList.addEventListener("click", async (event) => {
                  const target = event.target

                  if (target.tagName == "BUTTON") {

                        const postId = target.id

                        const posts = await Requests.getPosts()

                        const post = posts.results.filter(element => {

                              if (element.uuid == postId) {
                                    return element
                              }

                        })

                        const li = this.postCard(post[0])                       

                        li.children[3].remove()

                        li.children[2].classList.remove("textLimit")

                        modal.innerHTML = ""

                        modal.append()

                        const button = document.createElement("button")
                        button.innerText = "X"
                        button.classList.add("btnFecharModal")
                        button.addEventListener("click", () => {
                              modal.classList.add("hidden")
                        })

                        li.append(button)

                        modal.append(li)

                        modal.classList.remove("hidden")

                  }

            })

      }

      static logout() {
            const btn = document.querySelector("#logout")

            btn.addEventListener("click", () => {
                  localStorage.removeItem("kenzieRedeSocial:user_uuid")
                  localStorage.removeItem("kenzieRedeSocial:token")

                  window.location.replace("../../../index.html")

            })
      }

      static verification() {
            if (!localStorage.getItem("kenzieRedeSocial:token")) {
                  window.location.replace("../../../index.html")
            }
      }


}

Homepage.verification()
Homepage.userInfo()
Homepage.postButton()
Homepage.randomUsers()
Homepage.follow()
Homepage.listPosts()
Homepage.likePost()
Homepage.openPost()
Homepage.logout()

