import React from "react";
import PropTypes from "prop-types";

const Table = ({ columns, data, onRowClick }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover" style={{ fontFamily: "'Signika', sans-serif" }}>
        <thead className="table-primary">
          <tr>
            {columns.map((column, index) => (
              <th key={index} style={{ fontWeight: 400 }}> {/* Regular font for headers */}
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                onClick={() => onRowClick && onRowClick(row)}
                style={{ 
                  cursor: onRowClick ? "pointer" : "default", 
                  fontWeight: 300  // Light font for table rows
                }}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>{row[column.field]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center" style={{ fontWeight: 300 }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      field: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRowClick: PropTypes.func,
};

export default Table;
