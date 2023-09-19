import { useState } from "react";
import axios from "../API";
import swal from "sweetalert";
import { headers } from "../../utils/setHeaders";

export const masterServer = () => {
  const [listMasterServer, setListMasterServer] = useState([]);
  const [loading, setLoading] = useState(false);

  //view master server
  const getMasterServer = async () => {
    setLoading(true);
    try {
      const masterServerRes = await axios.get("master-server", headers);
      setListMasterServer(masterServerRes.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message || "API request failed");
      setLoading(false);
    }
  };

  //add master server
  const addMasterServer = async (data, modal) => {
    setLoading(true);
    try {
      await axios.post("master-server", data, headers);
      modal.current.click();
      setLoading(false);
      swal({
        title: "Berhasil di Tambah",
        text: "menutup jendela...",
        icon: "success",
        timer: 3000,
        buttons: false,
      }).then(() => {
        getMasterServer();
      });
    } catch (error) {
      console.error(error.message || "API request failed");
      setLoading(false);
    }
  };

  //delete master server
  const deleteMasterServer = async (id) => {
    swal({
      title: "Yakin menghapus ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (okey) => {
      if (okey) {
        try {
          await axios.delete("master-server/" + id, headers);
          swal({
            title: "Berhasil Hapus ",
            text: "menutup jendela...",
            icon: "success",
            timer: 3000,
            buttons: false,
          }).then(function () {
            getMasterServer();
          });
        } catch (error) {
          console.log(error.message || "API request failed");
        }
      }
    });
  };

  //update master server
  const editMasterServer = async (data, modal) => {
    setLoading(true);
    try {
      await axios.put("master-server/" + data.id, data, headers);
      modal.current.click();
      setLoading(false);
      swal({
        title: "Berhasil di Edit",
        text: "menutup jendela...",
        icon: "success",
        timer: 3000,
        buttons: false,
      }).then(() => {
        getMasterServer();
      });
    } catch (error) {
      console.log(error.message || "API request failed");
      setLoading(false);
    }
  };

  return {
    getMasterServer,
    addMasterServer,
    deleteMasterServer,
    editMasterServer,
    listMasterServer,
    loading,
  };
};
