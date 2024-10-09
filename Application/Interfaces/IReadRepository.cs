﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Application.interfaces
{
    public interface IReadRepository<T> where T : class
    {
        Task<List<T>> GetAll(CancellationToken cancellationToken = default);
        Task<T> FindById(int Id, CancellationToken cancellationToken = default);
        Task<List<T>> ListAsync(Expression<Func<T, bool>> expression, CancellationToken cancellationToken = default);
        Task<bool> AnyAsync(Expression<Func<T, bool>> expression, CancellationToken cancellationToken = default);
    }
}
