let alterarvalor = null

function abrirModal() {
    const modal = document.getElementById('janela_modal')
    modal.classList.add('modalaberto')

    modal.addEventListener('click', (e) => {
        if (e.target.id == 'fechar' || e.target.id == 'janela_modal') {
            modal.classList.remove('modalaberto')
        }
    })
}


async function salvarModal() {
    console.log("salvamento modal")
    let numTesch = document.getElementById('number').value
    let descriptionTesch = document.getElementById('description').value
    let dateTasch = document.getElementById('date').value
    let statusTesch = document.getElementById('status').value

    atividade = {
        numero: numTesch,
        descricao: descriptionTesch,
        data: dateTasch,
        statusTarefa: statusTesch,
    }


    if(alterarvalor != null ){
        await fetch (`http://localhost:3000/atividade/${alterarvalor}`, {
            method:"PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(atividade),})
            alterarvalor = null

    }
    else{let y = await fetch('http://localhost:3000/atividade', {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(atividade),
    })
}

   
    exibirDados()
    const modal = document.getElementById('janela_modal')
    modal.classList.remove('modalaberto')
    
}

async function exibirDados() {
    const dados = await fetch('http://localhost:3000/atividade')
    let resultados = await dados.json()
    console.log("resultados", resultados)
    let linin = ""
  
    resultados.forEach((x) => {
        let classecor = ""
        if(x.statusTarefa === "Concluído" ){ 
            classecor = "verde"
        }
        if(x.statusTarefa === "Em andamento"){
            classecor= "amarelo"
        }
        if(x.statusTarefa === "Stopped"){
        classecor="vermelho"
        }

        let linhacor =""
        
 

        linin = linin + ` <tr class="${linhacor}" id="linha${x.id}"> 
                          <td id="num${x.id}"> ${x.numero}</td>
                          <td id="descricao${x.id}"> ${x.descricao}</td>
                          <td id="data${x.id}"> ${x.data.split('-').reverse().join('/')}</td>
                          <td class="${classecor}" id="status${x.id}"> ${x.statusTarefa}</td>
                          <td><img id="editar${x.id}" onclick="editarLinha(${x.id})" src="../Assets/Imagens/editar.png.png"> <img id="apagar${x.id}" onclick="erase(${x.id})" src="../Assets/Imagens/excluir.png.png"></td>
                          </tr>`

    });

    document.getElementById("bodyTesch").innerHTML = linin
}

exibirDados()

async function erase(id) {
    await fetch(`http://localhost:3000/atividade/${id}`, {
        method: "delete"
    })
    exibirDados()
}
async function editarLinha(id) {
    let edit = await fetch(`http://localhost:3000/atividade/${id}`)
    let guard = await edit.json()
    alterarvalor = id
    
    document.getElementById('number').value = guard.numero
    document.getElementById('description').value = guard.descricao
    document.getElementById('date').value = guard.data
    document.getElementById('status').value = guard.statusTarefa
    abrirModal()






}



/*
function abrirFiltro(){
    const filter = document.getElementById
}*/

/*function(){
    if(N % == 2){

    }
}*/