
const renderListCarts = (product) => {
    const carts = document.querySelector('.carts__list');
    let cartsBox = [];

    if (product.length === 0) {
        cartsBox = `
        <tr>
            <td class="text-center p-5 col-sm-12" >Empty</td>
        </tr>
        `;
    } else {
        cartsBox = product.map((cart, index) => {
            return `
            <tr>
                <td class="w-25">
                    <img src="${cart.image}" class="img-fluid" alt="">
                </td>
                <td>${cart.name}</td>
                <td>$${cart.price}</td>
                <td class="d-none d-sm-table-cell">${cart.shortDescription}</td>
                <th class="text-center">
                    <button class="remove-cart-btn btn btn-danger mx-auto" ">X</button>
                </th>
            </tr>
            `;
        }).join('');
    }

    carts.innerHTML = cartsBox;
};