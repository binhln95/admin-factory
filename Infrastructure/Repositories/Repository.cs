﻿using Application.interfaces;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected readonly AdminContext _context;
        protected readonly DbSet<T> _dbSet;

        public Repository(AdminContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }

        public async Task<T> AddAsync(T entity, CancellationToken cancellationToken = default)
        {
            await _dbSet.AddAsync(entity, cancellationToken);
            await _context.SaveChanges();
            return entity;
        }

        public Task<bool> AddOrUpdateAsync(IEnumerable<T> entity, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<T>> AddRangeAsync(IEnumerable<T> entity, CancellationToken cancellationToken = default)
        {
            await _dbSet.AddRangeAsync(entity, cancellationToken);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<bool> AnyAsync(Expression<Func<T, bool>> expression, CancellationToken cancellationToken = default)
        {
            var res = await _dbSet.AnyAsync(cancellationToken);
            return res;
        }

        public Task<bool> DeleteAsync(T entity, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public Task<T> FindById(int Id, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public async Task<List<T>> GetAll(CancellationToken cancellationToken = default)
        {
            var res = await _dbSet.ToListAsync(cancellationToken);
            return res;
        }

        public async Task<List<T>> ListAsync(Expression<Func<T, bool>> expression, CancellationToken cancellationToken = default)
        {
            var res = await _dbSet.Where(expression).ToListAsync(cancellationToken);
            return res;
        }

        public async Task<bool> RawQuery(string query, CancellationToken cancellationToken = default)
        {
            await _dbSet.FromSqlRaw(query).ToListAsync();
            return true;
        }

        public Task<bool> UpdateAsync(T entity, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateRangeAsync(List<T> entity, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
