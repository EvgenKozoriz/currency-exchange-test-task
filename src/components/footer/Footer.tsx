import { Typography, IconButton, Link, Box } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <Box
      component="footer"
      bgcolor="primary.main"
      color="white"
      sx={{
        height: "100px",
        position: "relative",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Typography variant="body1">
        ©Create by Eugene Kozoriz for test task 2023
      </Typography>
      <Box sx={{ position: "absolute", right: "100px" }}>
        <IconButton
          component={Link}
          href="https://github.com/EvgenKozoriz"
          target="_blank"
          color="inherit"
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          component={Link}
          href="https://www.instagram.com/jeka_kozoriz/"
          target="_blank"
          color="inherit"
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          component={Link}
          href="https://t.me/KozorizEV"
          target="_blank"
          color="inherit"
        >
          <TelegramIcon />
        </IconButton>
        <IconButton
          component={Link}
          href="https://www.linkedin.com/in/eugene-kozoriz-9587b4202/"
          target="_blank"
          color="inherit"
        >
          <LinkedInIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
