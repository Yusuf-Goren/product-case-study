import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  //   "&:hover": {
  //     backgroundColor: alpha(theme.palette.common.white, 0.25),
  //   },
  marginRight: 0,
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: alpha(theme.palette.common.black, 0.55),
  background: alpha(theme.palette.common.black, 0.1),
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    // transition: theme.transitions.create("width"),
    width: "100%",
    // [theme.breakpoints.up("md")]: {
    //   width: "20ch",
    // },
  },
}));
