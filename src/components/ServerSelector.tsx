import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

interface propTypes {
    value: number,
    setValue: (val: number) => void;
}

const marks = [
    {
        value: 1,
        label: '1',
    },

    {
        value: 10,
        label: '10',
    },
];

function valuetext(value: number) {
    return `${value} servers`;
}

export default function ServerSelector({ value, setValue }: propTypes) {

    function handleChange(_event: Event, newValue: number | number[]) {
        setValue(newValue as number);
    }


    return (
        <div className='flex space-x-4 mt-10'>
            <p className='font-semibold'>Servers: </p>
            <Box sx={{ width: 250 }}>
                <Slider
                    value={value}
                    onChange={handleChange}
                    aria-label="Always visible"
                    defaultValue={3}
                    min={1}
                    max={10}
                    getAriaValueText={valuetext}
                    step={1}
                    marks={marks}
                    valueLabelDisplay="on"
                />
            </Box>
        </div>
    );
}
