using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    [Table("ADMIN_CONFIGURATION")]
    public class Configuration 
    {
        [Key]
        public int Id {get;set;}
        public string? MachineName {get;set;}
        public string? Tray {get;set;}
        public DateTime? CreatedDate {get;set;}
        public DateTime? UpdatedDate {get;set;}
    }
}