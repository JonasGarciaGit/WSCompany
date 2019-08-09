﻿

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
var _Descricao = "";


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
}, 10000);


var email = document.getElementById('email');
var idDoUsuario;
var size;
var data = new Date();
var dia = data.getDay();
var mes = data.getMonth();
var ano = data.getFullYear();
var hora = data.getHours();
var min = data.getMinutes();
var seg = data.getSeconds();



$("#btAdicionarPedido").click(function () {
    console.log(_Descricao);

    var Pedido = {
        pedidoDescricao: _Descricao,
        pedidoTotal: Total,
        pedidoData: null /*`${ dia }-${ mes }-${ano}T${hora}:${min}:${seg}`*/,
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