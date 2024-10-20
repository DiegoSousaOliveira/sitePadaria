function card(pathImg, name) {
    const card = document.createElement('div');
    const img = document.createElement('img');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    const div = document.createElement('div');
    
    card.classList.add('card');
    div.classList.add('stars');

    img.src = `${pathImg}`;
    img.alt = `Imagem de ${name}`;
    h3.innerText = `${name}`;
    p.innerText = 'Estrela: ';
    div.innerText = '⭐⭐⭐';

    card.append(img);
    card.append(h3);
    card.append(p);
    card.append(div);

    return card;
}

async function cards(ClassName) {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/products/');
        const data = await response.json();

        const foodContainer = document.querySelector('.food');
        const drinksContainer = document.querySelector('.drinks');

        const cardsContainerInFood = foodContainer.querySelector(`.${ClassName}`);
        const cardsContainerInDrinks = drinksContainer.querySelector(`.${ClassName}`);

        cardsContainerInFood.innerHTML = '';
        cardsContainerInDrinks.innerHTML = '';

        let countFood, countDrink, count;
        countFood = countDrink = count = 0;
        const maxCards = 5;

        for (let product of data) {
            if (product.type_product === 'Comida' && countFood < maxCards) {
                cardsContainerInFood.append(card(product.imagem, product.name));
                countFood++;
            } else if (product.type_product === 'Bebida' && countDrink < maxCards) {
                cardsContainerInDrinks.append(card(product.imagem, product.name));
                countDrink++;
            }

            if (count < maxCards) {
                count++;
            }
        }

        return [data, maxCards, count];

    } catch (error) {
        console.error('Erro ao buscar os dados da API:', error);
    }
}

function nextCard(nameParentClass, data, count, minCards, lenItems, firstChildInCardsList) {
    console.log(nameParentClass, data, count, minCards, lenItems, firstChildInCardsList)
    const foodContainer = document.querySelector(`.${nameParentClass}`);
    const cardsContainer = foodContainer.querySelector('.cards');

    if (cardsContainer.childElementCount > minCards && count < lenItems) {
        firstChildInCardsList.push(cardsContainer.firstElementChild);
        cardsContainer.removeChild(cardsContainer.firstElementChild);
        const product = data[count];
        cardsContainer.append(card(product.imagem, product.name));
        count++;
    }

    return [count, firstChildInCardsList]
}

function prevCard(nameParentClass, maxCards, count, minCards, firstChildInCardsList) {
    const foodContainer = document.querySelector(`.${nameParentClass}`);
    const cardsContainer = foodContainer.querySelector('.cards');
    
    if (cardsContainer.childElementCount > minCards && count-1 >= maxCards) {
        cardsContainer.removeChild(cardsContainer.lastElementChild);
        const lastElementOfFirstChildInCards = firstChildInCardsList.length - 1;
        const product = firstChildInCardsList[lastElementOfFirstChildInCards];
        cardsContainer.prepend(product);
        firstChildInCardsList.pop();
        count--;
    }

    return [count, firstChildInCardsList];
}

cards('cards')
    .then(([data, maxCards, count]) => {
        let minCards = maxCards - 1;
        let countFood, countDrink;
        countFood = countDrink = count;

        // foods
        let lenFoods = data.filter(product => product.type_product === "Comida").length;

        if (lenFoods > maxCards) {
            let dataFoods = data.filter(product => product.type_product === 'Comida');
            const divFood = document.querySelector('.food');
            const buttonNextInFood = divFood.querySelector('.next');
            const buttonPrevInFood = divFood.querySelector('.prev');

            let firstChildInCardsListInFood = [];

            buttonNextInFood.addEventListener('click', function nextInFood() {
                [countFood, firstChildInCardsListInFood] = nextCard('food', dataFoods, countFood, minCards, lenFoods, firstChildInCardsListInFood);
            })

            buttonPrevInFood.addEventListener('click', function prevInFood() {
                [countFood, firstChildInCardsListInFood] = prevCard('food', maxCards, countFood, minCards, firstChildInCardsListInFood)
            })
        }
        

        // Drinks
        let lenDrinks = data.filter(product => product.type_product === "Bebida").length;

        if (lenDrinks > maxCards) {
            let dataDrinks = data.filter(product => product.type_product === 'Bebida');
            const divDrinks = document.querySelector('.drinks');
            const buttonNextInDrinks = divDrinks.querySelector('.next');
            const buttonPrevInDrinks = divDrinks.querySelector('.prev');
    
            let firstChildInCardsListInDrinks = [];
    
            buttonNextInDrinks.addEventListener('click', function nextInDrinks() {
                [countDrink, firstChildInCardsListInDrinks] = nextCard('drinks', dataDrinks, countDrink, minCards, lenDrinks, firstChildInCardsListInDrinks);
            })
    
            buttonPrevInDrinks.addEventListener('click', function prevInDrinks() {
                [countDrink, firstChildInCardsListInDrinks] = prevCard('drinks', maxCards, countDrink, minCards, firstChildInCardsListInDrinks)
            })
        }
});