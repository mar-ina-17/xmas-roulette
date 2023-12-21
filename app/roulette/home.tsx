import { useState, useEffect } from "react";
import RegisterSteps from "../components/register/register-popup";
import { Box, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";

const HomeInit = () => {
    const [text, setText] = useState('');
    const [showAfterAnimation, setShowAfterAnimation] = useState(false);
    const [showRegisterPopup, setShowRegisterPopup] = useState(false);

    const originalText = "🎄 Welcome to the Xmas Roulette! 🎅 Discover your special gift, and make this holiday season even more magical. Let the Christmas spirit guide your luck! Happy Holidays! 🌟";

    useEffect(() => {
        let index = 0;

        const intervalId = setInterval(() => {
            setText(originalText.slice(0, index));
            index++;

            if (index > originalText.length) {
                clearInterval(intervalId);
                setShowAfterAnimation(true);
            }
        }, 10);

        return () => clearInterval(intervalId);
    }, []);

    const openSteps = () => {
        setShowAfterAnimation(false);
        setShowRegisterPopup(true);
    };

    const closeSteps = () => {
        setShowRegisterPopup(false);
    };

    return (
        <Box className="container h-screen flex flex-col items-center justify-center">
            {!showRegisterPopup && (
                <div className="self-writable-text">
                    {text}
                    <span className="cursor">|</span>
                </div>
            )}

            <div className="mt-4">
                {showAfterAnimation && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {!showRegisterPopup && (
                            <Button size='sm' colorScheme='green' onClick={openSteps} style={{ fontSize: '1rem' }}>
                                🎅🏻
                            </Button>
                        )}
                    </motion.div>
                )}
            </div>

            {showRegisterPopup && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <RegisterSteps onClose={closeSteps} children={undefined} />
                </motion.div>
            )}
        </Box>
    );
};

export default HomeInit;
