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
            lista.innerHTML += '<li class="listaProdutos" id =' + idCarrinho + '>' + "Produto: " + produto.Descricao + "     R$ " + produto.Total + "<button class = 'botoesRemover btn-primary'onclick = 'removerCarrinho(" + idCarrinho + ");'>Remover</button>" + '</li >';
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
    console.log(_Descricao);
}



//Post do pedido
//Pega o numero maximo de usuarios 

$.ajax({
    url: "http://localhost:49816/api/Usuarios",
    type: "GET",
    dataType: "json",
    success: function (data) {
        size = data.length;
    },
    error: function () {
        console.log("Erro na requisição");
    }
});


setInterval(function () {
    for (var i = 0; i < size + 5; i++) {
        $.ajax({
            url: "http://localhost:49816/api/Usuarios/" + i,
            type: "GET",
            dataType: "json",
            success: function (data) {
                if (email.value == data.Nome) {
                    idDoUsuario = data.Id;
                }
            },
            error: function () {
                console.log("Erro na requisição");
            }
        });
    }
}, 5000);


var email = document.getElementById('email');
var idDoUsuario;
var size;
var data = new Date();
var dia = data.getDate();
var mes = data.getMonth();
var ano = data.getFullYear();
var dataAgora = new Date(ano, mes, dia);

$("#btAdicionarPedido").click(function () {
    _Descricao = "Produtos: " + vetDescricao;
    console.log(_Descricao);

    const Pedido = {
        pedidoDescricao: _Descricao,
        pedidoTotal: Total,
        pedidoData: dataAgora,
        UsuarioId: idDoUsuario
    }

    $.ajax({
        url: 'http://localhost:49816/api/Pedidos',
        type: 'POST',
        data: JSON.stringify(Pedido),
        contentType: "application/json; charset = utf-8",
        traditional: true,
        success: function (data) {
            console.log(data);
        }
    })

}); 