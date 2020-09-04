import React from "react";
import {
  TableContainer,
  TableRow,
  TableCell,
  Button,
  Table,
} from "@material-ui/core";

//sample reputationLog
const reputationLogs = [
  {
    amount: +10,
    action: "امتیاز به پرسش",
    preview: "چرا جاوا امکان ارث بری از چند کلاس را نمیدهد؟",
  },
  {
    amount: -2,
    action: "امتیاز به پرسش",
    preview: "کسی میتونه این سوالو حل کنه لطفا :) ؟",
  },
  {
    amount: +10,
    action: "تایید پاسخ",
    preview: "به خاطر اینکه باعث افزایش سرعت مدار میشه",
  },
  {
    amount: +2,
    action: "تایید ویرایش",
    preview: "با توابع مولد حل میشه ...",
  },
];

export default function ReputationLogTable() {

  const tableRow = (amount, action, preview) => (
    <TableRow>
      <TableCell
        align="left"
        style={amount > 0 ? { color: "GREEN" } : { color: "RED" }}
      >
        {amount > 0 ? "+" + amount : amount}
      </TableCell>
      <TableCell align="left">{action}</TableCell>
      <TableCell align="left">
        {preview}
      </TableCell>
      <TableCell align="left">
        <Button>مشاهده</Button>
      </TableCell>
    </TableRow>
  );

  return (
    <TableContainer style={{ width: "100%" }}>
      <Table>
        {reputationLogs.map((log) => tableRow(log.amount, log.action, log.preview))}
      </Table>
    </TableContainer>
  );
}
