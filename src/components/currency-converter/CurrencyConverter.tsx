import React, { useEffect } from "react";
import { Container, Paper, TextField, MenuItem, Box } from "@mui/material";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { useCurrencyConverter } from "../../store/CurrencyConverterStore";

const CurrencyConverter = () => {
  const {
    inputChangeValue,
    setInputChangeValue,
    inputGetValue,
    setinputGetValue,
    currencies,
    fromCurrency,
    toCurrency,
    setFromCurrency,
    setToCurrency,
    exchangeRates,
  } = useCurrencyConverter();

  useEffect(() => {
    setinputGetValue(handleConvert(inputChangeValue, false));
  }, [toCurrency, fromCurrency]);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = String(event.target.value);
    setInputChangeValue(newValue);
    setinputGetValue(handleConvert(newValue, false));
  };

  const handleGetInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = String(event.target.value);
    setinputGetValue(newValue);
    setInputChangeValue(handleConvert(newValue, true));
  };

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const handleConvert = (amount: string, isInvert: boolean): string => {
    const fromRate = isInvert ? exchangeRates[toCurrency] : exchangeRates[fromCurrency];
    const toRate = isInvert ? exchangeRates[fromCurrency] : exchangeRates[toCurrency];

    const result = String(
      (
        (parseFloat(amount) * parseFloat(fromRate)) /
        parseFloat(toRate)
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
            value={inputChangeValue}
            onChange={handleChangeInput}
          />
          <TextField
            select
            label="From"
            variant="outlined"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
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
            value={inputGetValue}
            onChange={handleGetInput}
          />

          <TextField
            select
            label="To"
            variant="outlined"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
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
