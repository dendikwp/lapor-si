import { useState } from "react";
import axios from "../API";
import swal from "sweetalert";
import { headers } from "../../utils/setHeaders";

export const masterSkala = () => {
  const [listMasterSkala, setListMasterSkala] = useState([]);
  const [loading, setLoading] = useState(false);

  //view master skala
  const getMasterSkala = async () => {
    setLoading(true);
    try {
      const masterSkalaRes = await axios.get("master-skala", headers);
      setListMasterSkala(masterSkalaRes.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message || "API request failed");
      setLoading(false);
    }
  };

  //add master skala
  const addMasterSkala = async (data, modal) => {
    setLoading(true);
    try {
      await axios.post("master-skala", data, headers);
      modal.current.click();
      setLoading(false);
      swal({
        title: "Berhasil di Tambah",
        text: "menutup jendela...",
        icon: "success",
        timer: 3000,
        buttons: false,
      }).then(() => {
        getMasterSkala();
      });
    } catch (error) {
      console.error(error.message || "API request failed");
      setLoading(false);
    }
  };

  //delete master skala
  const deleteMasterSkala = async (id) => {
    swal({
      title: "Yakin menghapus ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (okey) => {
      if (okey) {
        try {
          await axios.delete("master-skala/" + id, headers);
          swal({
            title: "Berhasil Hapus ",
            text: "menutup jendela...",
            icon: "success",
            timer: 3000,
            buttons: false,
          }).then(function () {
            getMasterSkala();
          });
        } catch (error) {
          console.log(error.message || "API request failed");
        }
      }
    });
  };

  //update master skala
  const editMasterSkala = async (data, modal) => {
    setLoading(true);
    try {
      await axios.put("master-skala/" + data.id, data, headers);
      modal.current.click();
      setLoading(false);
      swal({
        title: "Berhasil di Edit",
        text: "menutup jendela...",
        icon: "success",
        timer: 3000,
        buttons: false,
      }).then(() => {
        getMasterSkala();
      });
    } catch (error) {
      console.log(error.message || "API request failed");
      setLoading(false);
    }
  };

  return {
    getMasterSkala,
    addMasterSkala,
    deleteMasterSkala,
    editMasterSkala,
    listMasterSkala,
    loading,
  };
};
