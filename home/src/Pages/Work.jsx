import { useEffect, useState} from 'react';
import { motion} from "framer-motion";

import AOS from "aos";
import "aos/dist/aos.css"

import "../../src/style.css"

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import "../../node_modules/swiper/swiper.css";
import "../../node_modules/swiper/swiper.min.css";
import work from "../Components/SpringIn/Work/Coisas/work.json"
import fromWork from "../Components/SpringIn/Work/Images/fromWork.jpeg"

import axios from 'axios'


export default function Work(){
  // Integrar com o backend
  const [works, setWorks] = useState([]);
  console.log(works)
  useEffect(()=>{
    async function fetchData(){
      try{
        const response = await axios.get('http://localhost:8000/work')
        console.log(response.data); // Dados recebidos com sucesso
        setWorks(response.data.data);
      } catch(error){
        if(error.response){
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request)
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


    // JSON
     // Pegando coisas do AboutMe.json

     const [especialidades, setEspecialidades] = useState([]);

     useEffect(() => {
         setEspecialidades(work || []);
       }, []);
 
 // Pegando imagens

 const photos = [
  require("./Imagens/Imagem1.jpeg"),
  require("./Imagens/Imagem2.jpeg"),
  require("./Imagens/Imagem3.jpeg"),
  require("./Imagens/Imagem3.jpeg"),
  require("./Imagens/Imagem3.jpeg"),
  require("./Imagens/Imagem3.jpeg"),
  require("./Imagens/Imagem3.jpeg"),
  require("./Imagens/Imagem3.jpeg"),

  
  // Adicione mais URLs de vídeos, se necessário
];

    return(
<>
<div className='navBar4'
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
<div className="effectPhrase">
    <h1 >Conheça os meus trabalhos.</h1>
    <p className='aplicacoes'>De aplicações <span className='color1'>simples</span> das mais <span className='color3'>complexas</span>.</p>
    <p className='aplicacoes'>Trato qualquer projeto com a mesma intensidade de <span className='color3'>esforço</span>.</p>
    <p className='pMaior aplicacoes'>Faço aplicações frontend com mais de um tipo de biblioteca em 
        <span className='color1'>JavaScript</span>. No backend as principais linguagens (bibliotecas) 
        e banco de dados que utilizo são: 
        <span className='color1'> PHP, NodeJS, ExpressJS, MongoDB e SQL.</span>
        </p>
</div>
<div className='photoMework'>
    <img src={fromWork}/>
</div>
</div>
<div className='myServices3 aumentar'
 data-aos="fade-up"
 data-aos-duration="2000"
 data-aos-once="true"
 data-aos-offset="0"
>
 <div className="barra">
 <h1>Todos os meus projetos são feitos com muito <span className='color2'>empenho e amor</span>
  </h1></div> 
 <div className='sobreEspecialidades2'>
 <h1 className='myWork'><span className='myWork2'>Meus trabalhos.</span></h1>
  </div>
  <div className="especialidades2">
  {works.map((item, index) => {
    const photoSrc = photos[index]
    return(
      <div key={index} className='PhotoTitleSubtitle'>
      <div className='photoSpace'><img src={photoSrc}/></div>

     <h1>{item.title}</h1>
     <h2>{item.subtitle}</h2>
   </div>
  );
})}

   
</div>

  </div>
  <div className='workMe3 '>
 
  <h1 className='letsCode3'>
    Vamos programar algo <span className='color1'>juntos?</span>
  </h1>
  <button className=' contactButton3'>
    <a href='#'>Contato</a>
  </button>
  <h1 className='socialMedia2'>
 <span >Você pode me achar nas <span className='color3'> redes sociais: </span></span>
  </h1>
  <a href='https://www.linkedin.com/in/erick-rodovalho-989685257/' className='linkedin3'>Linkedin</a>
  <a href='https://github.com/Elrekito1' className='github3'>GitHub</a>
  <a href='https://www.instagram.com/erickkrodovalho/' className='instagram3'>Instagram</a>
  <a href='https://w.app/work'className='whatsapp3'>WhatsApp</a>

  <h4 className='copyRight'>Copyright © Erick Rodovalho da Silveira. All rights reserved</h4>
    </div>
</>
    )
}