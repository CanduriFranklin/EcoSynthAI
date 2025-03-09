import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

declare module 'file-saver';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Export Data Functions
export async function exportToPDF(data: any, title: string) {
  const pdf = new jsPDF();
  const tableColumns = Object.keys(data[0]);
  const tableRows = data.map((item: any) => Object.values(item));

  pdf.setFontSize(16);
  pdf.text(title, 14, 15);
  pdf.setFontSize(10);
  pdf.text(`Generated on: ${new Date().toLocaleString('en-GB')}`, 14, 25);

  (pdf as any).autoTable({
    head: [tableColumns],
    body: tableRows,
    startY: 30,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [41, 128, 185] },
  });

  pdf.save(`${title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`);
}

export async function exportToExcel(data: any, title: string) {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, title);
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(dataBlob, `${title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.xlsx`);
}

// Function to format date in UK format
export function formatUKDate(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

// Function to format temperature in Celsius
export function formatTemperature(temp: number): string {
  return `${temp.toFixed(1)}°C`;
}

// Generate legends for environmental metrics
export function generateMetricLegend(value: number, type: string): string {
  switch (type) {
    case 'temperature':
      return value > 25 ? 'High' : value < 15 ? 'Low' : 'Normal';
    case 'humidity':
      return value > 70 ? 'High' : value < 30 ? 'Low' : 'Optimal';
    case 'airQuality':
      return value > 80 ? 'Good' : value > 50 ? 'Moderate' : 'Poor';
    case 'sustainability':
      return value > 80 ? 'Excellent' : value > 60 ? 'Good' : value > 40 ? 'Fair' : 'Poor';
    default:
      return 'N/A';
  }
}