import React, { useEffect, useRef, useState } from 'react'
import { masterSI } from '../../services/masterSI';
import BasicTable from '../../components/table';
import Loader from '../../components/loader';

export default function MasterSI() {

    const initialState = {
        id: "",
        nama: "",
        tahun: "",
        divisi: "",
        deskripsi: ""
    }

    const modal = useRef(null)

    const [form, setForm] = useState(initialState)

    const { getMasterSI,
        addMasterSI,
        editMasterSI,
        deleteMasterSI,
        listMasterSI, loading } = masterSI()

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
            nama: data.nama,
            tahun: data.tahun,
            divisi: data.divisi,
            deskripsi: data.deskripsi
        }))
    }

    const handlerSubmit = (e) => {
        e.preventDefault()
        if (form.id == '') {
            addMasterSI(form, modal)
        } else {
            editMasterSI(form, modal)
        }
    }

    useEffect(() => {
        getMasterSI()
    }, [])

    const columns = [
        {
            Header: 'No',
            accessor: 'no',
        },
        {
            Header: 'Nama SI',
            accessor: 'nama',
        },
        {
            Header: 'Tahun',
            accessor: 'tahun',
        },
        {
            Header: 'Divisi Apps SI',
            accessor: 'divisi',
        },
        {
            Header: 'Deskripsi',
            accessor: 'deskripsi',
        },
        {
            Header: 'Aksi',
            accessor: 'actions',
        },
    ]

    return (
        <div className="card shadow mb-4">
            <div className="card-header pt-4">
                <h5 className="text-gray-800">Master Sistem Informasi</h5>
            </div>
            <div className="card-body">
                {loading ? <Loader /> :
                    <>
                        <button type="button" className="btn btn-primary mb-4" data-toggle="modal" data-target="#modal"
                            onClick={() => setForm(initialState)}>
                            Tambah Data
                        </button>
                        <BasicTable
                            columns={columns}
                            data={listMasterSI}
                            handleDelete={deleteMasterSI}
                            handleEdit={handlerEdit}
                        />
                    </>}
            </div>

            {/* Modal */}
            <div className="modal fade" id="modal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" />
                            Sistem Informasi
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" ref={modal}>
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <form onSubmit={handlerSubmit}>
                            <div className="modal-body">
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlInput1"><b>Nama Sistem Informasi</b></label>
                                            <input type="text" name="nama" value={form.nama} className="form-control" placeholder="BAA" onChange={handlerInput} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlInput1"><b>Tahun Release</b></label>
                                            <input type="text" name="tahun" value={form.tahun} className="form-control" placeholder="2023" onChange={handlerInput} />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlInput1"><b>Divisi yang Menaungi</b></label>
                                            <input type="text" name="divisi" value={form.divisi} className="form-control" placeholder="Biro Akademik" onChange={handlerInput} />
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlTextarea1"><b>Deskripsi Aplikasi</b></label>
                                            <textarea className="form-control" value={form.deskripsi} name="deskripsi" onChange={handlerInput} rows={3} />
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
