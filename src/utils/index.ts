export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return "";
};

export const getLocationId = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("locationId");
  }
  return "";
};
