import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { fetchProductDetails } from "store/slice/productSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ServerLazyImage from "components/commonComponents/serverImageLazyLoading";
import { toPascalCase } from "utils/pascalCaseConvert";
import { addCustomerOrder } from "store/slice/customerOrderSlice";
import OrderSuccessDialog from "./orderSuccess";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  IconButton,
  Chip,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Add,
  Remove,
  ShoppingBag,
  Person,
  LocationOn,
  LocalPhone,
  PinDrop,
} from "@mui/icons-material";

const CustomerOrder = () => {
  const { productId, productVariantId, productColorId, productName } =
    useParams();
  const [qty, setQty] = useState<number>(1);
  const dispatch = useAppDispatch();
  const [placeOrder, setPlaceOrder] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    pincode: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { orderProduct } = useAppSelector((state) => state?.user?.products);
  const { successMessage, orderSuccessDetails } = useAppSelector(
    (state) => state.user?.customerOrder
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    dispatch(
      fetchProductDetails({ productId, productVariantId, productColorId })
    );
  }, [productId, productVariantId, productColorId, dispatch]);

  const validateFields = () => {
    const newErrors: Record<string, string> = {};

    if (!customerDetails.name.trim()) newErrors.name = "Name is required";
    if (!customerDetails.address.trim())
      newErrors.address = "Address is required";
    if (!customerDetails.pincode.trim())
      newErrors.pincode = "Pincode is required";
    if (!customerDetails.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(customerDetails.phoneNumber)) {
      newErrors.phoneNumber = "Enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitOrder = () => {
    if (!validateFields()) return;
    setPlaceOrder(true);
    const data = {
      name: customerDetails.name.trim(),
      address: customerDetails.address.trim(),
      phoneNumber: customerDetails.phoneNumber.trim(),
      pincode: customerDetails.pincode.trim(),
      phoneName:
        orderProduct?.productName +
        " " +
        orderProduct?.selectedVariant?.ram +
        "/" +
        orderProduct?.selectedVariant?.storage +
        " " +
        orderProduct?.selectedColor?.name,
      price: orderProduct?.selectedVariant?.price,
      productId,
      qty,
      productVariantId,
      productColorId,
    };

    dispatch(addCustomerOrder(data));
  };

  const handleQtyChange = (value: string) => {
    if (/^\d*$/.test(value) && value !== "") {
      const numValue = parseInt(value);
      if (numValue > 0) setQty(numValue);
    }
  };

  // Mobile Layout
  if (isMobile) {
    return (
      <Box sx={{ p: 2 }}>
        {placeOrder && orderSuccessDetails && (
          <OrderSuccessDialog open={true} orderId={orderSuccessDetails?.id} />
        )}

        {orderProduct ? (
          <Stack spacing={3}>
            {/* Product Card - Mobile */}
            <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
              <CardContent sx={{ p: 2 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  fontWeight="bold"
                  color="primary"
                  align="center"
                >
                  Order Summary
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {/* Product Image and Details */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <Box sx={{ width: 80, height: 80, flexShrink: 0 }}>
                    <Box
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        borderRadius: 1,
                      }}
                    >
                      <ServerLazyImage
                        src={orderProduct?.selectedColor?.images[0]?.url}
                        alt="Product Image"
                      />
                    </Box>
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                    >
                      {toPascalCase(orderProduct?.productName)}
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ mb: 1 }}
                      flexWrap="wrap"
                    >
                      <Chip
                        label={`${orderProduct?.selectedVariant?.ram}/${orderProduct?.selectedVariant?.storage}`}
                        size="small"
                        color="primary"
                      />
                      <Chip
                        label={toPascalCase(orderProduct?.selectedColor?.name)}
                        size="small"
                        color="secondary"
                      />
                    </Stack>

                    <Typography
                      variant="h6"
                      color="success.main"
                      fontWeight="bold"
                    >
                      ₹{orderProduct?.selectedVariant?.price}
                    </Typography>
                  </Box>
                </Box>

                {/* Quantity Selector - Mobile */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="body1" fontWeight="medium">
                    Quantity:
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                      onClick={() => qty > 1 && setQty(qty - 1)}
                      sx={{
                        bgcolor: "error.light",
                        color: "white",
                        "&:hover": { bgcolor: "error.main" },
                        width: 28,
                        height: 28,
                      }}
                      size="small"
                    >
                      <Remove fontSize="small" />
                    </IconButton>

                    <TextField
                      value={qty}
                      onChange={(e) => handleQtyChange(e.target.value)}
                      sx={{
                        width: 50,
                        "& .MuiInputBase-input": {
                          textAlign: "center",
                          py: 0.5,
                          fontSize: "0.9rem",
                        },
                      }}
                      size="small"
                      inputProps={{
                        min: 1,
                        style: { textAlign: "center" },
                      }}
                    />

                    <IconButton
                      onClick={() => setQty(qty + 1)}
                      sx={{
                        bgcolor: "success.light",
                        color: "white",
                        "&:hover": { bgcolor: "success.main" },
                        width: 28,
                        height: 28,
                      }}
                      size="small"
                    >
                      <Add fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>

                {/* Total Price - Mobile */}
                <Box
                  sx={{
                    p: 1.5,
                    bgcolor: "grey.50",
                    borderRadius: 1,
                    textAlign: "center",
                  }}
                >
                  <Typography variant="body1" fontWeight="bold">
                    Total: ₹
                    {(orderProduct?.selectedVariant?.price * qty).toFixed(2)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Customer Form - Mobile */}
            <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
              <CardContent sx={{ p: 2 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  fontWeight="bold"
                  color="primary"
                  align="center"
                >
                  Details
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Stack spacing={2}>
                  {/* Name Field */}
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={customerDetails.name}
                    onChange={(e) =>
                      setCustomerDetails({
                        ...customerDetails,
                        name: e.target.value,
                      })
                    }
                    error={!!errors.name}
                    helperText={errors.name}
                    size="small"
                    InputProps={{
                      startAdornment: <Person color="action" sx={{ mr: 1 }} />,
                    }}
                    variant="outlined"
                  />

                  {/* Address Field */}
                  <TextField
                    fullWidth
                    label="Delivery Address"
                    value={customerDetails.address}
                    onChange={(e) =>
                      setCustomerDetails({
                        ...customerDetails,
                        address: e.target.value,
                      })
                    }
                    error={!!errors.address}
                    helperText={errors.address}
                    multiline
                    rows={2}
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <LocationOn
                          color="action"
                          sx={{ mr: 1, mt: 1, alignSelf: "flex-start" }}
                        />
                      ),
                    }}
                    variant="outlined"
                  />

                  {/* Pincode Field */}
                  <TextField
                    fullWidth
                    label="Pincode"
                    value={customerDetails.pincode}
                    onChange={(e) =>
                      setCustomerDetails({
                        ...customerDetails,
                        pincode: e.target.value,
                      })
                    }
                    error={!!errors.pincode}
                    helperText={errors.pincode}
                    size="small"
                    InputProps={{
                      startAdornment: <PinDrop color="action" sx={{ mr: 1 }} />,
                    }}
                    variant="outlined"
                  />

                  {/* Phone Number Field */}
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={customerDetails.phoneNumber}
                    onChange={(e) =>
                      setCustomerDetails({
                        ...customerDetails,
                        phoneNumber: e.target.value,
                      })
                    }
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber}
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <LocalPhone color="action" sx={{ mr: 1 }} />
                      ),
                    }}
                    variant="outlined"
                  />

                  {/* Place Order Button - Mobile */}
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={submitOrder}
                    startIcon={<ShoppingBag />}
                    sx={{
                      py: 1.2,
                      bgcolor: "orange.main",
                      "&:hover": {
                        bgcolor: "orange.dark",
                      },
                      fontSize: "1rem",
                      fontWeight: "bold",
                      mt: 1,
                    }}
                  >
                    Place Order
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <Typography variant="h6" color="text.secondary">
              Loading product details...
            </Typography>
          </Box>
        )}
      </Box>
    );
  }

  // Desktop Layout
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {placeOrder && orderSuccessDetails && (
        <OrderSuccessDialog open={true} orderId={orderSuccessDetails?.id} />
      )}

      {orderProduct ? (
        <Grid container spacing={4}>
          {/* Product Section */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  fontWeight="bold"
                  color="primary"
                >
                  Order Summary
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
                  <Box sx={{ width: 120, height: 120, flexShrink: 0 }}>
                    <Box
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        borderRadius: 1,
                      }}
                    >
                      <ServerLazyImage
                        src={orderProduct?.selectedColor?.images[0]?.url}
                        alt="Product Image"
                      />
                    </Box>
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {toPascalCase(orderProduct?.productName)}
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ mb: 2 }}
                      flexWrap="wrap"
                    >
                      <Chip
                        label={`${orderProduct?.selectedVariant?.ram}/${orderProduct?.selectedVariant?.storage}`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      <Chip
                        label={toPascalCase(orderProduct?.selectedColor?.name)}
                        size="small"
                        color="secondary"
                        variant="outlined"
                      />
                    </Stack>

                    <Typography
                      variant="h5"
                      color="success.main"
                      fontWeight="bold"
                      gutterBottom
                    >
                      ₹{orderProduct?.selectedVariant?.price}
                    </Typography>

                    {/* Quantity Selector */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mt: 2,
                      }}
                    >
                      <Typography variant="body1" fontWeight="medium">
                        Quantity:
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <IconButton
                          onClick={() => qty > 1 && setQty(qty - 1)}
                          sx={{
                            bgcolor: "error.light",
                            color: "white",
                            "&:hover": { bgcolor: "error.main" },
                            width: 32,
                            height: 32,
                          }}
                          size="small"
                        >
                          <Remove />
                        </IconButton>

                        <TextField
                          value={qty}
                          onChange={(e) => handleQtyChange(e.target.value)}
                          sx={{
                            width: 60,
                            "& .MuiInputBase-input": {
                              textAlign: "center",
                              py: 0.5,
                            },
                          }}
                          size="small"
                          inputProps={{
                            min: 1,
                            style: { textAlign: "center" },
                          }}
                        />

                        <IconButton
                          onClick={() => setQty(qty + 1)}
                          sx={{
                            bgcolor: "success.light",
                            color: "white",
                            "&:hover": { bgcolor: "success.main" },
                            width: 32,
                            height: 32,
                          }}
                          size="small"
                        >
                          <Add />
                        </IconButton>
                      </Box>
                    </Box>

                    {/* Total Price */}
                    <Box
                      sx={{ mt: 2, p: 2, bgcolor: "grey.50", borderRadius: 1 }}
                    >
                      <Typography variant="body1" fontWeight="bold">
                        Total: ₹
                        {(orderProduct?.selectedVariant?.price * qty).toFixed(
                          2
                        )}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Customer Form Section */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  fontWeight="bold"
                  color="primary"
                >
                  <Person sx={{ mr: 1, verticalAlign: "middle" }} />
                  Details
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Stack spacing={3}>
                  {/* Name Field */}
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={customerDetails.name}
                    onChange={(e) =>
                      setCustomerDetails({
                        ...customerDetails,
                        name: e.target.value,
                      })
                    }
                    error={!!errors.name}
                    helperText={errors.name}
                    InputProps={{
                      startAdornment: <Person color="action" sx={{ mr: 1 }} />,
                    }}
                    variant="outlined"
                  />

                  {/* Address Field */}
                  <TextField
                    fullWidth
                    label="Delivery Address"
                    value={customerDetails.address}
                    onChange={(e) =>
                      setCustomerDetails({
                        ...customerDetails,
                        address: e.target.value,
                      })
                    }
                    error={!!errors.address}
                    helperText={errors.address}
                    multiline
                    rows={3}
                    InputProps={{
                      startAdornment: (
                        <LocationOn
                          color="action"
                          sx={{ mr: 1, mt: 1, alignSelf: "flex-start" }}
                        />
                      ),
                    }}
                    variant="outlined"
                  />

                  {/* Pincode Field */}
                  <TextField
                    fullWidth
                    label="Pincode"
                    value={customerDetails.pincode}
                    onChange={(e) =>
                      setCustomerDetails({
                        ...customerDetails,
                        pincode: e.target.value,
                      })
                    }
                    error={!!errors.pincode}
                    helperText={errors.pincode}
                    InputProps={{
                      startAdornment: <PinDrop color="action" sx={{ mr: 1 }} />,
                    }}
                    variant="outlined"
                  />

                  {/* Phone Number Field */}
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={customerDetails.phoneNumber}
                    onChange={(e) =>
                      setCustomerDetails({
                        ...customerDetails,
                        phoneNumber: e.target.value,
                      })
                    }
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber}
                    InputProps={{
                      startAdornment: (
                        <LocalPhone color="action" sx={{ mr: 1 }} />
                      ),
                    }}
                    variant="outlined"
                  />

                  {/* Place Order Button */}
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={submitOrder}
                    startIcon={<ShoppingBag />}
                    sx={{
                      py: 1.5,
                      bgcolor: "orange.main",
                      "&:hover": {
                        bgcolor: "orange.dark",
                      },
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                    }}
                  >
                    Place Order
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <Typography variant="h6" color="text.secondary">
            Loading product details...
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default CustomerOrder;
