import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const Stats = () => {
  const [excelData, setExcelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadExcelData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/files/διαγραμμα 1 (1).xlsx');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        
        // Get the first sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        setExcelData(jsonData);
      } catch (err) {
        console.error('Error loading Excel file:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadExcelData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading Excel data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-red-600">Error Loading Data</CardTitle>
            <CardDescription>
              Unable to load the Excel file. Please make sure the file exists at:
              <code className="block mt-2 p-2 bg-gray-100 rounded text-sm">
                /files/διαγραμμα 1 (1).xlsx
              </code>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">Error details: {error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="w-full"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!excelData || excelData.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>No Data Found</CardTitle>
            <CardDescription>
              The Excel file appears to be empty or could not be parsed.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // Get headers (first row) and data (remaining rows)
  const headers = excelData[0] || [];
  const dataRows = excelData.slice(1) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Statistics Dashboard</h1>
        <p className="text-gray-600">
          Data from: διαγραμμα 1 (1).xlsx
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dataRows.length}</div>
            <p className="text-xs text-muted-foreground">
              Data entries in the file
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Columns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{headers.length}</div>
            <p className="text-xs text-muted-foreground">
              Data fields available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">File Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Loaded</div>
            <p className="text-xs text-muted-foreground">
              Excel file successfully processed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Excel Data</CardTitle>
          <CardDescription>
            Displaying {dataRows.length} rows of data from the Excel file
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {headers.map((header, index) => (
                    <TableHead key={index} className="font-semibold">
                      {header || `Column ${index + 1}`}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataRows.slice(0, 20).map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {headers.map((header, colIndex) => (
                      <TableCell key={colIndex}>
                        {row[colIndex] || '-'}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {dataRows.length > 20 && (
              <div className="mt-4 text-center text-sm text-gray-600">
                Showing first 20 rows of {dataRows.length} total rows
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Raw Data JSON (for debugging) */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Raw Data Structure</CardTitle>
          <CardDescription>
            JSON representation of the Excel data structure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-xs">
            {JSON.stringify({ headers, rowCount: dataRows.length, sampleData: dataRows.slice(0, 3) }, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
};

export default Stats; 