import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  Pagination,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getBookingDetails } from "../Api/Functions/ViewBookings.api";
import { useQuery } from "@tanstack/react-query";
import jsPDF from "jspdf";
// import "jspdf-autotable";
import autoTable from "jspdf-autotable";

const ViewBookings = () => {
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const {
    isLoading: bookingLoading,
    isError: bookingError,
    data: bookingData,
  } = useQuery({
    queryKey: ["booking_details", userId],
    queryFn: () => getBookingDetails(userId),
    retry: false,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const exportToCSV = () => {
    if (!bookingData?.bookings?.length) return;

    const headers = [
      "Booking ID",
      "Service",
      "Category",
      "Preferred Date",
      "Time Slot",
      "Booking Date",
      "Expected Completion",
      "Description",
    ].join(",");

    const csvRows = bookingData.bookings.map((booking) => {
      const row = [
        booking.bookingId,
        `"${booking.service.name.replace(/_/g, " ")}"`,
        `"${booking.serviceCategory.name.replace(/_/g, " ")}"`,
        formatDate(booking.preferredDate),
        booking.preferredTimeSlot,
        formatDate(booking.bookingDate),
        formatDate(booking.completionDate),
        `"${booking.description?.replace(/"/g, '""') || ""}"`,
      ];
      return row.join(",");
    });

    const csvContent = [headers, ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `bookings_export_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // const exportToPDF = () => {
  //   if (!bookingData?.bookings?.length) return;

  //   const doc = new jsPDF();
  //   doc.setFontSize(16);
  //   doc.text("Booking Details", 14, 15);
  //   doc.setFontSize(10);
  //   doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 25);

  //   const tableData = bookingData.bookings.map((booking) => [
  //     booking.bookingId,
  //     booking.service.name.replace(/_/g, " "),
  //     booking.serviceCategory.name.replace(/_/g, " "),
  //     formatDate(booking.preferredDate),
  //     booking.preferredTimeSlot,
  //     formatDate(booking.bookingDate),
  //     booking.description || "",
  //   ]);

  //   doc.autoTable({
  //     startY: 30,
  //     head: [
  //       [
  //         "Booking ID",
  //         "Service",
  //         "Category",
  //         "Preferred Date",
  //         "Time Slot",
  //         "Booking Date",
  //         "Description",
  //       ],
  //     ],
  //     body: tableData,
  //     theme: "striped",
  //     headStyles: { fillColor: [25, 118, 210], textColor: 255 },
  //     styles: { fontSize: 8, cellPadding: 1 },
  //     columnStyles: {
  //       0: { cellWidth: 25 },
  //       6: { cellWidth: 40 },
  //     },
  //   });

  //   doc.save(`bookings_export_${new Date().toISOString().split("T")[0]}.pdf`);
  // };
const exportToPDF = () => {
  if (!bookingData?.bookings?.length) return;

  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Booking Details", 14, 15);
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 25);

  const tableData = bookingData.bookings.map((booking) => [
    booking.bookingId,
    booking.service.name.replace(/_/g, " "),
    booking.serviceCategory.name.replace(/_/g, " "),
    formatDate(booking.preferredDate),
    booking.preferredTimeSlot,
    formatDate(booking.bookingDate),
    booking.description || "",
  ]);

  autoTable(doc, {
    startY: 30,
    head: [
      [
        "Booking ID",
        "Service",
        "Category",
        "Preferred Date",
        "Time Slot",
        "Booking Date",
        "Description",
      ],
    ],
    body: tableData,
    theme: "striped",
    headStyles: { fillColor: [25, 118, 210], textColor: 255 },
    styles: { fontSize: 8, cellPadding: 1 },
    columnStyles: {
      0: { cellWidth: 25 },
      6: { cellWidth: 40 },
    },
  });

  doc.save(`bookings_export_${new Date().toISOString().split("T")[0]}.pdf`);
};

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    const bookingsHTML = bookingData.bookings
      .map(
        (booking) => `
      <div style="margin-bottom: 20px; border-bottom: 1px solid #ccc; padding-bottom: 20px;">
        <h3>${booking.service.name.replace(/_/g, " ")}</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div>
            <h4>Service Details</h4>
            <p><strong>Category:</strong> ${booking.serviceCategory.name.replace(
              /_/g,
              " "
            )}</p>
            <p><strong>Description:</strong></p>
            <div>${booking.service.description}</div>
          </div>
          <div>
            <h4>Booking Information</h4>
            <p><strong>Booking ID:</strong> ${booking.bookingId}</p>
            <p><strong>Preferred Date:</strong> ${formatDate(
              booking.preferredDate
            )}</p>
            <p><strong>Time Slot:</strong> ${booking.preferredTimeSlot}</p>
            <p><strong>Booking Date:</strong> ${formatDate(
              booking.bookingDate
            )}</p>
            <p><strong>Expected Completion:</strong> ${formatDate(
              booking.completionDate
            )}</p>
          </div>
        </div>
        <div>
          <h4>Additional Notes</h4>
          <p>${booking.description || "No additional notes"}</p>
        </div>
      </div>
    `
      )
      .join("");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Booking Details</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #1976d2; }
            h3 { color: #2c3e50; margin-bottom: 10px; }
            h4 { color: #34495e; margin-bottom: 8px; }
            p { margin: 5px 0; }
            @media print {
              body { padding: 0; }
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <h1>Booking Details</h1>
          <p><strong>Generated on:</strong> ${new Date().toLocaleDateString()}</p>
          <hr />
          ${bookingsHTML}
          <button onclick="window.print()">Print</button>
        </body>
      </html>
    `);
  };

  if (bookingLoading) {
    return (
      <Container sx={{ py: 5, textAlign: "center" }}>
        <CircularProgress color="primary" />
      </Container>
    );
  }

  if (bookingError) {
    return (
      <Container sx={{ py: 5 }}>
        <Alert severity="error">Error loading booking details. Please try again later.</Alert>
      </Container>
    );
  }

  if (!bookingData?.bookings?.length) {
    return (
      <Container sx={{ py: 5 }}>
        <Alert severity="info">No booking details found.</Alert>
      </Container>
    );
  }

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookingData.bookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );
  const totalPages = Math.ceil(bookingData.bookings.length / bookingsPerPage);

  return (
    <Container sx={{ py: 5 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap",
          gap: 1,
         
        }}
      >
        <Typography variant="h5" color="primary">
          My Bookings
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" size="small" onClick={exportToCSV}>
            Export CSV
          </Button>
          <Button variant="outlined" size="small" onClick={exportToPDF}>
            Export PDF
          </Button>
          <Button variant="outlined" size="small" onClick={handlePrint}>
            Print
          </Button>
          <Chip
            label={`Total Bookings: ${bookingData.totalBookings}`}
            color="primary"
            variant="outlined"
          />
        </Stack>
      </Box>

      {currentBookings.map((booking, index) => (
        <Accordion key={booking._id} defaultExpanded={index === 0} sx={{ backgroundColor:'whitesmoke' ,marginBottom:'15px'}} >
          <AccordionSummary expandIcon={<ExpandMoreIcon />} >
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {booking.service.name.replace(/_/g, " ")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(booking.preferredDate)}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{backgroundColor:'lightblue'}}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} sx={{width:'100%'}}>
                <Card variant="outlined" sx={{width:'100%'}}>
                  <CardContent >
                    <Typography variant="h6" gutterBottom >
                      Service Details
                    </Typography>
                    <Typography>
                      <strong>Category:</strong>{" "}
                      {booking.serviceCategory.name.replace(/_/g, " ")}
                    </Typography>
                    <Typography sx={{ mt: 1 }}>
                      <strong>Description:</strong>
                    </Typography>
                    <Box
                      sx={{ mt: 1 }}
                      dangerouslySetInnerHTML={{
                        __html: booking.service.description,
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6} sx={{width:'100%'}}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Booking Information
                    </Typography>
                    <Typography>
                      <strong>Booking ID:</strong> {booking.bookingId}
                    </Typography>
                    <Typography>
                      <strong>Preferred Date:</strong>{" "}
                      {formatDate(booking.preferredDate)}
                    </Typography>
                    <Typography>
                      <strong>Time Slot:</strong>{" "}
                      <span style={{ textTransform: "capitalize" }}>
                        {booking.preferredTimeSlot}
                      </span>
                    </Typography>
                    <Typography>
                      <strong>Booking Date:</strong>{" "}
                      {formatDate(booking.bookingDate)}
                    </Typography>
                    <Typography>
                      <strong>Expected Completion:</strong>{" "}
                      {formatDate(booking.completionDate)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sx={{width:'100%',backgroundColor:'yellow'}}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Additional Notes
                    </Typography>
                    <Typography>
                      {booking.description || "No additional notes"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}

      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
};

export default ViewBookings;
