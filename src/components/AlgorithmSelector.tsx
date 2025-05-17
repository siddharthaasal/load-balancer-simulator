import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';

interface propTypes {
    value: string,
    setValue: (val: string) => void;
}

export default function AlgorithmSelector({ value, setValue }: propTypes) {

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value as string);
    };

    return (
        <>
            <Box sx={{ minWidth: 120, maxWidth: 360 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Algorithm</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={value}
                        label="Algorithm"
                        onChange={handleChange}
                        defaultValue="Round Robin"
                    >
                        <MenuItem value={"Round Robin"}>Round Robin</MenuItem>
                        <MenuItem value={"Least Connections"}>Least Connections</MenuItem>
                        <MenuItem value={"Random"}>Random</MenuItem>
                        <MenuItem value={"Weighted Round Robin"}>Weighted Round Robin</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* <button onClick={() => { console.log(algorithm) }}>log</button> */}
        </>

    );
}
