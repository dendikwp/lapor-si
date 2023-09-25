import React, { useEffect, useRef, useState } from 'react'
import BasicTable from '../../components/table';
import Loader from '../../components/loader';
import { masterTim } from '../../services/tim';

export default function MasterTim() {
    const initialState = {
        id: "",
        nama_label: "",
        nama_lengkap: ""
    }

    const modal = useRef(null)

    const [form, setForm] = useState(initialState)
    const { getMasterTim,
        addMasterTim,
        editMasterTim,
        deleteMasterTim,
        listMasterTim, loading } = masterTim()

    function handlerInput(e) {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handlerEdit = (data) => {
        setForm((prev) => ({
            ...prev,
            id: data.id,
            nama_label: data.nama_label,
            nama_lengkap: data.nama_lengkap
        }))
    }

    const handlerSubmit = (e) => {
        e.preventDefault()
        if (form.id == '') {
            addMasterTim(form, modal)
        } else {
            editMasterTim(form, modal)
        }
    }

    useEffect(() => {
        getMasterTim()
    }, [])

    const columns = [
        {
            Header: 'No',
            accessor: 'no',
        },
        {
            Header: 'Nama Label',
            accessor: 'nama_label',
        },
        {
            Header: 'Nama Lengkap',
            accessor: 'nama_lengkap',
        },
        {
            Header: 'Aksi',
            accessor: 'actions',
        },
    ]

    return (
        <div className="card shadow mb-4">
            <div className="card-header pt-4">
                <h5 className="text-gray-800">Master Tim</h5>
            </div>
            <div className="card-body">
                {loading ? <Loader /> :
                    <>
                        <button type="button" className="btn btn-primary mb-4" data-toggle="modal" data-target="#modal">
                            Tambah Data
                        </button>
                        <BasicTable
                            columns={columns}
                            data={listMasterTim}
                            handleDelete={deleteMasterTim}
                            handleEdit={handlerEdit}
                        /></>}
            </div>

            {/* Modal */}
            <div className="modal fade" id="modal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Tim</h5>

                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" ref={modal}>
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <form onSubmit={handlerSubmit}>
                            <div className="modal-body">
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlInput1"><b>Nama Label</b></label>
                                            <input type="text" value={form.nama_label} name="nama_label" className="form-control" placeholder="nickname" onChange={handlerInput} />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlInput1"><b>Nama Lengkap</b></label>
                                            <input type="text" value={form.nama_lengkap} name="nama_lengkap" className="form-control" placeholder="kasman" onChange={handlerInput} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-danger" data-dismiss="modal">Keluar</button>
                                <button type="submit" className="btn btn-primary">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
