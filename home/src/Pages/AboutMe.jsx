import { useEffect, useState } from 'react';
import { motion} from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css"
import "../../src/style.css"
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "../../node_modules/swiper/swiper.css";
import "../../node_modules/swiper/swiper.min.css";
import photoMe from "../Components/SpringIn/AboutMe/Images/photoMe.jpeg"
import setup from "../Components/SpringIn/AboutMe/Images/setupPhoto.jpeg"

import axios from 'axios';

export default function AboutMe(){
  // Integrar com o backend
  const [about, setAbout] = useState([]);
  console.log(about) 
  useEffect(()=>{
    async function fetchData(){
      try{
        const response = await axios.get('http://localhost:8000/about')
        console.log(response.data);
        setAbout(response.data.data)
      } catch(error){
        if(error.response){
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request){
          console.log(error.request);
        } else {
          console.log('Erro', error.message);
        }
        console.log(error.config);
      }
    }
    fetchData();
  }, [])
  //
  // hamburguer
  const [active, setActive] = useState(false); 
  const toggleMenu = () => { 
    setActive(!active);
  };

  // Cursor effect
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  })
  const [cursorVariant, setCursorVariant] = useState("default");
  
  useEffect(() =>{
    const mouseMove = e => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
      
    }
    

    window.addEventListener("mousemove", mouseMove)

    
    return () => {
      window.removeEventListener("mousemove", mouseMove)
    }
  }, []); // executado uma vez devido à array vazia
  
  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16  
    },
    container: {
      
      backgroundColor: "orange",
      x: mousePosition.x - 16,
      y: mousePosition.y - 16
    },

    
  }

  const containerEnter = () => setCursorVariant("container");
  const containerLeave = () => setCursorVariant("default")



  

    // scroll effect


    useEffect(()=>{
      AOS.init({
        duration: 1000, // duração da animação em milissegundos
        offset: 200, // offset (em pixels) em relação ao topo do elemento em que a animação é disparada
        easing: "ease-in-out", // tipo de easing utilizado na animação
        delay: 100 // ttempo (em milissegundos) de atraso antes do início da animação
      });
      
     
    }, [])

   

    
    return(
        <>
          <div className='navBar2'
    onMouseEnter={containerEnter} 
    onMouseLeave={containerLeave}
    >

      <motion.div 
    className="cursor"
    variants={variants}
    animate={cursorVariant}
    />
    <motion.div 
    className='cursor2'
    variants={variants}
    animate={cursorVariant}
    />
     <div className={active ? "icon iconActive" : "icon"} onClick={toggleMenu}>
        <div className="hamburguer hamburguerIcon"></div>
      </div>   
      <div className={active ? "menu menuOpen" : "menu menuClose"}>

        <div className="list">
          <ul className="listItems">
            <li><a href="http://localhost:3000/">HOME</a></li>
            <li><a href="http://localhost:3000/work">WORK</a></li>
            <li><a href="http://localhost:3000/aboutme">ABOUT</a></li>
            <li><a href="http://localhost:3000/contact">CONTACT</a></li>
        </ul>
        <h4>Vamos encontrar soluções juntos?</h4>
        <a className="EntrarContato">Entre em contato para construirmos o seu projeto juntos!</a>
        <a className="email">erickrodovalhosilveira@gmail.com</a>
    
        </div>
      </div>
      <div className="logo">
        <a className>Ers</a>
</div>
<div className=" effectPhrase2">
    <h1>Um programador e amante de xadrez.</h1>
    <p className='meuNome2'>Meu nome é Erick Rodovalho da Silveira.</p>
    <p>E eu tento ser especialista em tudo que envolva lógica.</p>
    <p>Sou um programador FullStack, amo xadrez e OOP.</p>
</div>

<div className='photoMe'>
    <img src={photoMe}/>
</div>

</div>

<div className='myServices2'
 data-aos="fade-up"
 data-aos-duration="2000"
 data-aos-once="true"
 data-aos-offset="0"
>
 <div className='sobreEspecialidades'>
 <h1 className='minhasEspecs' >Sobre as minhas especialidades.</h1>
  </div>
  <div className="setupPhoto">
    <img src={setup}/>
  </div>
 
  <div className="especialidades3">
        {about.map((item, index) => (
          <div key={index} className="especialidade">
            <h1 className='espc1'>{item.Especialidade}</h1>
            <p className='espc2'>{item.SobreEspec}</p>
          </div>
        ))}
      </div>
 
<div className="fazerPorVc">
    <h1>O que esperar de mim.</h1>
</div>

<div className="esperarDeMim">
  {about.map(({ TituloFazer, DescFazer }, index) => (
    <div key={index} className='moverElementos'>
      <h1 className=''>{TituloFazer}</h1>
      <p className=''>{DescFazer}</p>
     
      
    </div>
  ))}
</div>


</div>



<div className='workMe2'>
  <h1 className='letsCode letsCode2'>
    Vamos programar algo <span className='color1'>juntos?</span>
  </h1>
  <button className='contactButton contactButton2'>
    <a href='http://localhost:3000/contact'>Contato</a>
  </button>
  <h1 className='socialMedia socialMedia2'>
    Você pode me achar nas <span className='color2'>redes sociais:</span>
  </h1>
  <a href='https://www.linkedin.com/in/erick-rodovalho-989685257/' className='linkedin linkedin2'>Linkedin</a>
  <a href='https://github.com/Elrekito1' className='github github2'>GitHub</a>
  <a href='https://www.instagram.com/erickkrodovalho/' className='instagram instagram2'>Instagram</a>
  <a href='https://w.app/work'className='whatsapp whatsapp2'>WhatsApp</a>

  <h4 className='copyRight2'>Copyright © Erick Rodovalho da Silveira. All rights reserved</h4>
    </div>
    
        </>
    )
}