import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../src/style.css";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "../../node_modules/swiper/swiper.css";
import "../../node_modules/swiper/swiper.min.css";



export default function Contact() {
  // Enviar formulário EMAIL
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    options: '',
    time: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/email', formData, {
        headers: {
          'Content-Type': 'application/json' // Adicionando o cabeçalho Content-Type
        }
      });
  
      
      console.log('Resposta do servidor:', response.data);
      // Resto do seu código para lidar com a resposta...
      if (response.status === 200) {
        console.log('Dados enviados com sucesso!');
        setFormData({
          name: '',
          email: '',
          options: '',
          time: '',
          description: ''
        });
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };
  

  const [active, setActive] = useState(false);
  const toggleMenu = () => {
    setActive(!active);
  };

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = e => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16
    },
    container: {
      backgroundColor: "orange",
      x: mousePosition.x - 16,
      y: mousePosition.y - 16
    }
  };

  const containerEnter = () => setCursorVariant("container");
  const containerLeave = () => setCursorVariant("default");

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 200,
      easing: "ease-in-out",
      delay: 100
    });
  }, []);

// Efeito clique botão
const botao = document.querySelector(".botao")
function buttonClick (){
  // Define um tempo de espera de 300 milissegundos antes de executar o código dentro do setTimeout
  setTimeout(() => {
  // Verifica se todos os campos do formulário estão preenchidos
  const isFormFilled = Object.values(formData).every((value) => value !== '');
    
    // Se todos os campos estiverem preenchidos, altera o texto do botão para 'Enviado!'
    if (isFormFilled) {
      botao.innerText = 'Enviado!';
      botao.style.backgroundColor = '#c91313';
    } else {
      botao.innerText = 'Não enviado!';
      botao.style.animation = 'shake 0.4s ease-in-out';
      setTimeout(() => {
        botao.style.animation = '';
      }, 400);
    }
  }, 300);
  
}


  return (
    <>
      <div className='navBar3' onMouseEnter={containerEnter} onMouseLeave={containerLeave}>
        <motion.div className="cursor" variants={variants} animate={cursorVariant} />
        <motion.div className='cursor2' variants={variants} animate={cursorVariant} />
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
        <div className="effectPhrase4">
          <h1 className='trabalhar'>Vamos trabalhar juntos?</h1>
          <p className='preencha'>Preencha o formulário e coloque todas as suas demandas!</p>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className='formulario1'>
              <label htmlFor="name" className='nome'>Nome</label>
              <textarea type='text' id='name' name='name' className='textArea textAreaCellphone1' placeholder='Digite seu nome' value={formData.name} onChange={handleChange}></textarea>
            </div>
            <div className='formulario2'>
              <label htmlFor="email" className='email2'>Email</label>
              <textarea type='text' id='email' name='email' className='textArea textAreaCellphone2' placeholder='Digite seu email' value={formData.email} onChange={handleChange}></textarea>
            </div>
            <div className='formulario3'>
              <label htmlFor="options" className='selecione'><span>Em que posso ajudar você?</span></label>
              <select name='options' className='select1' value={formData.options} onChange={handleChange}>
                <option></option>
                <option>Desenvolver um site</option>
                <option>Fazer um app</option>
                <option>Integrar API</option>
                <option>One page website</option>
                <option>A combinar</option>
              </select>
              <label htmlFor='time' className='tempoEstimado'>Tempo estimado</label>
              <select name='time' className='select2' value={formData.time} onChange={handleChange}>
                <option></option>
                <option>1 semana</option>
                <option>4 semanas</option>
                <option>3 meses</option>
                <option>A combinar</option>
              </select>
              <label htmlFor="mensagem" className='detalhes'><span className='me'>Me</span> dê mais detalhes</label>
              <textarea type='text' id='description' name='description' className='detailsArea' placeholder='O que te deixaria satisfeito no projeto?' value={formData.description} onChange={handleChange}></textarea>
            </div>
            <button type='submit' className='botao' onClick={buttonClick}>Enviar</button>
          </form>
        </div>
      </div>
      <div className='workMe3'>
        <h1 className='letsCode4'>Vamos programar algo <span className='color1'>juntos?</span></h1>
        <button className='contactButton5'><a href='#'>Contato</a></button>
        <h1 className='socialMedia5'>Você pode me achar nas <span className='color2'>redes sociais:</span></h1>
        <a href='https://www.linkedin.com/in/erick-rodovalho-989685257/' className='linkedin5'>Linkedin</a>
        <a href='https://github.com/Elrekito1' className='github5'>GitHub</a>
        <a href='https://www.instagram.com/erickkrodovalho/' className='instagram5'>Instagram</a>
        <a href='https://w.app/work' className='whatsapp5'>WhatsApp</a>
        <h4 >Copyright © Erick Rodovalho da Silveira. All rights reserved</h4>
      </div>
    </>
  );
}
