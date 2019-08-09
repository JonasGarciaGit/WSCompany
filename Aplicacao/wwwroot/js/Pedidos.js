
src = "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js";


// Busca os pedidos
var size;

//Pega o tamanho de pedidos existentes
$.ajax({
    url: "http://localhost:49816/api/Pedidos",
    type: "GET",
    dataType: "json",
    success: function (data) {
        size = data.length;
    },
    error: function () {
        console.log("Erro na requisição");
    }
});

//Traz todos os pedidos
function adicionarPedidos() {
    for (var i = 0; i <= size; i++) {
        $.ajax({
            url: "http://localhost:49816/api/Pedidos/" + i,
            type: "GET",
            dataType: "json",
            success: function (pedido) {
                document.getElementById('colunas').innerHTML += "<tr>" + "<td id='usuarioid" + i + "'>" + pedido.Id + "</td>" + "<td id='descricao" + i + "'>" + pedido.pedidoDescricao + "</td>" + "<td id='data" + i + "'>" + pedido.pedidoData + "</td>" + "<td id='total" + i + "'>" + pedido.pedidoTotal + "</td>" + "<td><input type='button' value='Deletar' onclick='deletarPedido(" + pedido.Id + ")'/></td>" + "<td><input type='button' value='Visualizar' onclick='visualizarPedido(" + pedido.Id + ")'/></td>" + "<td><input type='button' value='Atualizar' onclick='atualizarPedido(" + pedido.Id + ")'/></td>" + "</tr>"
            },
            error: function () {
                console.log("Erro na requisição");
            }
        })
    }
}

setTimeout(function () { adicionarPedidos() }, 100);




function deletarPedido(id) {
    var confirmacao = confirm("Tem certeza que deseja deletar?");
    if (confirmacao == true) {
        $.ajax({
            url: "http://localhost:49816/api/Pedidos/" + id,
            type: "DELETE",
            dataType: "json",
            success: function (data) {
                window.location.href = 'https://localhost:44340/Home/About';
            },
            error: function () {
                console.log("Erro na requisição");
            }
        });
    }
}

function visualizarPedido(id) {
    $.ajax({
        url: "http://localhost:49816/api/Pedidos/" + id,
        type: "GET",
        dataType: "json",
        success: function (produto) {
            document.getElementById('visualizacao').style.display = "block";
            document.getElementById('idPedido').innerHTML = "Id do Usuario: " + produto.UsuarioId;
            document.getElementById('descricaoPedido').innerHTML = "Descrição: " + produto.pedidoDescricao;
            document.getElementById('dataPedido').innerHTML = "Data: " + produto.pedidoData;
            document.getElementById('totalPedido').innerHTML = "Total: " + produto.pedidoTotal;
        },
        error: function () {
            console.log("Erro na requisição");
        }
    })
};

function atualizarPedido(id) {
    localStorage.setItem('idPedido', id);
    window.location.href = "https://localhost:44340/Home/Contact";
}



