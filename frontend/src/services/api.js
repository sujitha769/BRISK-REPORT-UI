import axios from "axios";

export async function fetchReport(orderId) {
  const response = await axios.get(
    `http://localhost:5000/api/report/${orderId}`
  );
  return response.data;
}
