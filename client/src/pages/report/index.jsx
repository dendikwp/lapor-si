import React, { useEffect, useState } from 'react'
import { bulan } from '../../utils/bulan'
import ModalReport from './modal'
import ReportCard from './reportCard'
import EditCard from './editCard'
import { useReport } from '../../services/report'
import Loader from '../../components/loader'
import { masterSI } from '../../services/masterSI'
import { masterServer } from '../../services/master-server'
import { masterSkala } from '../../services/master-skala'
import { decodeToken } from '../../utils/setToken'

const options = [
    { value: 'dendik', label: 'Dendik' },
    { value: 'diki', label: 'Diki' },
    { value: 'taricha', label: 'Taricha' },
    { value: 'zen', label: 'Zen' },
];

export default function Report() {


    const initialState = {
        id: "",
        photo: "",
        nama_app: "",
        pelapor: "",
        tgl_masalah: "",
        server: "",
        keluhan: "",
        screenshot: "",
        solusi: "",
        lama_fixing: "",
        skala: "",
        priority: "",
        tim_bertugas: [],
        cs: decodeToken().username,
        status: 0,
    }

    const {
        getDate,
        getReportSI,
        addReportSI,
        editReportSI,
        deleteReportSI,
        setIsAdd,
        setIsEdit,
        setLoading,
        toggleStatus,
        listReport, date, isAdd, loading, loader, status, hapus, edit, isEdit } = useReport()
    const { getMasterSI, listMasterSI } = masterSI()
    const { getMasterServer, listMasterServer } = masterServer()
    const { getMasterSkala, listMasterSkala } = masterSkala()



    const [form, setForm] = useState(initialState)
    const [filter, setFilter] = useState({
        bulan: "",
        tahun: "",
        status: "all"
    })

    const selectInput = (e) => {
        console.log(e)
        setForm({
            ...form,
            tim_bertugas: e,
        });
    };


    const handlerInput = (e) => {
        const { name, value, type, files } = e.target;
        const newValue = type === 'file' ? files[0] : value;
        setForm({
            ...form,
            [name]: newValue,
        });
    };

    const handleSubmit = (e, index) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in form) {
            formData.append(key, form[key]);
        }
        if (form.id == "") {
            addReportSI(formData, filter)
        } else {
            editReportSI(formData, index, filter)
        }
    }

    const toggleEdit = (data, index) => {
        const newIsExpanded = [...isEdit];
        newIsExpanded[index] = !newIsExpanded[index];
        setIsEdit(newIsExpanded);
        if (data != "") {
            setForm((prev) => ({
                ...prev,
                ...data
            }))
        }
    };

    const handlerFilter = (e) => {
        setFilter((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        const getData = async () => {
            const resDate = await getDate();
            setFilter({
                bulan: resDate.bulan,
                tahun: resDate.tahun,
                status: "all"
            })
            const promises = [
                getReportSI(resDate.bulan, resDate.tahun, "all"),
                getMasterSI(),
                getMasterServer(),
                getMasterSkala()
            ]
            await Promise.all(promises);
        };
        getData();
    }, []);

    return (
        <div>
            <div className="card shadow mb-4">
                <div className="card-header pt-4">
                    <h5 className="text-gray-800">Report Masalah Sistem Informasi</h5>
                </div>
                {loading ? <Loader /> :
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-3 mb-2">
                                <select className='form-control' name="bulan"
                                    value={filter.bulan}
                                    onChange={handlerFilter}>
                                    <option value="">bulan</option>
                                    {
                                        bulan.map((list, i) => {
                                            return (<option value={list.value} key={i}>{list.label}</option>)
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-2 mb-2">
                                <input className='form-control' name="tahun" placeholder='tahun'
                                    value={filter.tahun}
                                    onChange={handlerFilter} />
                            </div>
                            <div className="col-md-2 mb-2">
                                <select className='form-control' name="status"
                                    value={filter.status}
                                    onChange={handlerFilter}>
                                    <option value="all">semua</option>
                                    <option value="0">in progress</option>
                                    <option value="1">done</option>
                                </select>
                            </div>
                            <div className="col-md-5">
                                <p align="right">
                                    <button className='btn btn-info'
                                        onClick={() => {
                                            getReportSI(filter.bulan, filter.tahun, filter.status);
                                            setLoading(true)
                                        }}>tampilkan report</button>
                                </p>
                            </div>
                            <div className="col-md-12">
                                <div className="card-header pt-4 mb-4">
                                    <div className="row">
                                        <div className="col-md-6 mt-1 mb-1">
                                            <h6 className="text-gray-800">&#128640;&nbsp;&nbsp;report progress</h6>
                                        </div>
                                        <div className="col-md-6 mt-1 mb-1">
                                            <p style={{ margin: "-10px 0 0 0" }} align="right">
                                                <button className='btn btn-white'
                                                    onClick={() => {
                                                        setIsAdd(!isAdd);
                                                        setForm(initialState);
                                                    }}
                                                >{isAdd ? "cancel" : "+ new report"}</button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="row">
                                    {isAdd ?
                                        <div className="col-md-4 mb-4">
                                            <div className="card shadow">
                                                <ModalReport
                                                    handleSubmit={handleSubmit}
                                                    handlerInput={handlerInput}
                                                    setIsAdd={setIsAdd}
                                                    listMasterSI={listMasterSI}
                                                    listMasterServer={listMasterServer}
                                                    listMasterSkala={listMasterSkala}
                                                    form={form}
                                                    isAdd={isAdd}
                                                    loader={loader}
                                                    options={options}
                                                    selectInput={selectInput}
                                                />
                                            </div>
                                        </div>
                                        : null}
                                    <div className={isAdd ? "col-md-8" : "col-md-12"}>
                                        <div className="row">
                                            {listReport.length == 0 ?
                                                <div className="col-md-12">
                                                    <p className='text-center'>it's okay. &#128076;no problem ! &#128526; </p>
                                                </div>
                                                :
                                                <>
                                                    {listReport.map((list, i) => {
                                                        return (
                                                            <div className={isAdd ? "col-md-6 mb-4" : "col-md-4 mb-4"} key={i}>
                                                                <div className="card shadow">
                                                                    {
                                                                        isEdit[i] ?
                                                                            <EditCard
                                                                                handleSubmit={handleSubmit}
                                                                                handlerInput={handlerInput}
                                                                                toggleEdit={toggleEdit}
                                                                                listMasterSI={listMasterSI}
                                                                                listMasterServer={listMasterServer}
                                                                                listMasterSkala={listMasterSkala}
                                                                                form={form}
                                                                                edit={edit}
                                                                                options={options}
                                                                                selectInput={selectInput}
                                                                                index={i} /> :
                                                                            <ReportCard
                                                                                list={list}
                                                                                toggleEdit={toggleEdit}
                                                                                toggleStatus={toggleStatus}
                                                                                deleteReportSI={deleteReportSI}
                                                                                status={status}
                                                                                hapus={hapus}
                                                                                filter={filter}
                                                                                index={i} />
                                                                    }
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
