/**
 * Service to extract Board Members KYC data
 */

export function extractBoardMembersKYC(data) {
  try {
    const boardData = data?.ReportData?.DirectorKYCAndNetworks?.BoardMembersKYCs;
    
    if (!boardData || !Array.isArray(boardData) || boardData.length === 0) {
      console.warn("Board Members KYC data not found");
      return [];
    }

    const transformedData = boardData.map(member => ({
      name: member.Name || "",
      din: member.DirectorDIN || "",
      designation: member.Designation || "",
      age: member.Age || 0,
      tenure: member.Tenure || 0,
      pan: member.PAN || "",
      city: member.City || "",
      state: member.State || "",
      email: member.Email || ""
    }));

    console.log("Extracted Board Members KYC Data:", transformedData);
    return transformedData;

  } catch (error) {
    console.error("Error extracting board members KYC data:", error);
    return [];
  }
}