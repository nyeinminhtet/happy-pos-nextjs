import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Button,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";
import { getAccessToken, getLocationId } from "@/utils";
import { Company, Locations } from "@/Types/Types";
import { config } from "@/config/config";
import Layout from "@/Components/Layout";
import { BackofficeContent } from "@/Contents/BackofficeContent";

const Setting = () => {
  const { locations, company } = useContext(BackofficeContent);
  console.log(locations);
  const [selectedLocation, setSelectedLocation] = useState<
    Locations | undefined
  >();
  const [companyInfo, setCompanyInfo] = useState<Company>({
    name: "",
    address: "",
  });
  const route = useRouter();
  const accessToken = getAccessToken();

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
    if (company) setCompanyInfo(company);
  }, [locations, accessToken, company]);

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
      const response = await fetch(
        `${config.apiBackofficeBaseUrl}/setting/companies/${companyInfo.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(companyInfo),
        }
      );
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
        <h1>Choose Your Info</h1>
        <TextField
          label="Name"
          variant="outlined"
          value={companyInfo.name}
          sx={{ mb: 2, minWidth: 400 }}
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
          sx={{ mt: 2, width: "fit-content" }}
          onClick={updateCompany}
        >
          Update
        </Button>
      </Box>
    </Layout>
  );
};

export default Setting;
