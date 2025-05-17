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
        value: 30,
        label: '30',
    },
];

function valueText(value: number) {
    return `${value} req/s`;
}

export default function RPSSelector({ value, setValue }: propTypes) {

    function handleChange(_event: Event, newValue: number | number[]) {
        setValue(newValue as number);
    }

    return (
        <div className='flex space-x-4 mt-10'>
            <p className='font-semibold'>Rate per second: </p>
            <Box sx={{ width: 250 }}>
                <Slider
                    value={value}
                    onChange={handleChange}
                    aria-label="Always visible"
                    defaultValue={6}
                    min={1}
                    max={30}
                    getAriaValueText={valueText}
                    step={1}
                    marks={marks}
                    valueLabelDisplay="on"
                />
            </Box>
        </div>
    );
}
