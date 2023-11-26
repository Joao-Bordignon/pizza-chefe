// =============================================================================
// ADICIONAR PEDIDO AO PROFISSIONAL=============================================
document.addEventListener("DOMContentLoaded", function(){
    function adicionarPedido(){
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
            `
            for(let i = 0; i < sessionStorage.length; i++){
                var nomeproduto = sessionStorage.getItem("Produto"+i)
                var preçoproduto = sessionStorage.getItem("Produto-preço"+i)
                var quantidadeproduto = sessionStorage.getItem("Produto-quantidade"+i)
                if (nomeproduto != null){
                    pedido.innerHTML += `
                    <div class="item">
                        <p class="nom-produto">${nomeproduto}</p>
                        <p class="qntd-item">${quantidadeproduto}</p>
                        <p class="valor-item">${preçoproduto}</p>
                    </div>`
                }
             }

        pedido.innerHTML += `
            <p class="cliente">Nome do cliente: ${nomecliente}</p>
            <p class="valor-pedido">Valor total de: R$${totalcompra}</p>`
    
        let areapedido = document.querySelector(".area-pedidos")
    
        areapedido.append(pedido)
    }
    adicionarPedido()
})

// =============================================================================
// LIMPAR/CANCELAR PEDIDOS======================================================
const limparPedido = document.querySelector(".limpar")
limparPedido.addEventListener("click", cancelarPedido)

function cancelarPedido(){
  sessionStorage.clear()
  location.reload()
}