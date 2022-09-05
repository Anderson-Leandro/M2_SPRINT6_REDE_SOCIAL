import { Requests } from "../../scripts/models/api.js";


class Register {

      static register() {
            const form = document.querySelector("form")            

            form.addEventListener("submit", (event) => {
                  event.preventDefault()

                  let obj = {}

                  const arr = [...form].slice(0, 5)                  

                  arr.forEach(element => {
                        obj[element.name] = element.value;
                  })

                  console.log(obj)
                  return Requests.createUser(obj)
            })
      }
}

Register.register()