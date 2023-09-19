import React from 'react';
import { useTable, useGlobalFilter, usePagination } from 'react-table';

const BasicTable = ({ columns, data, handleDelete, handleEdit }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setPageSize,
        state,
        setGlobalFilter,
        page,
        gotoPage,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 10 },
        },
        useGlobalFilter,
        usePagination
    );

    const { globalFilter, pageIndex, pageSize } = state;

    return (
        <div>
            <input
                className='form-control mb-3'
                type="text"
                value={globalFilter || ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Cari..."
            />
            <div className="mt-2 mb-3">
                <span>Tampil :</span>
                <button className='btn btn-info btn-sm ml-1' onClick={() => setPageSize(10)} disabled={pageSize === 10 ? true : false}>10</button>
                <button className='btn btn-info btn-sm ml-1' onClick={() => setPageSize(50)} disabled={pageSize === 50 ? true : false}>50</button>
                <button className='btn btn-info btn-sm ml-1' onClick={() => setPageSize(rows.length)} disabled={pageSize === rows.length ? true : false}>All</button>
            </div>
            <div className="table-responsive">
                <table {...getTableProps()} className="table table-striped">
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row, index) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} key={row.id}>
                                    {row.cells.map((cell) => {
                                        if (cell.column.id === 'no') {
                                            return <td key={index}>{index + 1}</td>
                                        }
                                        if (cell.column.id === 'actions') {
                                            return (
                                                <td key={cell.column.id} {...cell.getCellProps()}>
                                                    <div className="btn-group dropdown">
                                                        <button type="button" className="btn btn-success dropdown-toggle btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            Pilihan
                                                        </button>
                                                        <div
                                                            className="dropdown-menu"
                                                            x-placement="bottom-start"
                                                        >
                                                            <button
                                                                className="dropdown-item"
                                                                data-toggle="modal"
                                                                data-target="#modal"
                                                                style={{
                                                                    cursor: "pointer",
                                                                    color: "blue",
                                                                    marginTop: "5px",
                                                                }}
                                                                onClick={() => handleEdit(row.original)}
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                className="dropdown-item"
                                                                onClick={() => handleDelete(row.original.id)}
                                                                style={{
                                                                    cursor: "pointer",
                                                                    color: "red",
                                                                    marginTop: "5px",
                                                                }}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                            );
                                        }
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="mt-3">
                <button className='btn btn-info btn-sm mr-1' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    first
                </button>
                <button className='btn btn-primary btn-sm mr-1' onClick={() => previousPage()} disabled={!canPreviousPage}>
                    prev
                </button>
                <button className='btn btn-white btn-sm mr-1' disabled>
                    {pageIndex + 1}
                </button>
                <button className='btn btn-primary btn-sm mr-1' onClick={() => nextPage()} disabled={!canNextPage}>
                    next
                </button>
                <button className='btn btn-info btn-sm' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    last
                </button>
            </div>
        </div>
    );
};

export default BasicTable;