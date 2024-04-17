
import React, { useState, useEffect } from 'react';
import './Card_wrapper.css';
import Card from './Card.js';

function Card_wrapper() {
      // Массив данных для имитации загрузки из MongoDB
  const generateCardData = () => {
    const data = [];
    for (let i = 1; i <= 103; i++) {
      data.push({
        id: i,
        title: `Карточка ${i}`,
        imageUrl: `ссылка${i}`,
        price: `${i}`,
      });
    }
    return data;
  };
  const [cardData, setCardData] = useState(generateCardData());
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 50;

  useEffect(() => {
    // Функция для загрузки данных из MongoDB
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/laptops');
        const data = await response.json();
        setCardData(data);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchData();
  }, []); 
  // Функция для отображения карточек на текущей странице
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cardData.slice(indexOfFirstCard, indexOfLastCard);

  // Функция для переключения на следующую страницу
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Функция для переключения на предыдущую страницу
  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="container">
      <div className='cards'>
        {/* Маппим данные для каждой карточки на текущей странице */}
        {currentCards.map((card) => (
          <Card
            key={card.id}
            title={card.name}
            imageUrl={card.imgUrl}
            price={card.price}
          />
        ))}
      </div>
      <div className='navigation'>
        {/* Кнопка "Предыдущая страница", отображается, если не на первой странице */}
        {currentPage > 1 && <button onClick={prevPage}>Предыдущая страница</button>}
        {/* Кнопка "Следующая страница", отображается, если не на последней странице */}
        {cardData.length > indexOfLastCard && <button onClick={nextPage}>Следующая страница</button>}
      </div>
    </div>
  );
}

export default Card_wrapper;