if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", começar)
} else {
    começar()
}

let totalCarrinho = 0

// ========================================================================
// DAR START NOS EVENTOS ASSIM QUE CARREGAR A PAGINA=======================
function começar() {
    const removeItem = document.getElementsByClassName("remover")
    for (var i = 0; i < removeItem.length; i++) {
        removeItem[i].addEventListener("click", removerItemCarrrinho)
    }

    const addItem = document.getElementsByClassName("item")
    for (var i = 0; i < addItem.length; i++) {
        addItem[i].addEventListener("click", adicionarCarrinho)
    }

    const finalizar = document.getElementsByClassName("finalizar")[0]
    finalizar.addEventListener("click", finalizarCompra)

    const fechar = document.querySelector(".finalcompra button")
    fechar.addEventListener("click", fecharModal)
}

// ========================================================================
// REMOVER ITEM DO CARRINHO================================================
function removerItemCarrrinho(event) {
    event
        .target
        .parentElement
        .parentElement
        .parentElement
        .remove()
    atualizarCarrinho()
}

// ========================================================================
// ATUALIZAR VALOR FINAL DO CARRINHO=======================================
function atualizarCarrinho() {
    totalCarrinho = 5 //valor em 5 por conta do frete padrão
    const itens = document.getElementsByClassName("produto")
    for (let i = 0; i < itens.length; i++) {
        const preçoProduto = itens[i]
            .getElementsByClassName("preço")[0]
            .innerText
            .replace("R$", "")
            .replace(",", ".")

        totalCarrinho += (preçoProduto * 1)
    }
    document
        .querySelector(".total h3")
        .innerText = "R$" + totalCarrinho
}
atualizarCarrinho()
// ========================================================================
// ADICIONAR PRODUTO NO CARRINHO============================================

function adicionarCarrinho(event) {
    const botao = event.target
    const infoProdutos = botao
    const imgProduto = document.querySelector(".imagem img").src
    const nomeProduto = document.querySelector(".tipo").innerText
    const precoProduto = document.querySelector(".preço").innerText

    let novoItem = document.createElement("div")
    novoItem.classList.add("produto")

    novoItem.innerHTML = `
    <div class="foto">
        <img src="${imgProduto}" width="135vw" height="125vh">
    </div>

<div class="infos">

    <p>
        ${nomeProduto}
    </p>

    <p class="preço">
        ${precoProduto}
    </p>
    <div class="quantidade">
        <img src="img/lixeira.png" alt="apagar" width="27vw" height="27vh" class="remover">
        <p class="quantidadeItem">
            1
        </p>
        <img src="img/botao-adicionar.png" alt="adicionar" width="30vw" height="30vh" class="adiconar">
    </div>

</div>
    `

    let divmain = document.querySelector(".main")

    divmain.append(itemCliente)
}
// ========================================================================
// FINALIZAR COMPRA========================================================
function finalizarCompra() {
    if (totalCarrinho <= "5") {
        alert("Seu carrinho esta vazio!")
    } else {
        mostrarModal()
        armazenarPedido()
        //adicionarPedido()
    }

    document.querySelector(".main").innerHTML = ""
    atualizarCarrinho()
}

// =============================================================================
// MODAL FINAL DE COMPRA========================================================
const modal = document.querySelector(".finalcompra")
        
function mostrarModal(){
    modal.showModal()
}

function fecharModal(){
    modal.close()
}

// =============================================================================
// ARMAZENAR PEDIDO NO SESSIONSTORAGE===========================================

function armazenarPedido(){
    var itens = document.getElementsByClassName("produto")
        for (let i = 0; i < itens.length; i++) {
            const nomeProduto = itens[i].querySelector(".nome-produto").innerText
            sessionStorage.setItem("Produto"+i, nomeProduto)
        }
    
        for (let j = 0; j < itens.length; j++) {
            const preçoProduto = itens[j].querySelector(".preço").innerText
            sessionStorage.setItem("Produto-preço"+j, preçoProduto)
        }
    
        for (let k = 0; k < itens.length; k++) {
            const qntdProduto = itens[k].querySelector(".quantidade p").innerText
            sessionStorage.setItem("Produto-quantidade"+k, qntdProduto)
        }
    sessionStorage.setItem("Total-Compra", totalCarrinho)

    const nomeCliente = document.querySelector(".perfil h4").innerText
    sessionStorage.setItem("Nome-Cliente", nomeCliente)
}

// =============================================================================
// ADICIONAR PEDIDO AO PROFISSIONAL=============================================

/*function adicionarPedido(){
    var nomeproduto = sessionStorage.getItem("Produto")
    var preçoproduto = sessionStorage.getItem("Produto-preço")
    var quantidadeproduto = sessionStorage.getItem("Produto-quantidade")
    var nomecliente = sessionStorage.getItem("Nome-Cliente")
    var totalcompra = sessionStorage.getItem("Total-Compra")
    var numpedido = (min, max) => Math.floor(Math.random() * (max - min)+ min); 

    let pedido = document.createElement("div")
    pedido.classList.add("pedidos")

    pedido.innerHTML = `
        <p class="numero-pedido">Pedido #${numpedido(100, 240)}</p>
        <div class="colunas">
            <p class="prod">Produto</p>
            <p class="qntd">Qntd</p>
            <p class="val">Valor</p>
        </div>
         <div class="item">
            <p class="nom-produto">${nomeproduto}</p>
            <p class="qntd-item">${quantidadeproduto}</p>
            <p class="valor-item">R$${preçoproduto}</p>
        </div>
        <p class="cliente">Nome do cliente: ${nomecliente}</p>
        <p class="valor-pedido">Valor total de: R$${totalcompra}</p>
    `

    let areapedido = document.querySelector(".area-pedidos")

    areapedido.append(pedido)
}*/
