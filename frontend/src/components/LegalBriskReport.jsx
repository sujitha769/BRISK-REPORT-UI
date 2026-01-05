import React from "react";

const LegalBriskReport = ({ data }) => {
  const processLegalData = () => {
    if (!data?.ReportData?.LegalInformation) return null;

    const legal = data.ReportData.LegalInformation;

    const categorize = (c) => {
      const t = (c.CaseType || "").toLowerCase();
      if (t.includes("criminal")) return "criminal";
      if (t.includes("civil") || t.includes("writ") || t.includes("appeal"))
        return "civil";
      return "unclassified";
    };

    const courtType = (c) => {
      const v = (c || "").toLowerCase();
      if (v.includes("supreme")) return "supremeCourt";
      if (v.includes("high")) return "highCourt";
      if (v.includes("district")) return "districtCourt";
      if (v.includes("tribunal")) return "tribunal";
      return "other";
    };

    const init = () => ({
      supremeCourt: 0,
      highCourt: 0,
      districtCourt: 0,
      tribunal: 0,
      other: 0,
    });

    const r = {
      total: 0,
      types: {
        civil: { total: 0, open: { t: 0, b: init() }, disposed: { t: 0, b: init() }, unknown: { t: 0, b: init() } },
        criminal: { total: 0, open: { t: 0, b: init() }, disposed: { t: 0, b: init() }, unknown: { t: 0, b: init() } },
        unclassified: { total: 0, open: { t: 0, b: init() }, disposed: { t: 0, b: init() }, unknown: { t: 0, b: init() } },
      },
    };

    const handle = (arr, s) => {
      if (!Array.isArray(arr)) return;
      arr.forEach((c) => {
        const cat = categorize(c);
        const ct = courtType(c.Court);
        r.total++;
        r.types[cat].total++;
        r.types[cat][s].t++;
        r.types[cat][s].b[ct]++;
      });
    };

    handle(legal.OpenCases, "open");
    handle(legal.DisposedCases, "disposed");
    handle(legal.UnknownStatusCases, "unknown");

    return r;
  };

  const d = processLegalData();
  if (!d) return <div>No data</div>;

  /* ---------- SVG helpers ---------- */

  const Curve = ({ x1, y1, x2, y2, c = "#999" }) => (
    <path
      d={`M ${x1} ${y1} C ${x1 + 40} ${y1}, ${x2 - 40} ${y2}, ${x2} ${y2}`}
      stroke={c}
      strokeWidth="1.3"
      fill="none"
    />
  );

  const CourtFan = ({ x, y, b }) => {
    const rows = [
      ["Supreme Court Case", b.supremeCourt],
      ["High Court Cases", b.highCourt],
      ["District Cases", b.districtCourt],
      ["Tribunal Cases", b.tribunal],
      ["Other Cases", b.other],
    ];

    const spacing = 40;
    const startY = y - ((rows.length - 1) * spacing) / 2;

    return rows.map((r, i) => (
      <g key={i}>
        <Curve x1={x} y1={y} x2={x + 120} y2={startY + i * spacing} />
        <text
          x={x + 130}
          y={startY + i * spacing + 4}
          fontSize="13"
          fill="#111"
        >
          {r[1]} {r[0]}
        </text>
      </g>
    ));
  };

  const StatusNode = ({ label, color, count, x, y, b }) => (
    <>
      <Curve x1={x - 60} y1={y} x2={x} y2={y} c={color} />
      <text x={x + 5} y={y + 4} fontSize="14" fill={color}>
        {count} {label} Cases
      </text>
      <CourtFan x={x + 140} y={y} b={b} />
    </>
  );

  const CaseBlock = ({ title, data, y, gap }) => (
    <>
      <Curve x1={300} y1={200} x2={380} y2={y} c="#333" />
      <text x={390} y={y + 4} fontSize="16" fontWeight="600">
        {data.total} {title}
      </text>

      <StatusNode label="Open" color="#2563eb" count={data.open.t} x={580} y={y + gap} b={data.open.b} />
      <StatusNode label="Disposed" color="#16a34a" count={data.disposed.t} x={580} y={y + gap * 2} b={data.disposed.b} />
      <StatusNode label="Unknown" color="#f97316" count={data.unknown.t} x={580} y={y + gap * 3} b={data.unknown.b} />
    </>
  );

  return (
    <div style={{ padding: "24px", background: "#fff" }}>
      <svg width="1200" height="1750">
        {/* Root */}
        <rect x="20" y="185" width="260" height="30" rx="6" stroke="#2563eb" strokeWidth="2.5" fill="none" />
        <text x="30" y="206" fontSize="18" fontWeight="700">
          {d.total} Total Cases
        </text>

        {/* Blocks */}
        <CaseBlock title="Civil Cases" data={d.types.civil} y={60} gap={145} />
        <CaseBlock title="Criminal Cases" data={d.types.criminal} y={570} gap={145} />
        <CaseBlock title="Unclassified Cases" data={d.types.unclassified} y={1080} gap={145} />
      </svg>
    </div>
  );
};

export default LegalBriskReport;