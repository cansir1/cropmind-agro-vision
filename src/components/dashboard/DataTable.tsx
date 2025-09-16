import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface DataTableProps {
  data: Array<{
    timestamp: string;
    moisture: number;
    temp: number;
    humidity: number;
    ndvi: number;
  }>;
}

const DataTable = ({ data }: DataTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>Soil Moisture (%)</TableHead>
            <TableHead>Temperature (°C)</TableHead>
            <TableHead>Humidity (%)</TableHead>
            <TableHead>NDVI</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="font-mono text-sm">{row.timestamp}</TableCell>
              <TableCell>{row.moisture}%</TableCell>
              <TableCell>{row.temp}°C</TableCell>
              <TableCell>{row.humidity}%</TableCell>
              <TableCell>{row.ndvi}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;