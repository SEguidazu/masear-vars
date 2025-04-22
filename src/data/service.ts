import axios from "axios";

const SPREADSHEET_URL = "https://script.google.com/macros/s/AKfycbxvWEVNmdIzELEVAShhke2XMyYeEYu99ljabQYXy6rca3WIxTS33Bs_Cow7oKmXNjUlqw/exec"

const instance = axios.create({
  baseURL: SPREADSHEET_URL,
  headers: {
    "Content-Type": "application/json",
  }
});

const fetchMapData = async () => {
  try {
    const response = await instance.get('');

    if (response.data) return response.data;
  } catch (error) {
    console.error({ error });
  }
}

export { fetchMapData };