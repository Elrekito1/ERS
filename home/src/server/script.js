import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from '../Pages/App.jsx'
import AboutMe from '../Pages/AboutMe.jsx'
import Work from '../Pages/Work.jsx'
import Contact from '../Pages/Contact.jsx'


export default function Script(){
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' index element={<Home/>}/>
                    <Route path='/aboutme' index element={<AboutMe/>}/>
                    <Route path='/work' index element={<Work/>}/>               
                    <Route path='/contact' index element={<Contact/>}/>               
                </Routes>            
            </BrowserRouter>
        </div>
    )
}