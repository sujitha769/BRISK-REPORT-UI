// ============================================
// FILE: src/services/extractDirectorDetails.js
// ============================================

export const extractCurrentDirectors = (data) => {
  const directors = data?.ReportData?.DirectorKYCAndNetworks?.CurrentDirectors;
  if (!directors || directors.length === 0) return [];

  // Remove duplicates based on DirectorDIN
  const uniqueDirectors = directors.reduce((acc, director) => {
    if (!acc.find(d => d.DirectorDIN === director.DirectorDIN)) {
      acc.push(director);
    }
    return acc;
  }, []);

  return uniqueDirectors;
};

export const extractPastDirectors = (data) => {
  const directors = data?.ReportData?.DirectorKYCAndNetworks?.PastDirectors;
  if (!directors || directors.length === 0) return [];

  // Remove duplicates based on DirectorDIN
  const uniqueDirectors = directors.reduce((acc, director) => {
    if (!acc.find(d => d.DirectorDIN === director.DirectorDIN)) {
      acc.push(director);
    }
    return acc;
  }, []);

  return uniqueDirectors;
};


export const extractNewDirectorships = (data) => {
  const directorships = data?.ReportData?.DirectorKYCAndNetworks?.NewDirectorshipDetails;
  if (!directorships || directorships.length === 0) return [];
  return directorships;
};