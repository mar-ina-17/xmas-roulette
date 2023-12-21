import { Box, Image, Button } from '@chakra-ui/react';
import React, { useEffect, useState, useRef } from 'react';
import ConfettiGenerator from 'confetti-js';
import './style.scss';
import { useGetDocuments } from '../hooks/getDoc';
import { useDeleteDocuments } from '../hooks/delDoc';
import useAddDocuments from '../hooks/createDoc';
import Snowfall from 'react-snowfall';
import _ from 'lodash';

interface Person { id: string, name?: string };

const LuckyGenerator = () => {
    const [users, setUsers] = useState([] as Person[]);
    const [result, setResult] = useState(false);
    const [generatedPerson, setGeneratedPerson] = useState({} as Person);
    const [waitGeneration, setWait] = useState(false);
    const canvasRef = useRef(null);
    const { getDoc } = useGetDocuments();
    const { delDoc } = useDeleteDocuments();
    const { addDocument } = useAddDocuments();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getDoc('receivers');
            const d = data.filter((item: Person) => item['name'] !== atob(paramValue));
            setUsers(d);
        };

        fetchData();
    }, []);

    const generaterandomPerson = async () => {
        setWait(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 4000));

            setWait(false);
            const newArray = _.shuffle(users.filter((item) => item.name !== atob(paramValue)));
            const randomPerson = newArray[0];

            setGeneratedPerson(randomPerson);
            setResult(true);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (canvasRef.current && result) {
            const confettiSettings = { target: 'my-canvas' };
            const confetti = new ConfettiGenerator(confettiSettings);
            confetti.render();

            return () => {
                if (confetti) {
                    confetti.clear();
                }
            };
        }
    }, [result, canvasRef.current]);

    useEffect(() => {
        if (generatedPerson && generatedPerson['id']) {
            addDocument('gifts', atob(paramValue), generatedPerson['name']);
            delDoc('receivers', generatedPerson['id']);
        }
    }, [generatedPerson]);

    let snowflake1;
    let images;

    if (typeof window !== 'undefined') {
        snowflake1 = document.createElement('img');
        snowflake1.src = '/snow.png';
        images = [snowflake1];
    }

    let paramValue = '' as any;
    if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        paramValue = params.get('param');
    }

    return (
        <>
            <Snowfall
                radius={[5, 20.0]}
                images={images}
                wind={[-1, 0.5]}
                speed={[0.5, 1]}
            />
            <Box className="container h-screen flex flex-col items-center justify-center">
                {!waitGeneration && !result && (
                    <Button onClick={generaterandomPerson} size="lg" style={{ fontSize: '3rem' }}>
                        🎁
                    </Button>
                )}
                {waitGeneration && (
                    <Image
                        src="/gift.gif"
                        alt="Fruit GIF"
                        boxSize="250px"
                        objectFit="cover"
                    />
                )}
                {result && (
                    <Box position="relative" width="100%" height="100%">
                        <canvas id="my-canvas" ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }} />
                        <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" zIndex={2} textAlign="center">
                            <h1>Congrats, {atob(paramValue)}! You got {generatedPerson['name']}</h1>
                        </Box>
                    </Box>
                )}
            </Box>
        </>
    );
};

export default LuckyGenerator;
