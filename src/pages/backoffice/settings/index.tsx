import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { companies as Company, locations as Locations } from "@prisma/client";
import { config } from "@/config/config";
import Layout from "@/Components/BackofficeLayout";
import { getLocationId } from "@/utils";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";

const Setting = () => {
  const { locations, company } = useAppSelector(appData);
  const [selectedLocation, setSelectedLocation] = useState<
    Locations | undefined
  >();
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    address: "",
  });

  useEffect(() => {
    if (locations.length) {
      const selectedLocationId = getLocationId();
      if (!selectedLocationId) {
        localStorage.setItem("locationId", String(locations[0].id));
        setSelectedLocation(locations[0]);
      } else {
        const selectedLocation = locations.find(
          (location) => String(location.id) === selectedLocationId
        );
        setSelectedLocation(selectedLocation);
      }
    }
    if (company)
      //@ts-ignore
      setCompanyInfo({ name: company.name, address: company.address });
  }, [locations, company]);

  const handleOnChange = (e: SelectChangeEvent<number>) => {
    localStorage.setItem("locationId", String(e.target.value));
    const selectedLocation = locations.find(
      (location) => location.id === e.target.value
    );
    setSelectedLocation(selectedLocation);
  };

  //update company info
  const updateCompany = async () => {
    try {
      const response = await fetch(`${config.apiBaseUrl}/setting/companies`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(companyInfo),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="Setting">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: 400,
          m: "0 auto",
          flexDirection: "column",
          mt: 1,
        }}
      >
        <Typography variant="h4">Choose Your Info</Typography>
        <TextField
          label="Name"
          variant="outlined"
          value={companyInfo.name}
          sx={{ mb: 2, minWidth: 400, mt: 2 }}
          onChange={(evt) => {
            const name = evt.target.value;
            setCompanyInfo({ ...companyInfo, name });
          }}
        />
        <TextField
          label="Address"
          variant="outlined"
          value={companyInfo.address}
          sx={{ mb: 2, minWidth: 400 }}
          onChange={(evt) => {
            const address = evt.target.value;
            setCompanyInfo({ ...companyInfo, address });
          }}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Locations</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Locations"
            value={selectedLocation ? selectedLocation.id : ""}
            onChange={handleOnChange}
          >
            {locations &&
              Array.isArray(locations) &&
              locations.map((location) => {
                return (
                  <MenuItem key={location.id} value={location.id}>
                    {location.name}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          sx={{
            mt: 2,
            width: "fit-content",
            bgcolor: "#4E6C50",
            ":hover": { bgcolor: "#820000" },
          }}
          onClick={updateCompany}
        >
          Update
        </Button>
      </Box>
    </Layout>
  );
};

export default Setting;
