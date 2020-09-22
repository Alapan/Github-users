import React, { useEffect } from 'react';
//import { Link } from 'react-router-dom';
import { useTable, usePagination } from 'react-table';

export const UserTable = (props) => {

    const { columns, data, fetchData, pageCount: controlledPageCount } = props;
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        rows,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
      {
          columns,
          data,
          initialState: { pageIndex: 1 },
          manualPagination: true,
          pageCount: controlledPageCount,
      },
      usePagination
    );

    useEffect(() => {
      fetchData(pageIndex, pageSize);
    }, [pageIndex, pageSize])

    console.log('COUNT: ', controlledPageCount)

    return (
      <div>
          <div className="pagination">
              <button onClick={() => gotoPage(1)} disabled={!canPreviousPage}>
                  {'<<'}
              </button>{' '}
              <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                  {'<'}
              </button>{' '}
              <button onClick={() => nextPage()} disabled={!canNextPage}>
                  {'>'}
              </button>{' '}
              <button onClick={() => gotoPage(pageCount)} disabled={!canNextPage}>
                  {'>>'}
              </button>{' '}
              <span>
          Page{' '}
                  <strong>
            {pageIndex} of {pageOptions.length}
          </strong>{' '}
        </span>
              <span>
          | Go to page:{' '}
                  <input
                    type="number"
                    defaultValue={pageIndex}
                    onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(page)
                    }}
                    style={{ width: '100px' }}
                  />
          </span>{' '}
              <select
                value={pageSize}
                onChange={e => {
                    setPageSize(Number(e.target.value))
                }}
              >
                  {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                  ))}
              </select>
          </div>
          <table {...getTableProps()}>
              <thead>
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                          <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                        ))}
                    </tr>
                  ))}
              </thead>
              <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                        })}
                    </tr>
                  );
              })}
              </tbody>
          </table>
      </div>
    );
};
