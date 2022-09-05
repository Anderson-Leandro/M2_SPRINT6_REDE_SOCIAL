import { Requests } from "./models/api.js"

class Login {

      static async userLogin() {

            const form = document.querySelector("form")

            form.addEventListener("submit", (event) => {
                  event.preventDefault()

                  let obj = {}

                  const arr = [...form].slice(0, 2)

                  arr.forEach(element => {
                        obj[element.name] = element.value;
                  })

                  return Requests.login(obj)
            })

      }
}

Login.userLogin()