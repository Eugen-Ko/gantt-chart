import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const CanvasComponent = () => {
  const svgRef = useRef();

  useEffect(() => {
    // Контейнер для всего холста
    const svg = d3
      .select(svgRef.current)
      .attr('width', 500)
      .attr('height', 500);

    // Группа для контейнера с прямоугольниками
    const containerGroup = svg
      .append('g')
      .attr('class', 'container')
      .attr('cursor', 'move')
      .attr('transform', 'translate(0,0)');

    // Добавляем прямоугольник left
    containerGroup
      .append('rect')
      .attr('width', 5)
      .attr('height', 30)
      .attr('fill', 'blue')
      .attr('x', 0)
      .attr('y', 0);

    // Добавляем прямоугольник main
    const mainRect = containerGroup
      .append('rect')
      .attr('width', 30)
      .attr('height', 30)
      .attr('fill', 'green')
      .attr('x', 5)
      .attr('y', 0);

    // Добавляем прямоугольник right
    containerGroup
      .append('rect')
      .attr('width', 5)
      .attr('height', 30)
      .attr('fill', 'red')
      .attr('x', 35)
      .attr('y', 0);

    // Функция для перемещения группы container
    let startX, startY;

    const dragHandler = d3
      .drag()
      .on('start', function (event) {
        // Получаем текущие координаты элемента до начала перетаскивания
        const currentTransform = d3.select(this).attr('transform');
        const translate = (currentTransform || 'translate(0,0)').match(
          /translate\(([^,]+),\s*([^)]+)\)/
        );

        startX = translate ? parseFloat(translate[1]) : 0;
        startY = translate ? parseFloat(translate[2]) : 0;
      })
      .on('drag', function (event) {
        // Рассчитываем новые координаты, учитывая начальные координаты и текущее смещение
        d3.select(this).attr(
          'transform',
          `translate(${startX + event.dx}, ${startY + event.dy})`
        );
      });

    // Применяем обработчик перетаскивания к основному прямоугольнику
    // только mainRect реагирует на перетаскивание
    dragHandler(mainRect);
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default CanvasComponent;
