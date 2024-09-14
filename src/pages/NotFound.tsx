import React from "react";
import { Container, Typography } from "@mui/material";

const NotFound: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" align="center" color="error">
        404 - Page Not Found
      </Typography>
    </Container>
  );
};

export default NotFound;
