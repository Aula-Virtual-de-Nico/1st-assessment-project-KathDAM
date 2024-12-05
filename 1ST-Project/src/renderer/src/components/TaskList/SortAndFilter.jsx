import React from 'react';

const handleSort = (key) => {
  setSortKey(key);
  const sortedTasks = [...tasks].sort((a, b) => {
    const sortByFunctions = {
      deadline: () => {
        return a.deadline - b.deadline; // Ordenación ascendente por fecha
      },
      title: () => a.title.localeCompare(b.title), // Ordenación alfabética por título
      status: () => a.status.localeCompare(b.status), // Ordenación alfabética por estado
    };

    return sortByFunctions[key] ? sortByFunctions[key]() : 0;
  });

  setTasks(sortedTasks);
};

export default function SortAndFilter({ filter, setFilter, sortKey, setSortKey, handleSort }) {
  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between">
        <div>
          <label htmlFor="sort-options" className="form-label me-2">Sort by:</label>
          <select id="sort-options" className="form-select w-auto" onChange={(e) => handleSort(e.target.value)} value={sortKey}>
            <option value="title">Title</option>
            <option value="status">Status</option>
            <option value="deadline">Date</option>
          </select>
        </div>

        <div>
          <label className="form-check-label me-1">Show/Hide:</label>
          <input type="checkbox" className="form-check-input me-1" id="show-completed" checked={filter.showCompleted} onChange={(e) => setFilter({ ...filter, showCompleted: e.target.checked })} />
          <label htmlFor="show-completed" className="form-check-label me-3">Completed</label>

          <input type="checkbox" className="form-check-input me-1" id="show-canceled" checked={filter.showCanceled} onChange={(e) => setFilter({ ...filter, showCanceled: e.target.checked })} />
          <label htmlFor="show-canceled" className="form-check-label">Canceled</label>
        </div>
      </div>
    </div>
  );
}
