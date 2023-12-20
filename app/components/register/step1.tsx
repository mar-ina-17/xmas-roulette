// StepOne.jsx
import { useGetDocuments } from '@/app/hooks/getDoc';
import { Box, Select } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';

type StepOneProps = {
    handleSelectChange: (id: string, name: string) => void;
};

const StepOne: React.FC<StepOneProps> = ({ handleSelectChange }) => {
    const [users, setUsers] = useState([]);
    const { getDoc } = useGetDocuments();
    const sortedPeople = _.sortBy(users, 'name');

    useEffect(() => {
        getDoc('users').then((data: any) => setUsers(data));
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        const selectedPerson = sortedPeople.find(person => person['id'] === selectedId);

        if (selectedPerson) {
            handleSelectChange(selectedPerson['id'], selectedPerson['name']);
        }
    };

    return (
        <Box w="100%" p={4} color="black">
            Who are you?
            <Select
                placeholder="Select option"
                size="sm"
                variant="flushed"
                onChange={handleChange}
                style={{ width: "200px" }}
            >
                {sortedPeople.map((person, index) => (
                    <option key={index} value={person['id']}>
                        {person['name']}
                    </option>
                ))}
            </Select>
        </Box>
    );
};

export default StepOne;
