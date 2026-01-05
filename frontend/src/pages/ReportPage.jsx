
import { useEffect, useState, useRef } from "react";
import { usePageTracker } from "../hooks/usePageTracker";
import { useNavigate } from "react-router-dom";
// // import { exportReportToPDF } from '../utils/exportReportToPDF';
// import { generatePDF } from '../utils/simplePDFExport';
// // import { useReactToPrint } from 'react-to-print';

import { generatePDFFromServer } from '../services/pdfService';

import ReportTOCPage from "../components/ReportTOCPage";
import ReportIndexPage from "../components/ReportIndexPage";
import MetaInfoTable from "../components/MetaInfoTable";
import CapitalStructure from "../components/CapitalStructure";
import CompanyMasterTable from "../components/CompanyMasterTable";
import RegisteredOfficeAddress from "../components/RegisteredOfficeAddress";
import ComplianceAndFilings from "../components/ComplianceAndFilings";
import NICProductsTable from "../components/NICProductsTable";
import PrincipalProductsTable from "../components/PrincipalProductsTable";
import OwnershipDetailsTable from "../components/OwnershipDetailsTable";
import PLStandaloneTable from "../components/PLStandaloneTable";
import PLComparisonChart from "../components/PLComparisonChart";
import BalanceSheetTable from "../components/BalanceSheetTable";
import AssetLiabilityChart from "../components/AssetLiabilityChart";
import FinancialTable from "../components/FinancialTable";
import CashFlowComparisonChart from "../components/CashFlowComparisonChart";
import RatioAnalysisTable from "../components/RatioAnalysisTable";
import RatioComparisonChart from "../components/RatioComparisonChart";
import RevenueFromOperationsTable from "../components/RevenueFromOperationsTable";
import FinanceCostTable from "../components/FinanceCostTable";
import OtherExpenseTable from "../components/OtherExpenseTable";
import BorrowingsTable from "../components/BorrowingsTable";
import LoansAndAdvancesTable from "../components/LoansAndAdvancesTable";
import TradeReceivablesTable from "../components/TradeReceivablesTable";
import EquityShareCapitalTable from "../components/EquityShareCapitalTable";
import ContingentLiabilitiesTable from "../components/ContingentLiabilitiesTable";
import RiskReportTables from "../components/RiskReportTables";
import AuditorKYCTable from "../components/AuditorKYCTable";
import AuditorQualificationTable from "../components/AuditorQualificationTable";
import CAROReportTable from "../components/CAROReportTable";
import PLConsolidatedTable from "../components/PLConsolidatedTable";
import AssetLiabilityChartConsolidated from "../components/AssetLiabilityChartConsolidated";
import BalanceSheetConsolidatedTable from "../components/BalanceSheetConsolidatedTable";
import PLComparisonChartConsolidated from "../components/PLComparisonChartConsolidated";
import CashFlowConsolidatedTable from "../components/CashFlowConsolidatedTable";
import CashFlowComparisonChartConsolidated from "../components/CashFlowComparisonChartConsolidated";
import RatioAnalysisConsolidatedTable from "../components/RatioAnalysisConsolidatedTable";
import RatioRedFlags from "../components/RatioRedFlags";
import RatioComparisonCharts from "../components/RatioComparisonCharts";
import StandaloneVsConsolidatedCharts from "../components/StandaloneVsConsolidatedCharts";
import StandaloneVsConsolidatedPLTable from "../components/StandaloneVsConsolidatedPLTable";
import ComparisonCharts from "../components/ComparisonCharts";
import StandaloneVsConsolidatedBalanceSheetTable from "../components/StandaloneVsConsolidatedBalanceSheetTable";
import CommonSizePLTable from "../components/CommonSizePLTable";
import CommonSizeBalanceSheetTable from "../components/CommonSizeBalanceSheetTable";
import SubsidiaryFinancialsTable from "../components/SubsidiaryFinancialsTable";
import RelatedPartyTransactionsTable from "../components/RelatedPartyTransactionsTable";
import RelatedPartyNotAtArmLengthTable from "../components/RelatedPartyNotAtArmLengthTable";
import RelatedPartyAtArmLengthTable from "../components/RelatedPartyAtArmLengthTable";
import RelatedCompaniesByDirectorsTable from "../components/RelatedCompaniesByDirectorsTable";
import RelatedCompaniesByEmailsTable from "../components/RelatedCompaniesByEmailsTable";
import RelatedCompaniesByAddressesTable from "../components/RelatedCompaniesByAddressesTable";
import CreditRatingsTable from "../components/CreditRatingsTable";
import LitigationTables from "../components/LitigationTables";
import GSTComplianceTable from "../components/GSTComplianceTable";
import MCAComplianceTable from "../components/MCAComplianceTable";
import EstablishmentAndEPFTable from "../components/EstablishmentAndEPFTable";
import ChargeSearchReportTable from "../components/ChargeSearchReportTable";
import ChargesTables from "../components/ChargesTables";
import ChargesProfileTable from "../components/ChargesProfileTable";
import PersonalGuaranteeTable from "../components/PersonalGuaranteeTable";
import BoardMembersKYCTable from "../components/BoardMembersKYCTable";
import CurrentDirectorsTable from "../components/CurrentDirectorsTable";
import PastDirectorsTable from "../components/PastDirectorsTable";
import NewDirectorshipsTable from "../components/NewDirectorshipsTable";
import LegalBriskReport from "../components/LegalBriskReport";
import LegalCasesSummaryTable from "../components/LegalCasesSummaryTable";
import OpenCasesTable from "../components/OpenCasesTable";
import DisposedCasesTable from "../components/DisposedCasesTable";
import UnknownStatusCasesTable from "../components/UnknownStatusCasesTable";
// import ReportHeader from "../components/ReportHeader";

import briskReportData from "../data/briskReport.json";
import { extractCompanyKYC } from "../services/extractCompanyKYC";
import { extractCompanyMaster } from "../services/extractCompanyMaster";
import { extractNICProducts, extractPrincipalProducts } from "../services/extractProducts";
import { extractOwnershipDetails } from "../services/extractOwnershipDetails";
import { extractPLStandalone } from "../services/extractPLStandalone";
import { extractPLChartData } from "../services/extractPLChartData";
import { extractBalanceSheetStandalone } from "../services/extractBalanceSheetStandalone";
import { extractAssetLiabilityBreakup } from "../services/extractAssetLiabilityBreakup";
import { financialDataService } from "../services/financialDataService";
import { extractCashFlowChartData } from "../services/extractCashFlowChartData";
import { extractRatioAnalysisStandalone } from "../services/extractRatioAnalysis";
import { extractRatioChartData } from "../services/extractRatioChartData";
import { extractRevenueFromOperations } from "../services/extractRevenueFromOperations";
import { extractFinanceCost } from "../services/extractFinanceCost";
import { extractOtherExpense } from "../services/extractOtherExpense";
import { extractBorrowings } from "../services/extractBorrowings";
import { extractLoansAndAdvances } from "../services/extractLoansAndAdvances";
import { extractTradeReceivables } from "../services/extractTradeReceivables";
import { extractEquityShareCapital } from "../services/extractEquityShareCapital";
import { extractContingentLiabilities } from "../services/extractContingentLiabilities";
import { extractPiotroskiFScore, extractTraditionalModels } from "../services/extractRiskReport";
import { extractAuditorKYC } from "../services/extractAuditorKYC";
import { extractAuditorQualification } from "../services/extractAuditorQualification";
import { extractCAROReport } from "../services/extractCAROReport";
import { extractPLConsolidatedTable } from "../services/extractPLConsolidatedTable";
import { extractAssetLiabilityBreakupConsolidated } from "../services/extractAssetLiabilityBreakupConsolidated";
import { extractBalanceSheetConsolidatedTable } from "../services/extractBalanceSheetConsolidatedTable";
import { extractPLChartDataConsolidated } from "../services/extractPLChartDataConsolidated";
import { extractCashFlowConsolidatedTable } from "../services/extractCashFlowConsolidatedTable";
import { extractCashFlowChartDataConsolidated } from "../services/extractCashFlowChartDataConsolidated";
import { extractRatioAnalysisConsolidatedTable } from "../services/extractRatioAnalysisConsolidatedTable";
import { extractRatioRedFlags } from "../services/extractRatioRedFlags";
import { extractRatioChartsData } from "../services/extractRatioChartsData";
import { extractStandaloneVsConsolidated } from "../services/extractStandaloneVsConsolidated";
import { extractStandaloneVsConsolidatedPL } from "../services/extractStandaloneVsConsolidatedPL";
import { extractComparisonCharts } from "../services/extractComparisonCharts";
import { extractStandaloneVsConsolidatedBalanceSheet } from "../services/extractStandaloneVsConsolidatedBalanceSheet";
import { extractCommonSizePL } from "../services/extractCommonSizePL";
import { extractCommonSizeBalanceSheet } from "../services/extractCommonSizeBalanceSheet";
import { extractSubsidiaryFinancials } from "../services/extractSubsidiaryFinancials";
import { extractRelatedPartyTransactions } from "../services/extractRelatedPartyTransactions";
import { extractRelatedPartyNotAtArmLength } from "../services/extractRelatedPartyNotAtArmLength";
import { extractRelatedPartyAtArmLength } from "../services/extractRelatedPartyAtArmLength";
import { extractRelatedCompaniesByDirectors, extractRelatedCompaniesByEmails, extractRelatedCompaniesByAddresses } from "../services/extractRelatedCompanies";
import { extractCreditRatings } from "../services/extractCreditRatings";
import { extractLitigation } from "../services/extractLitigation";
import { extractGSTCompliance } from "../services/extractGSTCompliance";
import { extractMCACompliance } from "../services/extractMCACompliance";
import { extractEstablishmentAndEPF } from "../services/extractEstablishmentAndEPF";
import { extractChargeSearchReport } from "../services/extractChargeSearchReport";
import { extractCharges } from "../services/extractCharges";
import { extractChargesProfile } from "../services/extractChargesProfile";
import { extractPersonalGuarantee } from "../services/extractPersonalGuarantee";
import { extractBoardMembersKYC } from "../services/extractBoardMembersKYC";
import { extractCurrentDirectors, extractPastDirectors, extractNewDirectorships } from "../services/extractDirectorDetails";
import { extractLegalSummary } from "../services/extractLegalSummary";
import { extractOpenCases } from "../services/extractOpenCases";
import { extractDisposedCases } from "../services/extractDisposedCases";
import { extractUnknownStatusCases } from "../services/extractUnknownStatusCases";

import './ReportPage.print.css';

function CompanyKYC({ data }) {
  if (!data) return null;

  return (
    <>
      <style>{`
        .info-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 16px 18px;
          page-break-inside: avoid;
        }
        .info-header {
          font-weight: 700;
          font-size: 16px;
          color: #1e3a8a;
          margin-bottom: 12px;
        }
        .info-table {
          width: 100%;
          border-collapse: collapse;
        }
        .info-table th {
          text-align: left;
          background: #f3f4f6;
          padding: 8px 10px;
          font-weight: 600;
          width: 35%;
          border: 1px solid #e5e7eb;
        }
        .info-table td {
          padding: 8px 10px;
          border: 1px solid #e5e7eb;
        }
        .more {
          color: #0d6efd;
          margin-left: 6px;
        }
      `}</style>

      <div className="info-card">
        <div className="info-header">📄 Identification & Tax Details</div>
        <table className="info-table">
          <tbody>
            <tr>
              <th>PAN</th>
              <td>{data.companyPAN || "NA"}</td>
            </tr>
            <tr>
              <th>TAN</th>
              <td>{data.companyTAN || "NA"}</td>
            </tr>
            <tr>
              <th>GST</th>
              <td>
                {data.gst?.first || "NA"}
                {data.gst?.moreCount > 0 && <span className="more">({data.gst.moreCount} more)</span>}
              </td>
            </tr>
            <tr>
              <th>EPF</th>
              <td>
                {data.epf?.first || "NA"}
                {data.epf?.moreCount > 0 && <span className="more">({data.epf.moreCount} more)</span>}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

function ReportPage() {
    const navigate = useNavigate();
   const reportRef = useRef();

// const handlePrint = useReactToPrint({
//   contentRef: reportRef,  // ✅ NEW WAY
//   documentTitle: 'BRisk_Report',
//   pageStyle: `
//     @page { 
//       size: A4; 
//       margin: 15mm; 
//     }
//     @media print {
//       body { 
//         -webkit-print-color-adjust: exact;
//         print-color-adjust: exact;
//       }
//     }
//   `
// });


const [checkingCIN, setCheckingCIN] = useState(true);
  const [metaInfo, setMetaInfo] = useState(null);
  const [companyKYCData, setCompanyKYCData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companyMasterData, setCompanyMasterData] = useState(null);
  const [nicProductsData, setNicProductsData] = useState([]);
  const [principalProducts, setPrincipalProducts] = useState([]);
  const [ownershipData, setOwnershipData] = useState(null);
  const [plStandalone, setPlStandalone] = useState(null);
  const [plChartData, setPlChartData] = useState([]);
  const [balanceSheetData, setBalanceSheetData] = useState(null);
  const [assetLiabilityData, setAssetLiabilityData] = useState([]);
  const [cashFlowTableData, setCashFlowTableData] = useState(null);
  const [cashFlowChartData, setCashFlowChartData] = useState([]);
  const [ratioAnalysisData, setRatioAnalysisData] = useState(null);
  const [ratioChartData, setRatioChartData] = useState(null);
  const [revenueData, setRevenueData] = useState(null);
  const [financeCostData, setFinanceCostData] = useState(null);
  const [otherExpenseData, setOtherExpenseData] = useState(null);
  const [borrowingsData, setBorrowingsData] = useState(null);
  const [loansAndAdvancesData, setLoansAndAdvancesData] = useState(null);
  const [tradeReceivablesData, setTradeReceivablesData] = useState(null);
  const [equityShareCapitalData, setEquityShareCapitalData] = useState(null);
  const [contingentLiabilitiesData, setContingentLiabilitiesData] = useState(null);
  const [piotroskiData, setPiotroskiData] = useState(null);
  const [traditionalModelsData, setTraditionalModelsData] = useState(null);
  const [auditorKYCData, setAuditorKYCData] = useState([]);
  const [auditorQualificationData, setAuditorQualificationData] = useState([]);
  const [caroReportData, setCAROReportData] = useState([]);
  const [plConsolidatedData, setPlConsolidatedData] = useState(null);
  const [assetLiabilityConsolidatedData, setAssetLiabilityConsolidatedData] = useState([]);
  const [balanceSheetConsolidated, setBalanceSheetConsolidated] = useState(null);
  const [plChartConsolidatedData, setPlChartConsolidatedData] = useState([]);
  const [cashFlowConsolidatedData, setCashFlowConsolidatedData] = useState(null);
  const [cashFlowChartConsolidatedData, setCashFlowChartConsolidatedData] = useState([]);
  const [ratioAnalysisConsolidated, setRatioAnalysisConsolidated] = useState(null);
  const [ratioRedFlags, setRatioRedFlags] = useState([]);
  const [ratioChartsData, setRatioChartsData] = useState(null);
  const [standaloneVsConsolidatedData, setStandaloneVsConsolidatedData] = useState(null);
  const [plComparisonData, setPlComparisonData] = useState(null);
  const [comparisonChartsData, setComparisonChartsData] = useState(null);
  const [bsComparisonData, setBsComparisonData] = useState([]);
  const [commonSizePLData, setCommonSizePLData] = useState(null);
  const [commonSizeBS, setCommonSizeBS] = useState(null);
  const [subsidiaryFinancials, setSubsidiaryFinancials] = useState(null);
  const [relatedPartyTransactions, setRelatedPartyTransactions] = useState([]);
  const [relatedPartyNotAtArmLength, setRelatedPartyNotAtArmLength] = useState([]);
  const [relatedPartyAtArmLength, setRelatedPartyAtArmLength] = useState([]);
  const [relatedCompaniesByDirectors, setRelatedCompaniesByDirectors] = useState([]);
  const [relatedCompaniesByEmails, setRelatedCompaniesByEmails] = useState([]);
  const [relatedCompaniesByAddresses, setRelatedCompaniesByAddresses] = useState([]);
  const [creditRatingsData, setCreditRatingsData] = useState(null);
  const [litigationData, setLitigationData] = useState(null);
  const [gstComplianceData, setGstComplianceData] = useState(null);
  const [mcaComplianceData, setMcaComplianceData] = useState(null);
  const [establishmentAndEPF, setEstablishmentAndEPF] = useState(null);
  const [chargeSearchReport, setChargeSearchReport] = useState(null);
  const [chargesData, setChargesData] = useState(null);
  const [chargesProfileData, setChargesProfileData] = useState(null);
  const [personalGuaranteeData, setPersonalGuaranteeData] = useState(null);
  const [boardMembersData, setBoardMembersData] = useState(null);
  const [currentDirectorsData, setCurrentDirectorsData] = useState([]);
  const [pastDirectorsData, setPastDirectorsData] = useState([]);
  const [newDirectorshipsData, setNewDirectorshipsData] = useState([]);
  const [fullReportData, setFullReportData] = useState(null);
  const [legalSummary, setLegalSummary] = useState(null);
  const [openCasesData, setOpenCasesData] = useState([]);
  const [disposedCasesData, setDisposedCasesData] = useState([]);
  const [unknownStatusCasesData, setUnknownStatusCasesData] = useState([]);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

 const pageMap = usePageTracker();

const handleDownloadPDF = async () => {
  setIsGeneratingPDF(true);
  try {
    await generatePDFFromServer();
  } catch (error) {
    console.error('Error generating PDF:', error);
  } finally {
    setIsGeneratingPDF(false);
  }
};
// 🔐 ADD THIS ENTIRE useEffect BLOCK ↓↓↓
useEffect(() => {
  const isVerified = localStorage.getItem("cin_verified");
  
  if (!isVerified) {
    navigate("/", { replace: true });
  } else {
    setCheckingCIN(false);
  }
}, [navigate]);




  useEffect(() => {
    async function loadReport() {
      try {
        const data = briskReportData;
        setFullReportData(data);

        const legalSummaryData = extractLegalSummary(data);
        setLegalSummary(legalSummaryData);

        const openCases = extractOpenCases(data);
        setOpenCasesData(openCases);

        const cashFlowRaw = data?.ReportData?.ComparativeFinancialsStandalone?.CashFlowStatementStandalone;
        const transformedCashFlow = financialDataService.transformCashFlowData(cashFlowRaw);
        setCashFlowTableData(transformedCashFlow);

        const cashFlowChart = extractCashFlowChartData(data);
        setCashFlowChartData(cashFlowChart);

        const ratioAnalysis = extractRatioAnalysisStandalone(data);
        setRatioAnalysisData(ratioAnalysis);

        const ratioChart = extractRatioChartData(data);
        setRatioChartData(ratioChart);

        const revenue = extractRevenueFromOperations(data);
        setRevenueData(revenue);

        const financeCost = extractFinanceCost(data);
        setFinanceCostData(financeCost);

        const otherExpense = extractOtherExpense(data);
        setOtherExpenseData(otherExpense);

        const borrowings = extractBorrowings(data);
        setBorrowingsData(borrowings);

        const loansAndAdvances = extractLoansAndAdvances(data);
        setLoansAndAdvancesData(loansAndAdvances);

        const tradeReceivables = extractTradeReceivables(data);
        setTradeReceivablesData(tradeReceivables);

        const equityShareCapital = extractEquityShareCapital(data);
        setEquityShareCapitalData(equityShareCapital);

        const contingentLiabilities = extractContingentLiabilities(data);
        setContingentLiabilitiesData(contingentLiabilities);

        const piotroski = extractPiotroskiFScore(data);
        setPiotroskiData(piotroski);

        const traditionalModels = extractTraditionalModels(data);
        setTraditionalModelsData(traditionalModels);

        const auditorKYC = extractAuditorKYC(data);
        setAuditorKYCData(auditorKYC);

        const auditorQualification = extractAuditorQualification(data);
        setAuditorQualificationData(auditorQualification);

        const caroReport = extractCAROReport(data);
        setCAROReportData(caroReport);

        const masterData = extractCompanyMaster(data);
        const nicData = extractNICProducts(data);
        const bsData = extractBalanceSheetStandalone(data);

        const plConsolidated = extractPLConsolidatedTable(data);
        setPlConsolidatedData(plConsolidated);

        const assetLiabilityConsolidated = extractAssetLiabilityBreakupConsolidated(data);
        setAssetLiabilityConsolidatedData(assetLiabilityConsolidated);

        const bsConsolidated = extractBalanceSheetConsolidatedTable(data);
        setBalanceSheetConsolidated(bsConsolidated);

        const plChartConsolidated = extractPLChartDataConsolidated(data);
        setPlChartConsolidatedData(plChartConsolidated);

        const cashFlowConsolidated = extractCashFlowConsolidatedTable(data);
        setCashFlowConsolidatedData(cashFlowConsolidated);

        const cashFlowChartConsolidated = extractCashFlowChartDataConsolidated(data);
        setCashFlowChartConsolidatedData(cashFlowChartConsolidated);

        const ratioConsolidated = extractRatioAnalysisConsolidatedTable(data);
        setRatioAnalysisConsolidated(ratioConsolidated);

        setRatioRedFlags(extractRatioRedFlags(data));

        const ratioCharts = extractRatioChartsData(data);
        setRatioChartsData(ratioCharts);

        const standaloneVsConsolidated = extractStandaloneVsConsolidated(data);
        setStandaloneVsConsolidatedData(standaloneVsConsolidated);

        const plComparison = extractStandaloneVsConsolidatedPL(data);
        setPlComparisonData(plComparison);

        const comparisonCharts = extractComparisonCharts(data);
        setComparisonChartsData(comparisonCharts);

        const bsComparison = extractStandaloneVsConsolidatedBalanceSheet(data);
        setBsComparisonData(bsComparison);

        const commonSizePL = extractCommonSizePL(data);
        setCommonSizePLData(commonSizePL);

        const csbs = extractCommonSizeBalanceSheet(data);
        setCommonSizeBS(csbs);

        const subsidiaryData = extractSubsidiaryFinancials(data);
        setSubsidiaryFinancials(subsidiaryData);

        const transactionData = extractRelatedPartyTransactions(data);
        setRelatedPartyTransactions(transactionData);

        const notAtArmLengthData = extractRelatedPartyNotAtArmLength(data);
        setRelatedPartyNotAtArmLength(notAtArmLengthData);

        const atArmLengthData = extractRelatedPartyAtArmLength(data);
        setRelatedPartyAtArmLength(atArmLengthData);

        const companiesByDirectors = extractRelatedCompaniesByDirectors(data);
        setRelatedCompaniesByDirectors(companiesByDirectors);

        const companiesByEmails = extractRelatedCompaniesByEmails(data);
        setRelatedCompaniesByEmails(companiesByEmails);

        const companiesByAddresses = extractRelatedCompaniesByAddresses(data);
        setRelatedCompaniesByAddresses(companiesByAddresses);

        const creditRatings = extractCreditRatings(data);
        setCreditRatingsData(creditRatings);

        const litigation = extractLitigation(data);
        setLitigationData(litigation);

        const gstCompliance = extractGSTCompliance(data);
        setGstComplianceData(gstCompliance);

        const mcaData = extractMCACompliance(data);
        setMcaComplianceData(mcaData);

        const epfData = extractEstablishmentAndEPF(data);
        setEstablishmentAndEPF(epfData);

        const chargeData = extractChargeSearchReport(data);
        setChargeSearchReport(chargeData);

        const charges = extractCharges(data);
        setChargesData(charges);

        const chargesProfile = extractChargesProfile(data);
        setChargesProfileData(chargesProfile);

        const personalGuarantee = extractPersonalGuarantee(data);
        setPersonalGuaranteeData(personalGuarantee);

        const boardMembers = extractBoardMembersKYC(data);
        setBoardMembersData(boardMembers);

        const currentDirectors = extractCurrentDirectors(data);
        setCurrentDirectorsData(currentDirectors);

        const pastDirectors = extractPastDirectors(data);
        setPastDirectorsData(pastDirectors);

        const newDirectorships = extractNewDirectorships(data);
        setNewDirectorshipsData(newDirectorships);

        const disposedCases = extractDisposedCases(data);
        setDisposedCasesData(disposedCases);

        const unknownCases = extractUnknownStatusCases(data);
        setUnknownStatusCasesData(unknownCases);

        setMetaInfo(data.MetaInfo);
        setCompanyKYCData(extractCompanyKYC(data));
        setCompanyMasterData(masterData);
        setNicProductsData(nicData);
        setPrincipalProducts(extractPrincipalProducts(data));
        setOwnershipData(extractOwnershipDetails(data));
        setPlStandalone(extractPLStandalone(data));
        setPlChartData(extractPLChartData(data));
        setBalanceSheetData(bsData);
        setAssetLiabilityData(extractAssetLiabilityBreakup(data));
      } catch (err) {
        console.error("Error in loadReport:", err);
        setError("Failed to load report data");
      } finally {
        setLoading(false);
      }
    }

    loadReport();
  }, []);


  if (checkingCIN) {
  return null; // prevents report flash
}




  if (error) {
    return <p style={{ padding: "20px", color: "red" }}>{error}</p>;
  }

return (
  <div>
    <button 
  onClick={handleDownloadPDF}
  disabled={isGeneratingPDF}
  className="no-print"
  style={{
    backgroundColor: isGeneratingPDF ? '#6b7280' : '#0b4ea2',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '6px',
    cursor: isGeneratingPDF ? 'not-allowed' : 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    display: 'block',
    margin: '20px auto',
    transition: 'all 0.3s ease',
    opacity: isGeneratingPDF ? 0.7 : 1,
    boxShadow: isGeneratingPDF ? 'none' : '0 2px 4px rgba(0,0,0,0.1)'
  }}
  onMouseEnter={(e) => {
    if (!isGeneratingPDF) {
      e.target.style.backgroundColor = '#094a92';
      e.target.style.transform = 'translateY(-2px)';
      e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    }
  }}
  onMouseLeave={(e) => {
    if (!isGeneratingPDF) {
      e.target.style.backgroundColor = '#0b4ea2';
      e.target.style.transform = 'translateY(0)';
      e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }
  }}
>
  {isGeneratingPDF ? (
    <>
      <span style={{ marginRight: '8px' }}>⏳</span>
      Generating PDF... (This may take 30-60 seconds)
    </>
  ) : (
    <>
      <span style={{ marginRight: '8px' }}>📥</span>
      Download as PDF
    </>
  )}
</button>

    <div ref={reportRef} id="report-container" className="report-content">
       {/* <ReportHeader /> */}
      
      <ReportIndexPage data={fullReportData} />

      <div className="print-only">
        <ReportTOCPage pageMap={pageMap} />
      </div>

      {/* <h1 style={{ textAlign: "center" }}>BRisk Report</h1> */}

      <div data-index-id="corporate-directory">
        <div style={{
          background: "#30498eff",
          padding: "24px 30px",
          maxWidth: "1000px",
          margin: "30px auto",
          textAlign: "center"
        }}>
          <h1 style={{ margin: "0 0 8px 0", fontSize: "34px", fontWeight: "bold", color: "white" }}>
            Corporate Directory Report
          </h1>
          {/* <p style={{ margin: 0, fontSize: "17px", lineHeight: "1.6", color: "#333" }}>
            Company formation, KYC and group structure details including relevant information about Board Members.
          </p> */}
        </div>

        <div data-index-id="company-masters">
          <CompanyMasterTable data={companyMasterData} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px", marginTop: "24px" }}>
          <div data-index-id="company-kyc">
            <CompanyKYC data={companyKYCData} />
          </div>
          <CapitalStructure data={companyMasterData} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px", marginTop: "24px" }}>
          <RegisteredOfficeAddress data={companyMasterData} />
          <ComplianceAndFilings data={companyMasterData} />
        </div>
      </div>

      <div data-index-id="product-services">
        <NICProductsTable data={nicProductsData} />
        <PrincipalProductsTable data={principalProducts} />
      </div>

      <div data-index-id="ownership-details">
        <OwnershipDetailsTable data={ownershipData} />
      </div>

      <div data-index-id="pl-standalone">
        <PLStandaloneTable data={plStandalone} />
        <PLComparisonChart data={plChartData} />
        <BalanceSheetTable data={balanceSheetData} />
        <AssetLiabilityChart data={assetLiabilityData} />

        <div data-index-id="cf-standalone">
          <FinancialTable
            title="Cash Flow Statement (Standalone)"
            data={cashFlowTableData}
          />
        </div>

        <CashFlowComparisonChart data={cashFlowChartData} />

        <div data-index-id="ratio-standalone">
          <RatioAnalysisTable data={ratioAnalysisData} />
        </div>

        <RatioComparisonChart data={ratioChartData} />
      </div>

      {/* ================= Schedules & Disclosures ================= */}
      <div data-index-id="schedules-disclosures">
        <RevenueFromOperationsTable data={revenueData} />
        <FinanceCostTable data={financeCostData} />
        <OtherExpenseTable data={otherExpenseData} />
        <BorrowingsTable data={borrowingsData} />
        <LoansAndAdvancesTable data={loansAndAdvancesData} />
        <TradeReceivablesTable data={tradeReceivablesData} />
        <EquityShareCapitalTable data={equityShareCapitalData} />
        <ContingentLiabilitiesTable data={contingentLiabilitiesData} />
      </div>

      {/* ================= Risk Report ================= */}
      <div data-index-id="risk-report">
        <RiskReportTables
          piotroskiData={piotroskiData}
          traditionalModelsData={traditionalModelsData}
        />
      </div>

      {/* ================= Consolidated Financials ================= */}
      <div data-index-id="financials-consolidated">
        <PLConsolidatedTable data={plConsolidatedData} />
        <PLComparisonChartConsolidated data={plChartConsolidatedData} />
        <BalanceSheetConsolidatedTable data={balanceSheetConsolidated} />
        <AssetLiabilityChartConsolidated data={assetLiabilityConsolidatedData} />
        <CashFlowConsolidatedTable data={cashFlowConsolidatedData} />
        <CashFlowComparisonChartConsolidated data={cashFlowChartConsolidatedData} />
        <RatioAnalysisConsolidatedTable data={ratioAnalysisConsolidated} />
        <RatioRedFlags data={ratioRedFlags} />
        <RatioComparisonCharts data={ratioChartsData} />
      </div>

      {/* ================= Standalone vs Consolidated ================= */}
      <div data-index-id="standalone-vs-consolidated">
        <StandaloneVsConsolidatedPLTable data={plComparisonData} />
        <StandaloneVsConsolidatedCharts data={standaloneVsConsolidatedData} />
        <StandaloneVsConsolidatedBalanceSheetTable data={bsComparisonData} />
        <ComparisonCharts data={comparisonChartsData} />
        <CommonSizePLTable data={commonSizePLData} />
        <CommonSizeBalanceSheetTable data={commonSizeBS} />
      </div>

      {/* ================= Auditor & CARO ================= */}
      <div data-index-id="auditor-caro">
        <AuditorKYCTable data={auditorKYCData} />
        <AuditorQualificationTable data={auditorQualificationData} />
        <CAROReportTable data={caroReportData} />
      </div>

      {/* ================= Group & Related Parties ================= */}
      <div data-index-id="group-related-parties">
        <SubsidiaryFinancialsTable data={subsidiaryFinancials} />
        <RelatedPartyTransactionsTable data={relatedPartyTransactions} />
        <RelatedPartyNotAtArmLengthTable data={relatedPartyNotAtArmLength} />
        <RelatedPartyAtArmLengthTable data={relatedPartyAtArmLength} />
      </div>

      {/* ================= Other Related Companies ================= */}
      <div data-index-id="other-related-companies">
        <RelatedCompaniesByDirectorsTable data={relatedCompaniesByDirectors} />
        <RelatedCompaniesByEmailsTable data={relatedCompaniesByEmails} />
        <RelatedCompaniesByAddressesTable data={relatedCompaniesByAddresses} />
      </div>

      {/* ================= Ratings & Litigation ================= */}
      <div data-index-id="ratings-litigation">
        <CreditRatingsTable data={creditRatingsData} />
        <LitigationTables data={litigationData} />
      </div>

      {/* ================= Compliance ================= */}
      <div data-index-id="compliance-delays">
        <GSTComplianceTable data={gstComplianceData} />
        <MCAComplianceTable data={mcaComplianceData} />
      </div>

      {/* ================= EPF ================= */}
      <div data-index-id="epf-establishment">
        <EstablishmentAndEPFTable data={establishmentAndEPF} />
      </div>

      {/* ================= Charges ================= */}
      <div data-index-id="charge-search">
        <ChargesTables data={chargesData} />
        <ChargesProfileTable data={chargesProfileData} />
        <PersonalGuaranteeTable data={personalGuaranteeData} />
      </div>

      {/* ================= Directors ================= */}
      <div data-index-id="board-directors">
        <BoardMembersKYCTable data={boardMembersData} />
        <CurrentDirectorsTable data={currentDirectorsData} />
        <PastDirectorsTable data={pastDirectorsData} />
        <NewDirectorshipsTable data={newDirectorshipsData} />
      </div>

      {/* ================= Legal ================= */}
      <div data-index-id="legal-information">
        <LegalBriskReport data={fullReportData} />
        <LegalCasesSummaryTable summary={legalSummary} />
        <OpenCasesTable data={openCasesData} />
        <DisposedCasesTable data={disposedCasesData} />
        <UnknownStatusCasesTable data={unknownStatusCasesData} />
      </div>

    </div> {/* ← CLOSING DIV FOR #report-container */}
    
    {/* Download button - outside container so it won't be in PDF */}
{/* <button 
  onClick={handleDownloadPDF}
  disabled={isGeneratingPDF}
  className="no-print"
  style={{
    backgroundColor: isGeneratingPDF ? '#6b7280' : '#0b4ea2',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '6px',
    cursor: isGeneratingPDF ? 'not-allowed' : 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    display: 'block',
    margin: '20px auto',
    transition: 'all 0.3s ease',
    opacity: isGeneratingPDF ? 0.7 : 1,
    boxShadow: isGeneratingPDF ? 'none' : '0 2px 4px rgba(0,0,0,0.1)'
  }}
  onMouseEnter={(e) => {
    if (!isGeneratingPDF) {
      e.target.style.backgroundColor = '#094a92';
      e.target.style.transform = 'translateY(-2px)';
      e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    }
  }}
  onMouseLeave={(e) => {
    if (!isGeneratingPDF) {
      e.target.style.backgroundColor = '#0b4ea2';
      e.target.style.transform = 'translateY(0)';
      e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }
  }}
>
  {isGeneratingPDF ? (
    <>
      <span style={{ marginRight: '8px' }}>⏳</span>
      Generating PDF... (This may take 30-60 seconds)
    </>
  ) : (
    <>
      <span style={{ marginRight: '8px' }}>📥</span>
      Download as PDF
    </>
  )}
</button> */}

  </div>
);
}

export default ReportPage;