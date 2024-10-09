namespace Application.Queries.GetHistory.Dto
{
    public class GetHistoryResponse
    {
        public string MachineName {get;set;}
        public string Tray {get;set;}
        public bool Result {get;set;}
        public DateTime? CreatedDate {get;set;}
        public DateTime? UpdatedDate {get;set;}
    }
}