import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PersonalDetail from "./PersonalDetail";
import AddressDetail from "./AddressDetail";
import PaymentDetail from "./PaymentDetail";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personalDetails: {},
    addressDetails: {},
    paymentDetails: {},
  });

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const handleFormData = (stepData, stepName) => {
    setFormData({ ...formData, [stepName]: stepData });
    nextStep();
  };

  // Framer Motion variants for outer div animation
  const outerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  // Framer Motion variants for form step transitions
  const stepVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <div className="flex justify-center w-full h-screen items-center bg-gradient-to-br from-blue-200 to-purple-400">
      <AnimatePresence mode="wait">
        {/* Animate the outer container */}
        <motion.div
          key={step} // This ensures the outer div is re-animated with each step change
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={outerVariants}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg"
        >
          <AnimatePresence mode="wait">
            {/* Step 1 */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={stepVariants}
                transition={{ duration: 0.5 }}
              >
                <PersonalDetail next={handleFormData} />
              </motion.div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={stepVariants}
                transition={{ duration: 0.5 }}
              >
                <AddressDetail next={handleFormData} prev={prevStep} />
              </motion.div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={stepVariants}
                transition={{ duration: 0.5 }}
              >
                <PaymentDetail next={handleFormData} prev={prevStep} />
              </motion.div>
            )}

            {/* Submission Confirmation */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={stepVariants}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h2 className="text-2xl font-semibold text-gray-800">
                  Form Submitted!
                </h2>
                <pre className="text-sm text-gray-600 mt-4 bg-gray-100 p-4 rounded-lg shadow-inner">
                  {JSON.stringify(formData, null, 2)}
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MultiStepForm;
