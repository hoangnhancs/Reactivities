import { Box, Button, Step, StepLabel, Stepper } from '@mui/material'
import { motion } from "framer-motion";
import { useState } from 'react';

export default function UpLoadPhotoStep() {
    const [activeStep, setActiveStep] = useState(0);
    const steps = ["Step 1", "Step 2", "Step 3"];
  return (
    <Box>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "40px" }}>
            {/* Stepper MUI */}
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <StepLabel>{label}</StepLabel>
                        </motion.div>
                    </Step>
                ))}
            </Stepper>

            {/* Nút chuyển bước */}
            <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "20px" }}
                onClick={() => setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))}
            >
                {activeStep === steps.length - 1 ? "Done" : "Next"}
            </Button>
        </div>
    </Box>
  )
}
