"use client";

import Swal from "sweetalert2";

const ConfirmationAlert = ({ form, onConfirm, onCancel }) => {
  const showAlert = () => {
    Swal.fire({
      title: "You have set Tuma markup as follows:", 
      html: `
        <ul style='text-align: left; list-style: none; padding: 0;'>
          <li> ${form.baseCurrency} ->  ${form.destinationCurrency} by ${form.markup}% </li>
          <li><strong>Date of Effect:</strong> ${form.dateOfEffect}</li>
        </ul>
        <p>Confirm you want to proceed with applying these rates to destination currency?</p>
      `,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      } else {
        onCancel();
      }
    });
  };

  return showAlert();
};

export default ConfirmationAlert;
