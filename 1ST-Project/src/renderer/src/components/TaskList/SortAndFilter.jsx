import React from 'react';

<<<<<<< HEAD
export default function SortAndFilter({ filter, setFilter, sortKey, handleSort }) {
=======
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
>>>>>>> 0d092af67a662e7bcffc489d999d1b896e74caba
  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <label htmlFor="sort-options" className="form-label me-2">Sort by:</label>
          <select
            id="sort-options"
            className="form-select w-auto"
            onChange={(e) => handleSort(e.target.value)}
            value={sortKey}
          >
            <option value="title">Title</option>
            <option value="status">Status</option>
            <option value="deadline">Date</option>
          </select>
        </div>

        <div>
          <label className="form-check-label me-2">Show:</label>
          <div className="form-check form-check-inline">
            <input
              type="checkbox"
              className="form-check-input"
              id="show-completed"
              checked={filter.showCompleted}
              onChange={(e) =>
                setFilter({ ...filter, showCompleted: e.target.checked })
              }
            />
            <label htmlFor="show-completed" className="form-check-label">Completed</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="checkbox"
              className="form-check-input"
              id="show-canceled"
              checked={filter.showCanceled}
              onChange={(e) =>
                setFilter({ ...filter, showCanceled: e.target.checked })
              }
            />
            <label htmlFor="show-canceled" className="form-check-label">Canceled</label>
          </div>
        </div>
      </div>
    </div>
  );
}
