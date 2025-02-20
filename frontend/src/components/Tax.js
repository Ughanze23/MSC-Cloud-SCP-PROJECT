import React, { useState } from "react";
import { Card, CardContent, CardHeader, Typography, TextField, FormControlLabel, Checkbox, Button, Alert } from "@mui/material";

function Tax() {
  const [amount, setAmount] = useState("");
  const [isLongTerm, setIsLongTerm] = useState(false);
  const [taxAmount, setTaxAmount] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setTaxAmount(null);

    try {
      const response = await fetch("https://zq7vdkq3og.execute-api.us-east-1.amazonaws.com/calculate_tax", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          income_type: "investment",
          amount: parseFloat(amount),
          other_details: { is_long_term: isLongTerm },
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setTaxAmount(data.body.tax_amount);
      } else {
        setError(data.body.error || "An error occurred");
      }
    } catch (err) {
      setError("Failed to fetch tax data");
    }
  };

  return (
    <div style={{ marginTop: '80px' }}>
    <Card sx={{ maxWidth: 400, mx: "auto", p: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardHeader title="Investment Tax Calculator" titleTypographyProps={{ variant: "h6", align: "center" }} />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Investment Amount (€)"
            type="number"
            fullWidth
            margin="normal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <FormControlLabel
            control={<Checkbox checked={isLongTerm} onChange={() => setIsLongTerm(!isLongTerm)} />}
            label="Long-Term Investment"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Calculate Tax</Button>
        </form>
        {taxAmount !== null && <Alert severity="success" sx={{ mt: 2 }}>Estimated Tax: €{taxAmount}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </CardContent>
    </Card>
    </div>
  );
}

export default Tax;
