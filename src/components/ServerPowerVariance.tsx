import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

interface propTypes {
    value: number,
    setValue: (val: number) => void,
    algorithm: string;
}

const marks = [
    {
        value: 1,
        label: '1',
    },

    {
        value: 4,
        label: '4',
    },
];

function valuetext(value: number) {
    return `${value} servers`;
}

export default function ServerPowerVariance({ value, setValue, algorithm }: propTypes) {

    const active = (algorithm === "Weighted Round Robin");

    function handleChange(_event: Event, newValue: number | number[]) {
        setValue(newValue as number);
    }


    return (
        <div className='flex space-x-4 mt-10'>
            <p className={`font-semibold ${!active ? "text-zinc-400" : ""}`}>
                Server Power Variance:
            </p>
            <Box sx={{ width: 200 }}>
                <Slider
                    disabled={!active}
                    value={value}
                    onChange={handleChange}
                    aria-label="Always visible"
                    defaultValue={2}
                    min={1}
                    max={4}
                    getAriaValueText={valuetext}
                    step={1}
                    marks={marks}
                    valueLabelDisplay="on"
                />
            </Box>
        </div >
    );
}
