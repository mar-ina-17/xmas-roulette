"use client";
import { Box, Image, Button } from '@chakra-ui/react';
import React, { useEffect, useState, useRef } from 'react';
import ConfettiGenerator from "confetti-js";
import './style.scss'
import { collection, deleteDoc, getDocs, doc } from 'firebase/firestore';
import { db } from "../../firebase/config";
import { useGetDocuments } from '../hooks/getDoc';
import _ from 'lodash';
import { useDeleteDocuments } from '../hooks/delDoc';
import useAddDocuments from '../hooks/createDoc';
import Snowfall from 'react-snowfall';
const LuckyGenerator = () => {

    const [users, setUsers] = useState([])
    const { getDoc } = useGetDocuments()
    const excludeVladi = (data) => {
        const curr = atob(paramValue)
        if (curr == ('Venci' || 'Viksmena')) {
            return data.filter(item => item['name'] !== 'Vladi');
        }
        return data
    }
    useEffect(() => {
        getDoc('receivers').then((data: any) => {
            const d = data.filter(item => item['name'] !== atob(paramValue));

            setUsers(excludeVladi(d));
        })
    }, []);

    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const paramValue = params.get('param');

    const [result, setResult] = useState(false);
    const generaterandomPerson = () => {
        setWait(true)
        setTimeout(async () => {
            setWait(false)
            const newArray = users.filter(item => item !== atob(paramValue));
            for (let i = newArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            }

            const randomPerson = newArray[0];
            setgeneratedPerson(randomPerson);

            setResult(true);
        }, 4000);
    };


    const [generatedPerson, setgeneratedPerson] = useState('');
    const [waitGeneration, setWait] = useState(false);

    const canvasRef = useRef(null);

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
    const { delDoc } = useDeleteDocuments();
    const { addDocument } = useAddDocuments();

    useEffect(() => {
        if (generatedPerson && generatedPerson['id']) {
            addDocument("gifts", atob(paramValue), generatedPerson['name']);
            delDoc('receivers', generatedPerson['id']);
        }
    }, [generatedPerson]);
    const snowflake1 = document.createElement('img')
    snowflake1.src = '/snow.png'
    const images = [snowflake1]
    return (
        <>
            <Snowfall
                radius={[5, 20.0]}
                images={images}
                wind={[-1, 0.5]}
                speed={[0.5, 1]}
            />
            <Box className="container h-screen flex flex-col items-center justify-center">
                {!waitGeneration && !result && <Button onClick={generaterandomPerson} size="lg" style={{ fontSize: '3rem' }}>🎁</Button>}
                {waitGeneration &&
                    <Image
                        src="/gift.gif"
                        alt="Fruit GIF"
                        boxSize="250px"
                        objectFit="cover"
                    />}
                {result &&
                    <Box position="relative" width="100%" height="100%">
                        <canvas id="my-canvas" ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }} />
                        <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" zIndex={2} textAlign="center">
                            <h1>Congrats, {atob(paramValue)}! You got {generatedPerson['name']}</h1>
                        </Box>
                    </Box>
                }
            </Box></>
    );
};

export default LuckyGenerator;
