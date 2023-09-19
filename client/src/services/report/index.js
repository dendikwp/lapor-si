import { useState } from "react";
import axios from "../API";
import swal from "sweetalert";
import { headers, multipartheaders } from "../../utils/setHeaders";

export const useReport = () => {
  const [listReport, setListReport] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [isAdd, setIsAdd] = useState(false)
  const [status, setStatus] = useState(false);
  const [hapus, setHapus] = useState(false);
  const [edit, setEdit] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // get date now from server
  const getDate = async () => {
    const resDate = await axios.get("date");
    return resDate.data
  }

  //view report
  const getReportSI = async (bulan, tahun, st) => {
    try {
      const reportSIRes = await axios.get("report/" + bulan + "/" + tahun + "/" + st, headers);
      setListReport(reportSIRes.data);

      setStatus(Array(reportSIRes.data.length).fill(false))
      setHapus(Array(reportSIRes.data.length).fill(false))
      setEdit(Array(reportSIRes.data.length).fill(false))
      setIsEdit(Array(reportSIRes.data.length).fill(false))
      setLoading(false);
    } catch (error) {
      console.log(error.message || "API request failed");
      setLoading(false);
    }
  };

  //add report
  const addReportSI = async (data, filter) => {
    setLoader(true);
    try {
      await axios.post("report", data, multipartheaders);
      setLoader(false);
      setIsAdd(false);
      getReportSI(filter.bulan, filter.tahun, filter.status);
    } catch (error) {
      console.error(error.message || "API request failed");
      setLoader(false);
    }
  };

  //update report
  const editReportSI = async (data, index, filter) => {
    const newEdit = [...edit];
    newEdit[index] = !newEdit[index];
    try {
      setEdit(newEdit);
      await axios.patch("report", data, multipartheaders);
      setIsEdit(false);
      setEdit(newEdit);
      getReportSI(filter.bulan, filter.tahun, filter.status);
    } catch (error) {
      console.log(error.message || "API request failed");
      setEdit(newEdit);
    }
  };

  //delete report
  const deleteReportSI = async (id, ss, index, filter) => {
    let form = {
      id,
      fileName: ss
    }
    const newDelete = [...hapus];
    newDelete[index] = !newDelete[index];
    try {
      setHapus(newDelete);
      await axios.put("report", form, headers);
      setHapus(newDelete);
      getReportSI(filter.bulan, filter.tahun, filter.status);
    } catch (error) {
      console.log(error.message || "API request failed");
      setHapus(newDelete);
    }
  };

  //toggle status report
  const toggleStatus = async (id, status_report, index, filter) => {
    let form = {
      id,
      status: status_report
    }
    const newStatus = [...status];
    newStatus[index] = !newStatus[index];
    try {
      setStatus(newStatus);
      await axios.post("toggle-report", form, headers);
      getReportSI(filter.bulan, filter.tahun, filter.status);
      setStatus(newStatus);
    } catch (error) {
      console.log(error.message || "API request failed");
    }
  };

  return {
    getDate,
    getReportSI,
    addReportSI,
    deleteReportSI,
    editReportSI,
    setIsAdd,
    toggleStatus,
    setIsEdit,
    setLoading,
    listReport, isAdd, loading, loader, status, hapus, edit, isEdit
  };
};
