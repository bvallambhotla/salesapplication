
using System.Linq.Expressions;

namespace Domain.Interfaces.Repositories;
public interface IGenericRepository<T> where T : class
{
    Task<T> GetByIdAsync(int id);
    Task<T> GetByIdIncludingAsync(int id, params Expression<Func<T, object>>[] includeProperties);
    Task<IEnumerable<T>> GetByConditionAsync(Expression<Func<T, bool>> filter);
    Task<IEnumerable<T>> GetAllAsync();
    Task<IEnumerable<T>> GetAllIncludingAsync(params Expression<Func<T, object>>[] includeProperties);
    Task<IEnumerable<TResult>> GetAllWithProjectionAsync<TResult>(Expression<Func<T, TResult>> selector);
    Task AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(T entity);
}
