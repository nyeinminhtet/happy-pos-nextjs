import React, { useContext, useEffect, useState } from "react";

import { Box, Button, TextField, Typography } from "@mui/material";

import { getAccessToken } from "@/utils";
import { Locations } from "@/Types/Types";
import { config } from "@/config/config";
import Layout from "@/Components/Layout";
import { BackofficeContent } from "@/Contents/BackofficeContent";

const LocationsComp = () => {
  const accessToken = getAccessToken();
  const { locations, fetchData, company } = useContext(BackofficeContent);
  const [newLocation, setNewLocation] = useState<Locations>({
    name: "",
    address: "",
  });
  const [updateLocations, setUpdateLocations] =
    useState<Locations[]>(locations);

  useEffect(() => {
    setUpdateLocations(locations);
  }, [locations]);

  //create location
  const createLocation = async () => {
    const isValid = newLocation.name && newLocation.address;
    if (!isValid) return alert("Name and address are required");
    newLocation.companyId = company?.id;
    try {
      const response = await fetch(`${config.apiBackofficeBaseUrl}/locations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newLocation),
      });
      fetchData();
      setNewLocation({ name: "", address: "" });
    } catch (err) {
      console.log(err);
    }
  };

  //upload locations
  const uploadLocation = async (location: Locations) => {
    const locationId = location.id;
    const oldLocation = locations.find((olac) => olac.id === locationId);
    const newLocation = updateLocations.find(
      (uploadLocation) => uploadLocation.id === locationId
    );
    if (
      oldLocation?.name !== newLocation?.name ||
      oldLocation?.address !== newLocation?.address
    ) {
      await fetch(`${config.apiBackofficeBaseUrl}/locations/${location.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(location),
      });
      fetchData();
    }
  };

  //delete location
  const deleteLocation = async (location: Locations) => {
    const response = await fetch(
      `${config.apiBackofficeBaseUrl}/locations/${location.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.ok) {
      return fetchData();
    }
    alert(
      "Cannot delete this location. Please delete menus associated with it first."
    );
  };

  return (
    <Layout title="Locations">
      <Box sx={{ mt: 5, px: 5 }}>
        {updateLocations.map((location, index) => {
          return (
            <Box
              sx={{ display: "flex", alignItems: "center", mb: 3 }}
              key={location.id}
            >
              <Typography variant="h5" sx={{ mr: 1 }}>
                {index + 1}
              </Typography>
              <TextField
                value={location.name}
                sx={{ mr: 3 }}
                onChange={(e) => {
                  const newLocations = updateLocations.map((updateLocation) => {
                    if (updateLocation.id === location.id) {
                      return { ...updateLocation, name: e.target.value };
                    }
                    return updateLocation;
                  });
                  setUpdateLocations(newLocations);
                }}
              />
              <TextField
                value={location.address}
                sx={{ mr: 3, minWidth: 300 }}
                onChange={(e) => {
                  const newLocations = updateLocations.map((uploadLocation) => {
                    if (uploadLocation.id === location.id) {
                      return { ...uploadLocation, address: e.target.value };
                    }
                    return uploadLocation;
                  });
                  setUpdateLocations(newLocations);
                }}
              />
              <Button
                variant="contained"
                onClick={() => uploadLocation(location)}
              >
                Update
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ ml: 2 }}
                onClick={() => deleteLocation(location)}
              >
                Delete
              </Button>
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{ px: 5.5, display: "flex", alignItems: "center", mb: 3, ml: 2 }}
      >
        <TextField
          value={newLocation.name}
          placeholder="Name"
          sx={{ mr: 3 }}
          onChange={(e) =>
            setNewLocation({ ...newLocation, name: e.target.value })
          }
        />
        <TextField
          value={newLocation.address}
          placeholder="Address"
          sx={{ mr: 3, minWidth: 300 }}
          onChange={(evt) => {
            setNewLocation({ ...newLocation, address: evt.target.value });
          }}
        />
        <Button variant="contained" onClick={createLocation}>
          Create
        </Button>
      </Box>
    </Layout>
  );
};

export default LocationsComp;
