import React, { FC } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Grid,
  Divider,
  Chip,
  Paper,
  Stack,
} from "@mui/material";

interface props {
  entities: any;
}
const OrderCard: FC<props> = ({ entities }) => {
  return (
    <Card sx={{ maxWidth: "100%", margin: "16px", boxShadow: 3 }}>
      <CardHeader
        title="Phone Orders"
        titleTypographyProps={{
          variant: "h5",
          align: "center",
          fontWeight: "bold",
        }}
        sx={{ backgroundColor: "primary.main", color: "white", py: 1.5 }}
      />
      <CardContent sx={{ p: 0 }}>
        {/* Entity List - Mobile Layout */}
        <Stack spacing={2} sx={{ p: 2 }}>
          {entities.map((entity: any, index: number) => (
            <Box key={entity.id}>
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                {/* Customer Name - Top Section */}
                <Box sx={{ textAlign: "center", mb: 2 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Customer
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {entity.name}
                  </Typography>
                </Box>

                <Grid container spacing={2}>
                  {/* Phone Name - Full width to show complete text */}
                  <Grid item xs={12} sx={{ mb: 1 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Phone Model
                    </Typography>
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: 1,
                        backgroundColor: "primary.light",
                        color: "white",
                        textAlign: "center",
                        fontWeight: "medium",
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                      }}
                    >
                      {entity.phoneName}
                    </Box>
                  </Grid>

                  {/* Quantity */}
                  <Grid item xs={4}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Qty
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        backgroundColor: "primary.main",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                        margin: "0 auto",
                      }}
                    >
                      {entity.qty}
                    </Box>
                  </Grid>

                  {/* Price */}
                  <Grid item xs={4}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Price
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight="medium"
                      align="center"
                    >
                      ₹{entity.price}
                    </Typography>
                  </Grid>

                  {/* Total */}
                  <Grid item xs={4}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Total
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="success.main"
                      align="center"
                    >
                      ₹{entity.price * entity.qty}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>

              {/* Divider between items */}
              {index < entities.length - 1 && <Divider sx={{ my: 1 }} />}
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
