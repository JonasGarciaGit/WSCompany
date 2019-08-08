using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web_API.Models
{
    public class Pedido
    {
        public int Id { get; set; }
        public string pedidoDescricao { get; set; }
        public double pedidoTotal { get; set; }
        public DateTime pedidoData { get; set; }
        public int UsuarioId { get; set; }


        public List<Produto> Produtos;

    }
}