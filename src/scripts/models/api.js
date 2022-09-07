export class Requests {

      static baseUrl = "https://m2-rede-social.herokuapp.com/api/"
      static userUuid = localStorage.getItem("kenzieRedeSocial:user_uuid")
      static token = localStorage.getItem("kenzieRedeSocial:token")

      static headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.token}`
      }

      static async createUser(data) {
            const user = await fetch(`${this.baseUrl}users/`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(data)
            })
                  .then(resp => resp.json())
                  .then(resp => {

                        console.log(resp)
                        console.log(Object.keys(resp).length)

                        if (Object.keys(resp).length < 9) {
                              Toastify({
                                    text: "Não foi possivel realizar o cadastro, verifique as informações",
                                    duration: 2000,
                                    close: true,
                                    gravity: "top", // `top` or `bottom`
                                    position: "right", // `left`, `center` or `right`
                                    stopOnFocus: true, // Prevents dismissing of toast on hover
                                    style: {
                                          background: "red",
                                    }
                              }).showToast();
                        }
                        else {
                              Toastify({
                                    text: "Cadastro realizado com sucesso!!",
                                    duration: 2000,
                                    close: true,
                                    gravity: "top", // `top` or `bottom`
                                    position: "right", // `left`, `center` or `right`
                                    stopOnFocus: true, // Prevents dismissing of toast on hover
                                    style: {
                                          background: "green",
                                    }
                              }).showToast();
                              setTimeout(() => window.location.replace("../../../index.html"), 2000)
                        }

                        return resp
                  })
                  .catch(err => console.log(err))

            return user
      }


      static async login(data) {
            const user = await fetch(`${this.baseUrl}users/login/`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(data)
            })
                  .then(resp => resp.json())
                  .then(resp => {

                        if (resp.user_uuid) {
                              localStorage.setItem("kenzieRedeSocial:token", `${resp.token}`)
                              localStorage.setItem("kenzieRedeSocial:user_uuid", `${resp.user_uuid}`)

                              Toastify({
                                    text: "Login realizado com sucesso!!",
                                    duration: 2000,
                                    close: true,
                                    gravity: "top", // `top` or `bottom`
                                    position: "right", // `left`, `center` or `right`
                                    stopOnFocus: true, // Prevents dismissing of toast on hover
                                    style: {
                                          background: "green",
                                    }
                              }).showToast();
                              setTimeout(() => window.location.replace("./src/pages/homepage/homepage.html"), 2000)

                        }

                        else{
                              Toastify({
                                    text: "Acesso não autorizado \n \n Essa conta não existe, logo não pode acessar a página dos posts",
                                    duration: 3000,
                                    close: false,
                                    gravity: "top", // `top` or `bottom`
                                    position: "center", // `left`, `center` or `right`
                                    stopOnFocus: true, // Prevents dismissing of toast on hover
                                    style: {
                                          background: "blue",
                                    }
                              }).showToast();

                        }

                        console.log(resp)
                        return resp
                  })
                  .catch(err => console.log(err))

            return user
      }


      static async getLoggedUser() {
            const user = await fetch(`${this.baseUrl}users/${this.userUuid}`, {
                  method: "GET",
                  headers: this.headers,
            })
                  .then(resp => resp.json())
                  .then(resp => resp)
                  .catch(err => console.log(err))

            return user
      }


      static async userFollow(followId) {
            const follow = await fetch(`${this.baseUrl}users/follow/`, {
                  method: "POST",
                  headers: this.headers,
                  body: JSON.stringify(followId)
            })
                  .then(resp => resp.json())
                  .then(resp => {
                        console.log(resp)
                        return resp
                  })
                  .catch(err => console.log(err))

            return follow
      }

      static async userUnfollow(uuidFollow) {
            const unfollow = await fetch(`${this.baseUrl}users/unfollow/${uuidFollow}/`, {
                  method: "DELETE",
                  headers: this.headers
            })
                  .then(resp => console.log(resp))
                  .catch(err => console.log(err))

            return unfollow

      }


      static async makePost(post) {
            const userPost = await fetch(`${this.baseUrl}posts/`, {
                  method: "POST",
                  headers: this.headers,
                  body: JSON.stringify(post)
            })
                  .then(resp => resp.json())
                  .then(resp => {
                        console.log(resp)
                        return resp
                  })
                  .catch(err => console.log(err))

            return userPost
      }



      static async getUsers(l = 10, o = 0) {
            const users = await fetch(`${this.baseUrl}users/?limit=${l}&offset=${o}`, {
                  method: "GET",
                  headers: this.headers,
            })
                  .then(resp => resp.json())
                  .then(resp => {

                        return resp
                  })
                  .catch(err => console.log(err))

            return users
      }


      static async getPosts() {
            const posts = await fetch(`${this.baseUrl}posts/`, {
                  method: "GET",
                  headers: this.headers,
            })
                  .then(resp => resp.json())
                  .then(resp => {
                        console.log(resp)
                        return resp
                  })
                  .catch(err => console.log(err))

            return posts
      }


      static async likePost(postId) {
            const likes = await fetch(`${this.baseUrl}likes/`, {
                  method: "POST",
                  headers: this.headers,
                  body: JSON.stringify(postId)
            })
                  .then(resp => resp.json())
                  .then(resp => {
                        console.log(resp)
                        return resp
                  })
                  .catch(err => console.log(err))

            return likes
      }


      static async unlikePost(postId) {
            const likes = await fetch(`${this.baseUrl}likes/${postId}/`, {
                  method: "DELETE",
                  headers: this.headers
            })
                  .then(resp => {
                        console.log(resp)
                        return resp
                  })
                  .catch(err => console.log(err))

            return likes
      }

}
