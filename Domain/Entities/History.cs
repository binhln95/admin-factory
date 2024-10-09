using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("ADMIN_HISTORY")]
    public class History 
    {
        [Key]
        public int Id {get;set;}
        public string MachineName {get;set;}
        public string Tray {get;set;}
        public bool Result {get;set;}
        public DateTime? CreatedDate {get;set;}
        public DateTime? UpdatedDate {get;set;}
    }
}