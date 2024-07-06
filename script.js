document.addEventListener("DOMContentLoaded", function() {
    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let highlightedDays = {
        //"2024-01-01": { description: "Ano Novo", color: "#ffeb3b" },
        //"2024-02-14": { description: "Dia dos Namorados", color: "#ffeb3b" }
        // Adicione mais datas e legendas conforme necessário
    };

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    function generateCalendar(year, month) {
        const calendarContainer = document.querySelector('.months');
        calendarContainer.innerHTML = ''; // Limpar calendário existente

        if (month !== undefined && month !== "") {
            createMonthCalendar(year, parseInt(month), calendarContainer);
        } else {
            months.forEach((_, index) => {
                createMonthCalendar(year, index, calendarContainer);
            });
        }
    }

    function createMonthCalendar(year, monthIndex, calendarContainer) {
        const monthDiv = document.createElement('div');
        monthDiv.classList.add('month');

        const monthTitle = document.createElement('h2');
        monthTitle.textContent = `${months[monthIndex]} ${year}`;
        monthDiv.appendChild(monthTitle);

        const daysDiv = document.createElement('div');
        daysDiv.classList.add('days');

        // Add day of week headers
        daysOfWeek.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.classList.add('day', 'header');
            dayHeader.textContent = day;
            daysDiv.appendChild(dayHeader);
        });

        // Add empty days to align the first day of the month
        const firstDay = new Date(year, monthIndex, 1).getDay();
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('day');
            daysDiv.appendChild(emptyDay);
        }

        // Add days of the month
        const days = monthIndex === 1 && isLeapYear(year) ? 29 : daysInMonth[monthIndex];
        for (let day = 1; day <= days; day++) {
            const dayDiv = document.createElement('div');
            const date = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            dayDiv.classList.add('day');
            if (highlightedDays[date]) {
                dayDiv.classList.add('highlight');
                dayDiv.style.backgroundColor = highlightedDays[date].color;
                dayDiv.setAttribute('data-tooltip', highlightedDays[date].description);
            }
            dayDiv.textContent = day;
            daysDiv.appendChild(dayDiv);
        }

        monthDiv.appendChild(daysDiv);
        calendarContainer.appendChild(monthDiv);
    }

    function generateLegend() {
        const legendContainer = document.querySelector('.legend ul');
        legendContainer.innerHTML = ''; // Limpar legenda existente

        Object.keys(highlightedDays).forEach(date => {
            const legendItem = document.createElement('li');
            legendItem.textContent = `${date}: ${highlightedDays[date].description}`;
            legendItem.style.backgroundColor = highlightedDays[date].color;
            legendContainer.appendChild(legendItem);
        });
    }

    const yearInput = document.getElementById('year');
    const monthInput = document.getElementById('month');

    yearInput.addEventListener('change', () => {
        const year = parseInt(yearInput.value);
        const month = monthInput.value;
        generateCalendar(year, month);
    });

    monthInput.addEventListener('change', () => {
        const year = parseInt(yearInput.value);
        const month = monthInput.value;
        generateCalendar(year, month);
    });

    const addDateForm = document.getElementById('add-date-form');
    addDateForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const date = document.getElementById('date').value;
        const description = document.getElementById('description').value;
        const color = document.getElementById('color').value;
        highlightedDays[date] = { description, color };
        generateCalendar(parseInt(yearInput.value), monthInput.value);
        generateLegend();
        addDateForm.reset(); // Resetar o formulário após o envio
    });

    const removeDateForm = document.getElementById('remove-date-form');
    removeDateForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const date = document.getElementById('remove-date').value;
        if (highlightedDays[date]) {
            delete highlightedDays[date];
            generateCalendar(parseInt(yearInput.value), monthInput.value);
            generateLegend();
        } else {
            alert('Data não encontrada.');
        }
        removeDateForm.reset(); // Resetar o formulário após o envio
    });

    generateCalendar(parseInt(yearInput.value), monthInput.value); // Gera calendário inicial
    generateLegend(); // Gera legenda inicial
});
const removeDateForm = document.getElementById('remove-date-form');
removeDateForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const date = document.getElementById('remove-date').value;
    if (highlightedDays[date]) {
        delete highlightedDays[date];
        generateCalendar(parseInt(yearInput.value), monthInput.value);
        generateLegend();
    } else {
        alert('Data não encontrada.');
    }
    removeDateForm.reset(); // Resetar o formulário após o envio
});
