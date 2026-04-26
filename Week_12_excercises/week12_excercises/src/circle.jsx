import { pi } from './pi.jsx'

function Circle({diameter}) {

    const radius = diameter / 2

    const area = pi * radius * radius;

    return(
        <>
            <div>Circle diamater is: {diameter}</div>
            <div>Circle area: {area}</div>

        </>
    )
}

export default Circle