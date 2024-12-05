import React from 'react';

export default function SortAndFilter({ filter, setFilter, sortKey, handleSort }) {
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
