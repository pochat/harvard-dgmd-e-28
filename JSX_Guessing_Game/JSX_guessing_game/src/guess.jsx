import { Routes, Route, Link } from "react-router-dom"

function Nav() {
    return(
        <>
        <div className="navigation-container">
            <Link to="/"> Home </Link>
            <div>
                <Link to="/stats"> Stats </Link>
                <Link to="/settings"> Settings </Link>
            </div>
        </div>
        </>
    )
}


function Home() {

    return(
        <div>
            <h1>
                This is the home page
            </h1>
        </div>
    )
}


function Settings() {

    return(

        <h1>Hello from Component Settings</h1>

    )
}

function Stats() {
    return(
        <h1>Hello from stats component</h1>
    )
}


function MyApp() {
    
    return (
        <div>
            <Nav />
            <Routes>
                <Route path="/" element={ <Home/> } />
                <Route path="/settings" element={ <Settings/> } />
                <Route path="/stats" element={ <Stats/> } />
            </Routes>
        </div>
    )
}

export default MyApp