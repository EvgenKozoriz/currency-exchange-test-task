import React, { useEffect, useState } from "react";
import { Container, Paper, TextField, MenuItem, Box } from "@mui/material";
import SyncAltIcon from "@mui/icons-material/SyncAlt";

const currencies = ["UAH", "CZK"];

interface IExchangeRates {
  UAH: string;
  CZK: string;
  [key: string]: string;
}

const CurrencyConverter = () => {
  const [changeInput, setchangeInput] = useState<string>("0");
  const [getInput, setGetInput] = useState<string>("0");
  const [fromCurrency, setFromCurrency] = useState(currencies[0]);
  const [toCurrency, setToCurrency] = useState(currencies[1]);
  const [exchangeRates, setExchangeRates] = useState<IExchangeRates>({
    UAH: "1",
    CZK: "1.6",
  });

  const handleGetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = String(event.target.value);
    setchangeInput(newValue);
    setGetInput(handleConvert(newValue));
  };

  const handleGetInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = String(event.target.value);
    setGetInput(newValue);
    setchangeInput(handleConvert(newValue));
  };

  const handleFromCurrencyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setToCurrency(event.target.value);
  };

  useEffect(() => {
    setGetInput(handleConvert(changeInput));
  }, [toCurrency, fromCurrency]);

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const handleConvert = (amount: string): string => {
    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];

    const result = String(
      (
        (parseFloat(amount as string) * parseFloat(fromRate as string)) /
        parseFloat(toRate as string)
      ).toFixed(2)
    );

    return result;
  };

  return (
    <Container maxWidth="lg" sx={{ pb: "20px" }}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "80%",
          }}
        >
          <TextField
            label="Change"
            variant="outlined"
            type="number"
            value={changeInput}
            onChange={handleGetChange}
          />
          <TextField
            select
            label="From"
            variant="outlined"
            value={fromCurrency}
            onChange={handleFromCurrencyChange}
          >
            {currencies.map((currency) => (
              <MenuItem key={currency} value={currency}>
                {currency}
              </MenuItem>
            ))}
          </TextField>
          <SyncAltIcon onClick={handleSwap} />

          <TextField
            label="Get"
            variant="outlined"
            type="number"
            value={getInput}
            onChange={handleGetInput}
          />

          <TextField
            select
            label="To"
            variant="outlined"
            value={toCurrency}
            onChange={handleToCurrencyChange}
          >
            {currencies.map((currency) => (
              <MenuItem key={currency} value={currency}>
                {currency}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Paper>
    </Container>
  );
};

export default CurrencyConverter;
