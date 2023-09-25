import React from 'react'

export default function ModalReport({ handleSubmit, handlerInput, setIsAdd, listMasterSI,listMasterTim,
    listMasterServer, listMasterSkala, form, isAdd, loader }) {
    return (
        <form onSubmit={handleSubmit}>
            <div className="card-header">
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <select className='form-control'
                            name='nama_app'
                            value={form.nama_app}
                            onChange={handlerInput}
                            required>
                            <option value="">apps</option>
                            {listMasterSI.map((list, i) => {
                                return (
                                    <option value={list.nama} key={i}>{list.nama}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="col-md-12 mb-3">
                        <input className='form-control' type="date"
                            name='tgl_masalah'
                            value={form.tgl_masalah}
                            onChange={handlerInput}
                            required />
                    </div>
                    <div className="col-md-12 mb-3">
                        <select className='form-control'
                            name='server'
                            value={form.server}
                            onChange={handlerInput}
                            required>
                            <option value="">server</option>
                            {listMasterServer.map((list, i) => {
                                return (
                                    <option value={list.nama} key={i}>{list.nama}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="col-md-12 mb-3">
                        <select className='form-control'
                            name='skala'
                            value={form.skala}
                            onChange={handlerInput}
                            required>
                            <option value="">skala</option>
                            {listMasterSkala.map((list, i) => {
                                return (
                                    <option value={list.skala} key={i}>{list.skala}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="col-md-12">
                        <select className='form-control'
                            name='priority'
                            value={form.priority}
                            onChange={handlerInput}
                            required>
                            <option value="">priority</option>
                            <option value="low">low</option>
                            <option value="medium">medium</option>
                            <option value="high">high</option>
                            <option value="urgent">urgent</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <input className='form-control' type="text" placeholder='pelapor'
                            name='pelapor'
                            value={form.pelapor}
                            onChange={handlerInput}
                            required />
                    </div>
                    <div className="col-md-12 mb-3">
                        <textarea className='form-control' placeholder='keluhan'
                            name='keluhan'
                            value={form.keluhan}
                            onChange={handlerInput}
                            required></textarea>
                    </div>
                    <div className="col-md-12 mb-3">
                        <textarea className='form-control' placeholder='solusi'
                            name='solusi'
                            value={form.solusi}
                            onChange={handlerInput}
                            required></textarea>
                    </div>
                    <div className="col-md-12 mb-3">
                        <input className='form-control' type="text" placeholder='tim bertugas'
                            name='tim_bertugas'
                            value={form.tim_bertugas}
                            onChange={handlerInput}
                            required />
                    </div>
                    <div className="col-md-12 mb-3">
                        <input className='form-control' type="number" placeholder='lama proses'
                            name='lama_fixing'
                            value={form.lama_fixing}
                            onChange={handlerInput}
                            required />
                    </div>
                    <div className="col-md-12 mb-3">
                    <label>lampiran</label>
                        <input className='form-control' type="file"
                            name='photo'
                            onChange={handlerInput}
                            accept=".jpg, .jpeg, .png, .gif, .bmp, .pdf"
                            max="2097152" // 2MB in bytes (2 * 1024 * 1024)
                            required />
                    </div>
                    
                    <div className="col-md-12">
                        <p align="right" style={{ margin: '0px' }}>
                            <button className='btn btn-white mr-2' onClick={() => setIsAdd(!isAdd)} disabled={loader}>cancel</button>
                            <button type='submit' className='btn btn-success' disabled={loader}>{loader ? "loading.." : (<>+&nbsp;add</>)}</button>
                        </p>
                    </div>
                </div>
            </div>
        </form>
    )
}
