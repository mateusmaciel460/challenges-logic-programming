let totalPrice = 0;

const elementProductAvailable = document.querySelector('#element-product-available');
const elementProductAdd = document.querySelector('#element-product-add');
const elementProductSelect = document.querySelector('#product');
const elementPriceGeneral = document.querySelector('#element-total-price');
const elementMessageAlert = document.querySelector('#element-message-alert');

const listProduct = [
    { id: 1, title: 'Celular', price: 1400, amount: 4 },
    { id: 2, title: 'Notebook', price: 5400, amount: 9 },
    { id: 3, title: 'Tablet', price: 2400, amount: 11 }
];

function addProductShoppingCart() {
    const amount = parseInt(document.querySelector('#amount').value);
    const product = document.querySelector('#product').value;

    const nameProduct = product.split(' ')[3];
    const priceProduct = parseInt(product.split(' ')[1]);
    const idProduct = parseInt(product.split(' ')[5]);

    if (!validationField(amount, product, nameProduct, priceProduct)) return;

    checkProductExistOnCart(amount, idProduct, priceProduct, nameProduct);
    showOnScreenListProduct();
    checkQuantityReachedLimit();

    document.querySelector('#amount').value = '';
}

function validationField(amount, product) {
    elementMessageAlert.innerHTML = '';

    if (isNaN(amount) || product === '') {
        showOnScreenMessageAlert(elementMessageAlert, 'danger', 'Preencha corretamente todos os campos');
        return false;
    }

    if (amount <= 0) {
        showOnScreenMessageAlert(elementMessageAlert, 'danger', 'Quantidade deve ser maior que zero');
        return false;
    }

    return true;
}

function checkProductExistOnCart(amount, idProduct, priceProduct, nameProduct) {
    listProduct.forEach((product) => {
        let textAvailable = amount > 1 ? 'unidades disponíveis' : 'unidade disponivel';

        if (product.id === idProduct) {
            if (amount <= product.amount) {
                product.amount -= amount;

                operationTotalPay(priceProduct, amount);
                addProductChosenOnCart(amount, nameProduct, priceProduct);
            } else {
                showOnScreenMessageAlert(
                    elementMessageAlert,
                    'danger',
                    `Não temos ${amount} ${textAvailable} para ${nameProduct}.`);
            }
        }
    });
}

function operationTotalPay(priceProduct, amount) {
    let priceByProduct = priceProduct * amount;
    totalPrice += priceByProduct;
    elementPriceGeneral.textContent = `${totalPrice}`;
}

function addProductChosenOnCart(amount, nameProduct, priceProduct) {
    elementProductAdd.innerHTML += `
       <div class="model__box">
            <p class="container__text">
                <span class="container__emphasis">${amount}x</span>
                ${nameProduct}
                <span class="container__emphasis">R$ ${priceProduct}</span>
            </p>
       </div>
    `;
}

function showOnScreenListProduct() {
    elementProductAvailable.innerHTML = '';

    listProduct.forEach((product) => {
        let checkAmountTotal = product.amount >= 1 ? 'green' : 'red';

        elementProductAvailable.innerHTML += `
             <div class="container__layer model__vertical">
                <h2 class="container__subtitle">${product.title}</h2>
                <p class="container__text">R$ ${product.price}</p>
                <span class="container__tag model__background-${checkAmountTotal}">Quantidade: ${product.amount}</span>
             </div>
        `;
    });
}

function showOnScreenListSelectProduct() {
    listProduct.forEach((product) => {
        elementProductSelect.innerHTML += `
            <option value="R$ ${product.price} - ${product.title} - ${product.id}">R$ ${product.price} - ${product.title}</option>
        `;
    });
}

function checkQuantityReachedLimit() {
    let amountLimit = 0;
    listProduct.map((product) =>  amountLimit += product.amount );

    if (amountLimit === 0) {
        document.querySelector('#button-add').setAttribute('disabled', true);
    }
}

function checkListProductExist() {
    if (listProduct.length === 0) {
        document.querySelector('#button-add').setAttribute('disabled', true);
        elementProductSelect.innerHTML = '<option>Nenhum produto</option>';
        elementProductAvailable.innerHTML = `
        <span class="container__message model__background-red">
            Nenhum produto adicionado :(
        </span>`;
    }
}

function showOnScreenMessageAlert(elementAlert, typeAlert, messageAlert) {
    elementAlert.innerHTML = `<span class="container__message container__message-${typeAlert}">${messageAlert}</span>`;
}

showOnScreenListProduct();
showOnScreenListSelectProduct();
checkListProductExist();