import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";

const dummyData = [
  { id: 1, name: 'The Menstrual Cycle', duration: '30 minutes', status: 'Completed' },
  { id: 2, name: 'Understanding PMS', duration: '45 minutes', status: 'In Progress' },
  { id: 3, name: 'Managing Menstrual Pain', duration: '20 minutes', status: 'Not Started' },
  { id: 4, name: 'Healthy Practices', duration: '35 minutes', status: 'Completed' },
  { id: 5, name: 'Menstrual Health Myths', duration: '40 minutes', status: 'Completed' },
];

const Chapter_Progress = () => {
  return (
    <div className=' max-w-4xl mx-auto p-4'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>Chapter Name</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dummyData.map((chapter, index) => (
            <TableRow key={chapter.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{chapter.name}</TableCell>
              <TableCell>{chapter.duration}</TableCell>
              <TableCell className="text-right">{chapter.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Chapter_Progress;
