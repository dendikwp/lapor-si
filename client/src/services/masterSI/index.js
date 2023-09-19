import { useState } from "react";
import axios from "../API";
import swal from "sweetalert";
import { headers } from "../../utils/setHeaders";

export const masterSI = () => {
  const [listMasterSI, setListMasterSI] = useState([]);
  const [loading, setLoading] = useState(false);

  //view mastersi
  const getMasterSI = async () => {
    setLoading(true);
    try {
      const masterSIRes = await axios.get("master-si", headers);
      setListMasterSI(masterSIRes.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message || "API request failed");
      setLoading(false);
    }
  };

  //add mastersi
  const addMasterSI = async (data, modal) => {
    setLoading(true);
    try {
      await axios.post("master-si", data, headers);
      modal.current.click();
      setLoading(false);
      swal({
        title: "Berhasil di Tambah",
        text: "menutup jendela...",
        icon: "success",
        timer: 3000,
        buttons: false,
      }).then(() => {
        getMasterSI();
      });
    } catch (error) {
      console.error(error.message || "API request failed");
      setLoading(false);
    }
  };

  //delete master si
  const deleteMasterSI = async (id) => {
    swal({
      title: "Yakin menghapus ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (okey) => {
      if (okey) {
        try {
          await axios.delete("master-si/" + id, headers);
          swal({
            title: "Berhasil Hapus ",
            text: "menutup jendela...",
            icon: "success",
            timer: 3000,
            buttons: false,
          }).then(function () {
            getMasterSI();
          });
        } catch (error) {
          console.log(error.message || "API request failed");
        }
      }
    });
  };

  //update mastersi
  const editMasterSI = async (data, modal) => {
    setLoading(true);
    try {
      await axios.put("master-si/" + data.id, data, headers);
      modal.current.click();
      setLoading(false);
      swal({
        title: "Berhasil di Edit",
        text: "menutup jendela...",
        icon: "success",
        timer: 3000,
        buttons: false,
      }).then(() => {
        getMasterSI();
      });
    } catch (error) {
      console.log(error.message || "API request failed");
      setLoading(false);
    }
  };

  return {
    getMasterSI,
    addMasterSI,
    deleteMasterSI,
    editMasterSI,
    listMasterSI,
    loading,
  };
};
