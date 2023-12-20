// RegisterSteps.jsx
import { useSteps, Step, StepIndicator, StepStatus, StepIcon, StepNumber, StepSeparator, Stepper, Box, Button, Checkbox } from '@chakra-ui/react';
import React, { ReactNode, useEffect, useState } from 'react';
import StepOne from './step1';
import { motion } from 'framer-motion';
import StepTwo from './step2';
import { useRouter } from 'next/navigation';
import { useDeleteDocuments } from '@/app/hooks/delDoc';

type RegisterStepsProps = {
    children: ReactNode;
};

const RegisterSteps: React.FC<RegisterStepsProps> = ({ children }) => {
    const steps = [
        { title: 'First', description: 'Contact Info' },
        { title: 'Second', description: 'Date & Time' },
        { title: 'Third', description: 'Select Rooms' },
    ];

    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    });
    const [name, setName] = useState('');
    const [id, setId] = useState('');

    const router = useRouter();

    const handleSelectChange = (id, name) => {
        setName(name);
        setId(id);
    };

    const finish = () => {
        setActiveStep(3);
        router.push(
            `/roulette?param=${btoa(name)}`);
    }
    useEffect(() => {
        const { delDoc } = useDeleteDocuments();

        if (name && id && activeStep === 2) {
            delDoc('users', id);
        }
    }, [id, activeStep]);


    return (
        <>
            <Box display="flex justify-between">
                <Stepper index={activeStep} colorScheme='red' orientation="vertical" height="400px" spacing="0">
                    {steps.map((step) => (
                        <Step key={step.title}>
                            <StepIndicator>
                                <StepStatus
                                    complete={<StepIcon />}
                                    incomplete={<StepNumber />}
                                    active={<StepNumber />}
                                />
                            </StepIndicator>
                            <StepSeparator />
                        </Step>
                    ))}
                </Stepper>
                <Box className="ml-2 h-350">
                    {activeStep === 0 ? (
                        <>
                            <StepOne handleSelectChange={handleSelectChange} />
                            {name && <Button className="ml-4 mt-2" colorScheme="green" size="xs" onClick={() => setActiveStep(1)}>
                                Next
                            </Button>}
                        </>
                    ) : activeStep === 1 ? (
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            className="ml-2 top-1/2"
                        >
                            <StepTwo onOkClick={() => setActiveStep(2)} />
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            className="ml-2 bottom-0"
                        >
                            <motion.div
                                transition={{ delay: 2 }}
                            >
                                <Box w="100%" p={4} color="black">
                                    <Checkbox
                                        colorScheme='green'
                                        size="md"
                                        onChange={finish}
                                    >
                                        I'm ready! ✨
                                    </Checkbox>
                                </Box>
                            </motion.div>
                        </motion.div>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default RegisterSteps;
