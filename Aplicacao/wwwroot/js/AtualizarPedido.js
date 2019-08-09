console.log(localStorage.getItem('idPedido'));

// Fazendo requisição para pegar todos os produtos
function listarProdutos() {
    $.ajax({
        url: "http://localhost:49816/api/Produtos",
        type: "GET",
        dataType: "json",
        success: function (data) {
            console.log(data);
        },
        error: function () {
            console.log("Erro na requisição");
        }
    });
}


// Buscando produto pelo id
var idCarrinho = 0;
var Preco = [];
var vetDescricao = [];
var Total = 0;
var _Descricao;


function buscarPeloId(id) {
    $.ajax({
        url: "http://localhost:49816/api/Produtos/" + id,
        type: "GET",
        dataType: "json",
        success: function (produto) {
            var lista = document.getElementById('lista');
            lista.innerHTML += '<li class="listaProdutos" id =' + idCarrinho + '>' + "Produto: " + produto.Descricao + "     R$ " + produto.Total + "<button class = 'botoesRemover' style='margin-left:10px' onclick = 'removerCarrinho(" + idCarrinho + ");'>Remover</button>" + '</li >';
            Preco[idCarrinho] = produto.Total;
            vetDescricao[idCarrinho] = produto.Descricao;
            Total += Preco[idCarrinho];
            idCarrinho = idCarrinho + 1;
        },
        error: function () {
            console.log("Erro na requisição");
        }
    })
}


//remover pedido
function removerCarrinho(id) {
    $("#" + id).remove();
    Total = Total - Preco[id];
    vetDescricao.splice(id);
    _Descricao = "Produtos: " + vetDescricao;
}


//PUT do pedido

var idPedido = localStorage.getItem('idPedido');
var data = new Date();
var dia = data.getDay();
var mes = data.getMonth();
var ano = data.getFullYear();


$("#btAdicionarPedido").click(function () {
    console.log(_Descricao);

    var Pedido = {

        pedidoData: dia + "/" + mes + "/" + ano,
        pedidoDescricao: "Teste",
        pedidoTotal: Total,

    }

    console.log(Pedido);

  
    $.ajax({
        url: 'http://localhost:49816/api/Pedidos/'+idPedido,
        type: 'PUT',
        data: JSON.stringify(Pedido),
        contentType: "application/json; charset = utf-8",
        traditional: true,
        success: function (data) {
            console.log(data);
        }
    });
    



});

