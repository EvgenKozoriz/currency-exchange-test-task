import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useCurrencyConverter } from "../../store/CurrencyConverterStore";
import ModalComponent from "./Modal";
import AddedAlert from "./AddedAlert";

interface DataItem {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
  [key: string]: string;
}

const fetcher = async (url: string): Promise<DataItem[]> => {
  const apiCallsCounter = parseInt(
    localStorage.getItem("apiCallsCounter") || "0",
    10
  );
  const updatedCounter = apiCallsCounter + 1;

  localStorage.setItem("apiCallsCounter", updatedCounter.toString());

  if (updatedCounter % 5 === 0) {
    localStorage.setItem("apiCallsCounter", "0");
    throw new Error("Server error");
  }

  const response = await fetch(url);
  const data = await response.json();

  return data;
};

const CurrencyGrid = () => {
  const { data, error, isLoading } = useSWR(
    "https://currency-exchange-test-server.onrender.com/api/data",
    fetcher
  );
  const [editableCell, setEditableCell] = useState<DataItem | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [currentCol, setCurrentCol] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [saveDisabled, setSaveDisabled] = useState<boolean>(false);

  const {
    updateExchangeRate,
    addCurrency,
    showAddedAlert,
    openIsAdded,
    closeIsAdded,
  } = useCurrencyConverter();

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setEditableCell(null);
    setSaveDisabled(false)
  };

  const handleEdit = (rate: DataItem, field: "buy" | "sale") => {
    setEditableCell(rate);
    setCurrentCol(field);
    handleOpen();

    if (field === "buy") setInputValue(rate.buy);
    if (field === "sale") setInputValue(rate.sale);
  };

  const handleSave = () => {
    if (editableCell) {
      const updatedData = data?.map((rate) =>
        rate === editableCell ? { ...rate, [currentCol]: inputValue } : rate
      );

      updateExchangeRate(editableCell.ccy, inputValue);
      addCurrency(editableCell.ccy);
      openIsAdded();

      mutate(
        "https://currency-exchange-test-server.onrender.com/api/data",
        updatedData,
        false
      );
      setInputValue("");
      handleClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    validateInput(newValue);
  };

  const validateInput = (value: string) => {
    if (editableCell && currentCol) {
      const initialValue = editableCell[currentCol];
      const parsedValue = parseFloat(value);
      const parsedInitialValue = parseFloat(initialValue);
      if (!isNaN(parsedValue) && !isNaN(parsedInitialValue)) {
        const percentageDifference =
          Math.abs((parsedValue - parsedInitialValue) / parsedInitialValue) *
          100;
        setSaveDisabled(percentageDifference > 10);
      } else {
        setSaveDisabled(true);
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ p: "20px", position: "relative" }}>
      <ModalComponent
        isOpen={open}
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
        saveDisabled={saveDisabled}
        handleClose={handleClose}
      />
      {showAddedAlert && <AddedAlert closeIsAdded={closeIsAdded} />}
      {error && <Alert severity="error">Something went wrong...</Alert>}
      {isLoading && (
        <CircularProgress
          sx={{ position: "absolute", top: "50%", left: "50%" }}
        />
      )}
      <Paper elevation={3}>
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Exchange Rates Table
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Currency</TableCell>
              <TableCell>Buy</TableCell>
              <TableCell>Sell</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((rate: any) => (
              <TableRow key={rate.ccy}>
                <TableCell>{`${rate.ccy}/${rate.base_ccy}`}</TableCell>
                <TableCell onClick={() => handleEdit(rate, "buy")}>
                  {rate.buy}
                </TableCell>
                <TableCell onClick={() => handleEdit(rate, "sale")}>
                  {rate.sale}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default CurrencyGrid;
