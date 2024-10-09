using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    [Table("DEFINE_AUTHORITY")]
    public class DefineAuthority
    {
        [Key]
        public int AuthorityID {get;set;}
        public string AuthorityName {get;set;}
    }
}
