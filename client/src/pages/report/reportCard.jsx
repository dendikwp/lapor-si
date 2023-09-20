import React from 'react'
import { badgePriority } from './badges'
import { tanggalIndonesia } from '../../utils/tanggal'

export default function ReportCard({ toggleStatus, toggleEdit, deleteReportSI, list, status, hapus, index, filter }) {
    return (
        <div>
            <div className="card-header">
                <p style={{ marginBottom: '0px', fontSize: '14px' }}><b>{list.nama_app}</b>&nbsp;-&nbsp;{tanggalIndonesia(list.tgl_masalah)}</p>
                <span className='badge badge-info mr-1'>{list.server}</span>
                <span className='badge badge-white mr-1'>&#128347; {list.skala}</span>
                {badgePriority(list.priority)}
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12">
                        <p style={{ marginBottom: '0px', marginTop: '-8px', fontSize: '14px' }}><b>Reporter</b>: {list.pelapor}</p>
                        <p style={{ marginBottom: '0px', fontSize: '14px' }}>{list.keluhan}</p>
                        <p className='mt-2' style={{ marginBottom: '0px', fontSize: '14px' }}><b>Solusi</b>: {list.solusi}</p>
                        <p style={{ marginBottom: '0px', fontSize: '14px' }}><b>Tim Bertugas</b>: {list.tim_bertugas}</p>
                        <p style={{ marginBottom: '0px', fontSize: '14px' }}><b>Proses:</b> {list.lama_fixing} hari {list.screenshot != "" ? (<>- <a href={import.meta.env.VITE_API_BASE_URL + list.lampiran} target='_blank'>lampiran</a></>) : null}</p>
                    </div>
                    <div className="col-md-12 mt-2">
                        {
                            hapus[index] ? "loading..." :
                                <>
                                    <a style={{ color: 'blue', marginRight: '10px', cursor: 'pointer' }} onClick={() => toggleEdit(list, index)}>edit</a>
                                    <a style={{ color: 'red', marginRight: '10px', cursor: 'pointer' }} onClick={() => deleteReportSI(list.id, list.screenshot, index, filter)}>delete</a>
                                    <div className="custom-control custom-checkbox" style={{ float: 'right' }}>
                                        <input type="checkbox" className="custom-control-input" id={index} onChange={() => { toggleStatus(list.id, list.status == 0 ? 1 : 0, index, filter) }}
                                            checked={list.status == 1 ? true : false} />
                                        <label className="custom-control-label" htmlFor={index}>{status[index] ? "loading..." : (list.status == 0 ? (<>in progress &#9749;</>) : (<>done &#9971;</>))}</label>
                                    </div>
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
