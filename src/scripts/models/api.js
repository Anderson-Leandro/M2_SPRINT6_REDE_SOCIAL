export class Requests {

      static baseUrl = "https://m2-rede-social.herokuapp.com/api/"
      
      static headers = {
            "Content-Type": "application/json",
      }

      static async createUser(data) {
            const user = await fetch(`${this.baseUrl}users/`, {
                  method: "POST",
                  headers: this.headers,
                  body: JSON.stringify(data)
            })
            .then(resp => resp.json())
            .then(resp => {
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
                  return resp
            })
            .catch(err => console.log(err))

            return user
      }


      static async login(data){
            const user = await fetch(`${this.baseUrl}users/login/`, {
                  method: "POST",
                  headers: this.headers,
                  body: JSON.stringify(data)
            })
            .then(resp => resp.json())
            .then(resp => {
                  localStorage.setItem("kenzieRedeSocial:token", `${resp.token}`)
                  localStorage.setItem("kenzieRedeSocial:user_uuid", `${resp.user_uuid}`)
                  return resp                  
            })
            .catch(err => console.log(err))
            
            return user
      }





}