import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import api from '../services/api';
import { Download, FileText, Table } from 'lucide-react';
import jsPDF from 'jspdf';
import * as ExcelJS from 'exceljs';
import toast from 'react-hot-toast';

const Summary = () => {
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummaryData();
  }, []);

  const fetchSummaryData = async () => {
    try {
      const response = await api.get('/summary');
      setSummaryData(response.data);
    } catch (error) {
      console.error('Error fetching summary data:', error);
      toast.error('Failed to load summary data');
    } finally {
      setLoading(false);
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.text('ESG Summary Report', 20, 20);
    
    // Date
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
    
    let yPosition = 50;
    
    if (summaryData && summaryData.yearlyData) {
      // Yearly Data
      doc.setFontSize(16);
      doc.text('Yearly ESG Metrics', 20, yPosition);
      yPosition += 20;
      
      summaryData.yearlyData.forEach((yearData, index) => {
        doc.setFontSize(14);
        doc.text(`Year: ${yearData.year}`, 20, yPosition);
        yPosition += 10;
        
        doc.setFontSize(10);
        doc.text(`Carbon Intensity: ${yearData.carbonIntensity} T CO₂e / INR`, 30, yPosition);
        yPosition += 8;
        doc.text(`Renewable Ratio: ${yearData.renewableRatio}%`, 30, yPosition);
        yPosition += 8;
        doc.text(`Diversity Ratio: ${yearData.diversityRatio}%`, 30, yPosition);
        yPosition += 8;
        doc.text(`Community Spend Ratio: ${yearData.communitySpendRatio}%`, 30, yPosition);
        yPosition += 15;
        
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }
      });
    }
    
    doc.save('esg-summary-report.pdf');
    toast.success('PDF report downloaded successfully!');
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('ESG Summary');
    
    // Headers
    worksheet.addRow(['Year', 'Carbon Intensity (T CO₂e / INR)', 'Renewable Ratio (%)', 'Diversity Ratio (%)', 'Community Spend Ratio (%)']);
    
    // Data
    if (summaryData && summaryData.yearlyData) {
      summaryData.yearlyData.forEach(yearData => {
        worksheet.addRow([
          yearData.year,
          yearData.carbonIntensity,
          yearData.renewableRatio,
          yearData.diversityRatio,
          yearData.communitySpendRatio
        ]);
      });
    }
    
    // Style headers
    worksheet.getRow(1).font = { bold: true };
    worksheet.columns.forEach(column => {
      column.width = 20;
    });
    
    // Generate buffer and download
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'esg-summary-report.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast.success('Excel report downloaded successfully!');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const COLORS = ['#0ea5e9', '#22c55e', '#f59e0b', '#ef4444'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ESG Summary & Reports</h1>
            <p className="text-gray-600 mt-1">
              Analyze your ESG performance and download comprehensive reports
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={exportToPDF}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <FileText className="h-4 w-4" />
              <span>Export PDF</span>
            </button>
            <button
              onClick={exportToExcel}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <Table className="h-4 w-4" />
              <span>Export Excel</span>
            </button>
          </div>
        </div>
      </div>

      {!summaryData || !summaryData.yearlyData || summaryData.yearlyData.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 border border-gray-200 text-center">
          <div className="text-gray-400 mb-4">
            <BarChart className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Data Available</h3>
          <p className="text-gray-600">
            Complete the ESG questionnaire to see your performance summary and charts.
          </p>
        </div>
      ) : (
        <>
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {summaryData.yearlyData[0] && (
              <>
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500">Carbon Intensity</h3>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {summaryData.yearlyData[0].carbonIntensity}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">T CO₂e / INR</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500">Renewable Electricity</h3>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {summaryData.yearlyData[0].renewableRatio}%
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Of total consumption</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500">Diversity Ratio</h3>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {summaryData.yearlyData[0].diversityRatio}%
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Female employees</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500">Community Investment</h3>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {summaryData.yearlyData[0].communitySpendRatio}%
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Of total revenue</p>
                </div>
              </>
            )}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bar Chart */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ESG Metrics Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={summaryData.yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="renewableRatio" fill="#22c55e" name="Renewable Ratio %" />
                  <Bar dataKey="diversityRatio" fill="#0ea5e9" name="Diversity Ratio %" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest Year Breakdown</h3>
              {summaryData.yearlyData[0] && (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Renewable Ratio', value: parseFloat(summaryData.yearlyData[0].renewableRatio) },
                        { name: 'Diversity Ratio', value: parseFloat(summaryData.yearlyData[0].diversityRatio) },
                        { name: 'Community Spend Ratio', value: parseFloat(summaryData.yearlyData[0].communitySpendRatio) * 100 },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {summaryData.yearlyData[0] && [
                        { name: 'Renewable Ratio', value: parseFloat(summaryData.yearlyData[0].renewableRatio) },
                        { name: 'Diversity Ratio', value: parseFloat(summaryData.yearlyData[0].diversityRatio) },
                        { name: 'Community Spend Ratio', value: parseFloat(summaryData.yearlyData[0].communitySpendRatio) * 100 },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Historical Data</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Year
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Carbon Intensity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Renewable Ratio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Diversity Ratio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Community Spend
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {summaryData.yearlyData.map((yearData, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {yearData.year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {yearData.carbonIntensity} T CO₂e / INR
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {yearData.renewableRatio}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {yearData.diversityRatio}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {yearData.communitySpendRatio}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Summary;
