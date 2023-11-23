import { AppBar, Typography } from "@mui/material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        height: "100px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        p: "0 100px",
      }}
    >
      <CurrencyExchangeIcon
        fontSize="large"
        sx={{ pr: "15px", fontWeight: "bold" }}
      />
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        Currency Exchange
      </Typography>
    </AppBar>
  );
};

export default Header;
