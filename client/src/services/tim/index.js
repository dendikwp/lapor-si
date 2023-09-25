import { useState } from "react";
import axios from "../API";
import swal from "sweetalert";
import { headers } from "../../utils/setHeaders";

export const masterTim = () => {
  const [listMasterTim, setListMasterTim] = useState([]);
  const [loading, setLoading] = useState(false);

  //view master tim
  const getMasterTim = async () => {
    setLoading(true);
    try {
      const masterTimRes = await axios.get("master-tim", headers);
      setListMasterTim(masterTimRes.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message || "API request failed");
      setLoading(false);
    }
  };

  //add master tim
  const addMasterTim = async (data, modal) => {
    setLoading(true);
    try {
      await axios.post("master-tim", data, headers);
      modal.current.click();
      setLoading(false);
      swal({
        title: "Berhasil di Tambah",
        text: "menutup jendela...",
        icon: "success",
        timer: 3000,
        buttons: false,
      }).then(() => {
        getMasterTim();
      });
    } catch (error) {
      console.error(error.message || "API request failed");
      setLoading(false);
    }
  };

  //delete master tim
  const deleteMasterTim = async (id) => {
    swal({
      title: "Yakin menghapus ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (okey) => {
      if (okey) {
        try {
          await axios.delete("master-tim/" + id, headers);
          swal({
            title: "Berhasil Hapus ",
            text: "menutup jendela...",
            icon: "success",
            timer: 3000,
            buttons: false,
          }).then(function () {
            getMasterTim();
          });
        } catch (error) {
          console.log(error.message || "API request failed");
        }
      }
    });
  };

  //update master tim
  const editMasterTim = async (data, modal) => {
    setLoading(true);
    try {
      await axios.put("master-tim/" + data.id, data, headers);
      modal.current.click();
      setLoading(false);
      swal({
        title: "Berhasil di Edit",
        text: "menutup jendela...",
        icon: "success",
        timer: 3000,
        buttons: false,
      }).then(() => {
        getMasterTim();
      });
    } catch (error) {
      console.log(error.message || "API request failed");
      setLoading(false);
    }
  };

  return {
    getMasterTim,
    addMasterTim,
    deleteMasterTim,
    editMasterTim,
    listMasterTim,
    loading,
  };
};
