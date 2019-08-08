using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace WEB_API.Models
{
    public class WEB_APIContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public WEB_APIContext() : base("name=WEB_APIContext")
        {
        }

        public System.Data.Entity.DbSet<Web_API.Models.Usuario> Usuarios { get; set; }

        public System.Data.Entity.DbSet<Web_API.Models.Pedido> Pedidoes { get; set; }

        public System.Data.Entity.DbSet<Web_API.Models.Produto> Produtoes { get; set; }
    }
}
