import React, { useEffect, useRef, useState } from 'react'
import { masterSkala } from '../../services/master-skala';
import BasicTable from '../../components/table';
import Loader from '../../components/loader';

export default function MasterSkala() {

    const initialState = {
        id: "",
        skala: ""
    }

    const modal = useRef(null)

    const [form, setForm] = useState(initialState)

    const { getMasterSkala,
        addMasterSkala,
        editMasterSkala,
        deleteMasterSkala,
        listMasterSkala, loading } = masterSkala()

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
            skala: data.skala
        }))
    }

    const handlerSubmit = (e) => {
        e.preventDefault()
        if (form.id == '') {
            addMasterSkala(form, modal)
        } else {
            editMasterSkala(form, modal)
        }
    }

    useEffect(() => {
        getMasterSkala()
    }, [])

    const columns = [
        {
            Header: 'No',
            accessor: 'no',
        },
        {
            Header: 'Nama Skala',
            accessor: 'skala',
        },
        {
            Header: 'Aksi',
            accessor: 'actions',
        },
    ]

    return (
        <div className="card shadow mb-4">
            <div className="card-header pt-4">
                <h5 className="text-gray-800">Master Skala</h5>
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
                            data={listMasterSkala}
                            handleDelete={deleteMasterSkala}
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
                            Skala
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" ref={modal}>
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <form onSubmit={handlerSubmit}>
                            <div className="modal-body">
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlInput1"><b>Nama Skala</b></label>
                                            <input type="text" name="skala" value={form.skala} className="form-control" placeholder="Berat" onChange={handlerInput} />
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
