/**
 * Board Members KYC Table Component
 * Displays director information in card layout
 */
function BoardMembersKYCTable({ data }) {
  if (!data || data.length === 0) {
    return (
      <div style={{ padding: "20px", marginTop: "30px" }}>
        <h2>Board Members, Director KYC And Network</h2>
        <p style={{ color: "#666" }}>No board members data available</p>
      </div>
    );
  }

  const formatYears = (value) => {
    if (!value) return "0 Years";
    return `${parseFloat(value).toFixed(1)} Years`;
  };

  return (
    <div style={{ marginTop: "30px" }}>
      {/* Header Section */}
      {/* <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ 
          color: "#003366", 
          fontSize: "32px", 
          marginBottom: "10px",
          fontWeight: "600"
        }}>
          Board Members, Director KYC And Network
        </h1>
        <div style={{ 
          height: "3px", 
          width: "60px", 
          backgroundColor: "#28a745", 
          margin: "0 auto 15px"
        }}></div>
        <p style={{ 
          color: "#666", 
          fontSize: "15px",
          maxWidth: "900px",
          margin: "0 auto"
        }}>
          Details of board members KYC, current and past directors' and their alliances with other companies registered in India.
        </p>
      </div> */}

      {/* Board Members Cards */}
      <div style={{ marginTop: "40px" }}>
        <h3 style={{
          color: "#28a745",
          fontSize: "20px",
          fontWeight: "600",
          marginBottom: "20px",
          paddingLeft: "5px"
        }}>
          Board Members KYC
        </h3>

        {data.map((member, index) => (
          <div
            key={index}
            style={{
              marginBottom: "20px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              overflow: "hidden"
            }}
          >
            {/* Card Header */}
            <div style={{
              backgroundColor: "#003366",
              color: "white",
              padding: "16px 20px",
              display: "grid",
              gridTemplateColumns: "40px 1fr auto auto",
              alignItems: "center",
              gap: "20px"
            }}>
              {/* Director Icon */}
              <div style={{
                width: "40px",
                height: "40px",
                backgroundColor: "white",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden"
              }}>
                <span style={{ fontSize: "24px" }}>👤</span>
              </div>

              {/* Name and Designation */}
              <div>
                <div style={{ fontSize: "14px", marginBottom: "4px", opacity: 0.9 }}>
                  {member.designation} ({member.din})
                </div>
                <div style={{ fontSize: "18px", fontWeight: "600" }}>
                  {member.name.replace(/\s*\(.*?\)\s*$/, '')}
                </div>
              </div>

              {/* Age */}
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "12px", marginBottom: "2px", opacity: 0.8 }}>
                  Age
                </div>
                <div style={{ fontSize: "16px", fontWeight: "600" }}>
                  {formatYears(member.age)}
                </div>
              </div>

              {/* Tenure */}
              <div style={{ textAlign: "right", paddingRight: "10px" }}>
                <div style={{ fontSize: "12px", marginBottom: "2px", opacity: 0.8 }}>
                  Tenure
                </div>
                <div style={{ fontSize: "16px", fontWeight: "600" }}>
                  {formatYears(member.tenure)}
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div style={{
              backgroundColor: "#f8f9fa",
              padding: "16px 20px",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
              fontSize: "14px"
            }}>
              {/* PAN */}
              <div>
                <span style={{ fontWeight: "600", color: "#333" }}>PAN</span>
                <span style={{ marginLeft: "10px", color: "#666" }}>
                  {member.pan || "-"}
                </span>
              </div>

              {/* City */}
              <div>
                <span style={{ fontWeight: "600", color: "#333" }}>City</span>
                <span style={{ marginLeft: "10px", color: "#666" }}>
                  {member.city || "-"}
                </span>
              </div>

              {/* Email */}
              <div>
                <span style={{ fontWeight: "600", color: "#333" }}>Email</span>
                <span style={{ marginLeft: "10px", color: "#666" }}>
                  {member.email || "-"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BoardMembersKYCTable;