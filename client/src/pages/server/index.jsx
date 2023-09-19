import React, { useEffect, useRef, useState } from 'react'
import { masterServer } from '../../services/master-server';
import BasicTable from '../../components/table';
import Loader from '../../components/loader';

export default function MasterServer() {

    const initialState = {
        id: "",
        nama: ""
    }

    const modal = useRef(null)

    const [form, setForm] = useState(initialState)

    const { getMasterServer,
        addMasterServer,
        editMasterServer,
        deleteMasterServer,
        listMasterServer, loading } = masterServer()

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
            nama: data.nama
        }))
    }

    const handlerSubmit = (e) => {
        e.preventDefault()
        if (form.id == '') {
            addMasterServer(form, modal)
        } else {
            editMasterServer(form, modal)
        }
    }

    useEffect(() => {
        getMasterServer()
    }, [])

    const columns = [
        {
            Header: 'No',
            accessor: 'no',
        },
        {
            Header: 'Nama Server',
            accessor: 'nama',
        },
    ]

    return (
        <div className="card shadow mb-4">
            <div className="card-header pt-4">
                <h5 className="text-gray-800">Master Server</h5>
            </div>
            <div className="card-body">
                {loading ? <Loader /> :
                    <>
                        <BasicTable
                            columns={columns}
                            data={listMasterServer}
                            handleDelete={deleteMasterServer}
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
                            Server
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" ref={modal}>
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <form onSubmit={handlerSubmit}>
                            <div className="modal-body">
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className="form-group">
                                            <label htmlFor="exampleFormControlInput1"><b>Nama Server</b></label>
                                            <input type="text" name="nama" value={form.nama} className="form-control" placeholder="Garuda 5" onChange={handlerInput} />
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
