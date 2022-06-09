import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { useState } from "react";
import api from "api";

import { Button } from "reactstrap";

// Component
const ExportExecl = ({ Users, myHeader }) => {
  let updatedUsers;
  const [loading, setLoading] = useState(false);
  // Exporting

  // File Type
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  // Extension
  const fileExtension = ".xlsx";
  const exportToCSV = (csvData, fileName) => {
    // Setting cols width
    var wscols = [{ wch: 30 }, { wch: 30 }, { wch: 30 }];

    // Sorting

    const ws = XLSX.utils.json_to_sheet(csvData, { header: myHeader });

    ws["!cols"] = wscols;

    const wb = { Sheets: { users: ws }, SheetNames: ["users"] };

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const e_data = new Blob([excelBuffer], { type: fileType });

    FileSaver.saveAs(e_data, fileName + fileExtension);
  };

  // exporting excel
  const handleSubmitExcel = async (Users) => {
    setLoading(true);

    if (Users.length > 0) {
      updatedUsers = Users.map((user) => {
        console.log("users for export ", user);
        return {
          Email: user.email,
          Type: user.type,
          "SUBSCRIBED At": new Date(user.createdAt).toLocaleString()
        };
      });
    }
    setLoading(false);
    console.log("users for export ", updatedUsers);
    exportToCSV(updatedUsers, " données des utilisateurs");
  };

  // Render
  return (
    <div
      className="d-flex justify-content-between "
      style={{ marginRight: "20px" }}
    >
      <Button
        color="primary"
        href="#pablo"
        onClick={(e) => {
          handleSubmitExcel(Users);
        }}
        size="md"
        disabled={loading}
      >
        {loading ? "Chargement en cours" : "Exporter excel"}
      </Button>
    </div>
  );
};

export default ExportExecl;
