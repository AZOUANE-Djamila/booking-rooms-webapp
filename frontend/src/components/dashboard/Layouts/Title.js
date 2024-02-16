import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

function Title(props) {
  return (
    <Typography
      component="h2"
      variant="h6"
      sx={{ color: "#222"}}
      gutterBottom
    >
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;