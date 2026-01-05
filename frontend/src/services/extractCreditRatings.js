/**
 * Extract credit ratings data from API response
 * @param {Object} data - Full API response
 * @returns {Object} - Formatted credit ratings data
 */
export function extractCreditRatings(data) {
  try {
    const creditRatingsData = data?.ReportData?.CreditRatings;
    
    if (!creditRatingsData) {
      console.error("CreditRatings data not found");
      return {
        lastOneYear: [],
        olderThanOneYear: []
      };
    }

    // Helper function to format date from "07Nil12Nil2022" to "07-12-2022"
    const formatDate = (dateStr) => {
      if (!dateStr || dateStr === "NA") return "NA";
      // Handle format like "07Nil12Nil2022"
      const cleaned = dateStr.replace(/Nil/g, "-");
      return cleaned;
    };

    // Helper function to clean and format rating data
    const formatRatingData = (rating) => {
      return {
        agency: rating.RatingAgency || "NA",
        ratingDate: formatDate(rating.DateOfRating),
        instrumentDetails: rating.InstrumentDetails?.trim() || "NA",
        amount: rating.Amount ? `₹${rating.Amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "",
        ratingAssigned: rating.RatingAssigned || "--",
        outlook: rating.Outlook || "NA",
        rationalLink: rating.RationalLink || null
      };
    };

    // Extract ratings assigned in last 1 year
    const lastOneYear = Array.isArray(creditRatingsData.CreditRatingsAssignedInLastOneYear) 
      ? creditRatingsData.CreditRatingsAssignedInLastOneYear.map(formatRatingData)
      : [];

    // Extract ratings older than last 1 year
    const olderThanOneYear = Array.isArray(creditRatingsData.CreditRatingsOlderThanLastOneYear) 
      ? creditRatingsData.CreditRatingsOlderThanLastOneYear.map(formatRatingData)
      : [];

    return {
      lastOneYear,
      olderThanOneYear
    };
  } catch (error) {
    console.error("Error extracting credit ratings data:", error);
    return {
      lastOneYear: [],
      olderThanOneYear: []
    };
  }
}