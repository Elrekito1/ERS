import { useEffect, useState, useRef} from 'react';
import { motion} from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css"
import "../../src/style.css"
import "../Components/SpringIn/Home/home.css"
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "../../node_modules/swiper/swiper.css";
import "../../node_modules/swiper/swiper.min.css";
import Imagem1 from "./Imagens/Imagem1.jpeg"
import Imagem2 from "./Imagens/Imagem2.jpeg"
import Imagem3 from "./Imagens/Imagem3.jpeg"

import axios from 'axios';











function Home() {
// Integrar com o backend
const [home, setHome] = useState([]);
console.log(home) 
useEffect(()=>{
  async function fetchData(){
    try{
      const response = await axios.get('http://localhost:8000/')
      console.log(response.data);
     setHome(response.data.data)
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




 // carousel e pegando coisas do service.json

 const [data, setData] = useState([]);
 const isMobile = window.innerWidth <= 2000; // para definir o tamanho da tela pro swiper
  const carousel = useRef();
  const [currentPage, setCurrentPage] = useState(0);
  const [width, setWidth] = useState(0); // limitar a passada máxima do swiper
  

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/static/services.json");
      const result = await response.json();
      setData(result);

      const interval = setInterval(() => {
        if (result && result.length > 0) {
          setCurrentPage((currentPage + 1) % result.length);
        }
      }, 5000); // Intervalo de 5 segundos

      return () => clearInterval(interval);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, [currentPage]); // Dependência currentPage para acionar o useEffect

  
  // useEffect foi usado para realizar a chamada da API, que é executado uma vez devido ao array vazio, usei o método fetch para fazer a chamada e a resposta é trannsformada em um objeto JSON com o método ".json()"


  const handleLeftClick= (e) =>{
    e.preventDefault();
 // Move o carrossel
  carousel.current.scrollLeft -= carousel.current.offsetWidth; 
  }
  
    const handleRightClick = (e) =>{
    e.preventDefault();
      // Move o carrossel
 carousel.current.scrollLeft += carousel.current.offsetWidth;
      
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
        delay: 100 // tempo (em milissegundos) de atraso antes do início da animação
      });
      
     
    }, [])
  

  // Swiper

 if (!data || !data.length) return null;

 // Fotos e videos para o carousel


const videos = [
  require("./Imagens/Video1.mp4"),
  require("./Imagens/Video2.mp4"),
  require("./Imagens/Video3.mp4"),
  require("./Imagens/Video4.mp4"),
  require("./Imagens/Video5.mp4"),
  
  // Adicione mais URLs de vídeos, se necessário
];
 
  //

  // Corrigindo erro fetch
  


  return (
    <>
    <div className='navBar'
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
<div className="container"
 data-aos="fade-up"
 data-aos-duration="1000"
 data-aos-once="true"
 data-aos-offset="0"
>
<motion.div
        className="carousel"
        ref={carousel}
        whileTap={isMobile ? { cursor: "grabbing" } : null}
        drag={isMobile ? "x" : null}
        dragConstraints={{
          right: 0,
          left: window.innerWidth <= 590 ? -1250 : -1400, // Ajuste os valores conforme necessário
        }}
      >
        {/* Duplicando algumas imagens no início e no final do array */}
        {home.map((item, index) => {
          const { id, title, subtitle, description } = item;
          const videoSrc = videos[index];
          const isActive = index === currentPage;
          const videoClassName = index === 0 ? 'video video1' : 'video'; // Adiciona a classe 'video3' ao terceiro vídeo
          const videoClassName2 = index === 1 ? 'video video2' : 'video';
          const videoClassName3 = index === 2 ? 'video video3' : 'video';
          const videoClassName4 = index === 3 ? 'video video4' : 'video';
          const videoClassName5 = index === 4 ? 'video video5' : 'video';
          const classesCombinadas = `${videoClassName} ${videoClassName2} ${videoClassName3} ${videoClassName4} ${videoClassName5}`;

          return (
            <motion.div
              className={`item ${isActive ? 'active' : ''}`}
              key={id}
              
            >
              <div className="photo ">
                <video loop autoPlay muted className={classesCombinadas}>
                  <source src={videoSrc} type='video/mp4' />
                </video>
              </div>
              <motion.div className="info">
                <span className="title">{title}</span>
                <span className="subtitle">{subtitle}</span>
                <span className="description">{description}</span>
              </motion.div>
            </motion.div>
          );
        })}
        
        {/* Início do loop com imagens duplicadas */}
        {home.slice(0, 2).map((item, index) => {
          const { id, title, subtitle, description } = item;
          const videoSrc = videos[index];
          const isActive = index === currentPage;
          const videoClassName = index === 0 ? 'video video1' : 'video'; // Adiciona a classe 'video3' ao terceiro vídeo
          const videoClassName2 = index === 1 ? 'video video2' : 'video';
          const videoClassName3 = index === 2 ? 'video video3' : 'video';
          const videoClassName4 = index === 3 ? 'video video4' : 'video';
          const videoClassName5 = index === 4 ? 'video video5' : 'video';
          const classesCombinadas = `${videoClassName} ${videoClassName2} ${videoClassName3} ${videoClassName4} ${videoClassName5}`;

          return (
            <motion.div
              className={`item ${isActive ? 'active' : ''}`}
              key={`duplicate-${id}`}
            >
              <div className="photo ">
                <video loop autoPlay muted className={classesCombinadas}>
                  <source src={videoSrc} type='video/mp4' />
                </video>
              </div>
              <motion.div className="info">
                <span className="title">{title}</span>
                <span className="subtitle">{subtitle}</span>
                <span className="description">{description}</span>
              </motion.div>
            </motion.div>
          );
        })}
        {/* Fim do loop com imagens duplicadas */}
      </motion.div>

      <div className="buttons">
        <button onClick={handleLeftClick} className='esquerda'>
          <img src="/static/images/216151_right_chevron_icon.png" alt="Scroll Left" />
        </button>
        <button onClick={handleRightClick} className='direita'>
          <img src="/static/images/216151_right_chevron_icon.png" alt="Scroll Right" />
        </button>
      </div>
    </div>
    </div>



<div className="aboutBox aboutMe">

<div className='about box' 
  data-aos="fade-up"
 data-aos-duration="1500"
  data-aos-once="true"
  data-aos-offset="0"
  >
<p>Olá! Eu sou um desenvolvedor web fullstack de Anápolis, GO. Meu foco é em desenvolvimento MERN (MongoDB, Express, Reactjs, Nodejs).</p>
<button className='aboutButton'><a href='http://localhost:3000/aboutme'>Mais sobre mim</a></button>
</div>


</div>

<div className='myServices'
 data-aos="fade-up"
 data-aos-duration="2000"
 data-aos-once="true"
 data-aos-offset="0"
>
 
 <h1 >
  Um pouco dos meus projetos:
  </h1>
 
 <h2 className='project1'>Projeto 1</h2>
 <p className='explanation1'>Explicação 1</p>
 <h2 className='project2'>Projeto 2</h2>
 <p className='explanation2'>Explicação 2</p>
 <h2 className='project3'>Projeto 3</h2>
 <p className='explanation3'>Explicação 3</p>
 <h2 className='project4'>Projeto 4</h2>
 <p className='explanation4'>Explicação 4</p>

 
</div>

<div className='workMe'>
  <h1 className='letsCode'>
    Vamos programar algo <span className='color1'>juntos?</span>
  </h1>
  <button className='contactButton'>
    <a href='http://localhost:3000/contact'>Contato</a>
  </button>
  <h1 className='socialMedia'>
    Você pode me achar nas <span className='color2'>redes sociais:</span>
  </h1>
  <a href='https://www.linkedin.com/in/erick-rodovalho-989685257/' className='linkedin'>Linkedin</a>
  <a href='https://github.com/Elrekito1' className='github'>GitHub</a>
  <a href='https://www.instagram.com/erickkrodovalho/' className='instagram'>Instagram</a>
  <a href='https://w.app/work'className='whatsapp'>WhatsApp</a>

  <h4>Copyright © Erick Rodovalho da Silveira. All rights reserved</h4>
</div>

    </>
  );
}







export default Home;