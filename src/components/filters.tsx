import {
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Search, SearchIconWrapper, StyledInputBase } from "./shared/search";
import SearchIcon from "@mui/icons-material/Search";
import { AppDispatch, RootState } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import {
  changeBrandFilter,
  changeModelFilter,
  changeSortFilter,
} from "../state/product/productSlice";

export default function Filters() {
  const dispatch = useDispatch<AppDispatch>();

  const { searchBrand, searchModel, modelList, brandList, sortBy, order } =
    useSelector((state: RootState) => state.product);

  const [tempBrandList, setTempBrandList] = useState<string[]>([]);
  const [tempModelList, setTempModelList] = useState<string[]>([]);

  const [searchBrandList, setSearchBrandList] = useState<string>();
  const [searchModelList, setSearchModelList] = useState<string>();

  const [sortValue, setSortValue] = useState("");

  const searchBrandFunc = (value: string) => {
    setSearchBrandList(value);
    let tempList: string[] = [];
    if (value) {
      tempList = tempBrandList.filter((brand: string) =>
        brand.toLowerCase().includes(value.toLowerCase())
      );
    } else {
      tempList = brandList;
    }
    setTempBrandList(tempList);
  };
  const searchModelFunc = (value: string) => {
    setSearchModelList(value);
    let tempList: string[] = [];
    if (value) {
      tempList = tempModelList.filter((brand: string) =>
        brand.toLowerCase().includes(value.toLowerCase())
      );
    } else {
      tempList = modelList;
    }
    setTempModelList(tempList);
  };

  const handleChange = (ischecked: boolean, value: string, name: string) => {
    if (name === "model") dispatch(changeModelFilter({ ischecked, value }));
    else dispatch(changeBrandFilter({ ischecked, value }));
  };

  const handleChangeSort = (event: any, value: string) => {
    setSortValue(value);
    dispatch(changeSortFilter(value));
  };

  const getSortValueFunc = () => {
    if (sortBy === "createdAt") {
      if (order === "asc") {
        setSortValue("1");
      }
      if (order === "desc") {
        setSortValue("2");
      }
    } else if (sortBy === "price") {
      if (order === "asc") {
        setSortValue("3");
      }
      if (order === "desc") {
        setSortValue("4");
      }
    }
  };

  useEffect(() => {
    setTempBrandList(brandList);
    setTempModelList(modelList);

    getSortValueFunc();
  }, [brandList, modelList, sortBy, order]);

  return (
    <div className="filter-section">
      <div>
        <div className="filter-title">Sort By</div>
        <Card>
          <CardContent>
            <FormControl>
              <RadioGroup
                value={sortValue}
                onChange={handleChangeSort}
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Old to new"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="New to old"
                />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="Price hight to low"
                />
                <FormControlLabel
                  value="4"
                  control={<Radio />}
                  label="Price low to High"
                />
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>
      </div>
      <div>
        <div className="filter-title">Brands</div>
        <Card>
          <CardContent>
            <FormControl>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon color="disabled" />
                </SearchIconWrapper>
                <StyledInputBase
                  value={searchBrandList}
                  onChange={(e: any) => searchBrandFunc(e.target.value)}
                  placeholder="Search…"
                  inputProps={{ color: "grey", "aria-label": "search" }}
                />
              </Search>
              <FormGroup
                sx={{ flexDirection: "row" }}
                className="filter-from-group"
              >
                {tempBrandList.map((brand: string) => (
                  <FormControlLabel
                    name="brand"
                    key={brand}
                    onChange={(e: any) =>
                      handleChange(e.target.checked, brand, e.target.name)
                    }
                    sx={{ width: "100%" }}
                    control={<Checkbox />}
                    checked={brand === searchBrand}
                    label={brand}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </CardContent>
        </Card>
      </div>
      <div>
        <div className="filter-title">Model</div>
        <Card>
          <CardContent>
            <FormControl>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon color="disabled" />
                </SearchIconWrapper>
                <StyledInputBase
                  value={searchModelList}
                  onChange={(e: any) => searchModelFunc(e.target.value)}
                  placeholder="Search…"
                  inputProps={{ color: "grey", "aria-label": "search" }}
                />
              </Search>
              <FormGroup
                sx={{ flexDirection: "row" }}
                className="filter-from-group"
              >
                {tempModelList.map((model: string) => (
                  <FormControlLabel
                    name="model"
                    onChange={(e: any) =>
                      handleChange(e.target.checked, model, e.target.name)
                    }
                    key={model}
                    sx={{ width: "100%" }}
                    control={<Checkbox />}
                    checked={model === searchModel}
                    label={model}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
