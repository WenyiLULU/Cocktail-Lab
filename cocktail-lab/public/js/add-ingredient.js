const addBtn = document.querySelector('.add-ingredient')
const inputZone = document.querySelector('.add-ingredients')

addBtn.addEventListener('click', ()=>{
  let newInputDiv = document.createElement('Div')

  let newInput = document.createElement('INPUT')
  let newlabel = document. createElement("Label");
  newInput.setAttribute("type","text");
  newInput.setAttribute("name","ingredient");
  newlabel.innerHTML = "Ingredient: "
  newlabel.appendChild(newInput)
  newInputDiv. appendChild(newlabel);

  let newInputAm = document.createElement('INPUT')
  let newlabelAm = document. createElement("Label");
  newInputAm.setAttribute("type","text");
  newInputAm.setAttribute("name","amount");
  newlabelAm.innerHTML = " Amount: "
  newlabelAm.append(newInputAm)
  newInputDiv. appendChild(newlabelAm);

  inputZone.appendChild(newInputDiv)
})