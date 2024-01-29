import PulseLoader from "react-spinners/PulseLoader";

const overrides = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

export default function Spinner({ size, color }) {

    return (

        <div className="sweet-loading w-fit mx-auto text-center">
            <PulseLoader size={size} color={color} />
        </div>
    );
}

