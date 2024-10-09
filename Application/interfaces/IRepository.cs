using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.interfaces
{
    public interface IRepository<T> : IReadRepository<T> where T : class
    {
        Task<bool> UpdateAsync(T entity, CancellationToken cancellationToken = default);
        Task<bool> UpdateRangeAsync(List<T> entity, CancellationToken cancellationToken = default);
        Task<bool> DeleteAsync(T entity, CancellationToken cancellationToken = default);
        Task<bool> DeleteByIdAsync(Guid id, CancellationToken cancellationToken = default);
        Task<T> AddAsync(T entity, CancellationToken cancellationToken = default);
        Task<IEnumerable<T>> AddRangeAsync(IEnumerable<T> entity, CancellationToken cancellationToken = default);
        Task<bool> AddOrUpdateAsync(IEnumerable<T> entity, CancellationToken cancellationToken = default);
    }
}
