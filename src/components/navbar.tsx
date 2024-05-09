import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Container } from "@mui/material";
import { Search, SearchIconWrapper, StyledInputBase } from "./shared/search";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { changeNameFilter } from "../state/product/productSlice";
import { useNavigate } from "react-router-dom";

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { totalValue } = useSelector((state: RootState) => state.cart);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const { searchName } = useSelector((state: RootState) => state.product);
  const [nameFilter, setNameFilter] = useState(searchName);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleChangeSearchName = (e: any) => {
    setNameFilter(e.target.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(changeNameFilter(nameFilter));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [nameFilter]);

  const menuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <CardTravelIcon />
        </IconButton>
        <p>Basket</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              onClick={() => {
                return navigate(`/`);
              }}
              sx={{
                marginRight: "10em",
                cursor: "pointer",
                display: { xs: "none", sm: "block" },
              }}
            >
              Eteration
            </Typography>
            <Search sx={{ background: "white" }}>
              <SearchIconWrapper style={{ cursor: "pointer" }}>
                <SearchIcon color="disabled" />
              </SearchIconWrapper>
              <StyledInputBase
                onChange={(e: any) => handleChangeSearchName(e)}
                value={nameFilter}
                placeholder="Search…"
                inputProps={{ color: "grey", "aria-label": "search" }}
              />
            </Search>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <CardTravelIcon
                  onClick={() => {
                    return navigate(`/`);
                  }}
                />
                <div className="navbar-texts">{totalValue + ".00"} ₺</div>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
                <div className="navbar-texts">Yusuf</div>
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
