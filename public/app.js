const toCurrency = price => {
    return new Intl.NumberFormat('en-US', {
        currency: 'USD',
        style: 'currency'
    }).format(price);
}

const toDate = date => {
    return new Intl.DateTimeFormat('ru-Ru', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(new Date(date))
}

document.querySelectorAll('.price').forEach(node => {
    node.textContent = toCurrency(node.textContent)
});
document.querySelectorAll('.date').forEach(node => {
    node.textContent = toDate(node.textContent)
});

const $cart = document.querySelector('#cart');

if ($cart) {
    document.addEventListener('click', ev => {
        if (ev.target.classList.contains('js-remove')) {
            const { id, csrf } = ev.target.dataset;

            fetch(`/cart/remove/${id}`, {
                method: 'delete',
                headers: {
                    'X-XSRF-TOKEN': csrf
                }
            }).then(res => res.json())
                .then(cart => {
                    if (cart.courses.length) {
                        $cart.querySelector('tbody').innerHTML = cart.courses.map(course => {
                            return `
                                <tr>
                                    <td>${course.title}</td>
                                    <td>${course.count}</td>
                                    <td>
                                        <button class="btn btn-small js-remove" data-id="${course.id}">Delete</button>
                                    </td>
                                </tr>
                            `
                        }).join();
                        $cart.querySelector('.price').textContent = toCurrency(cart.price);
                    } else {
                        $cart.innerHTML = '<p>Cart is empty</p>'
                    }
                })
        }
    })
}

M.Tabs.init(document.querySelectorAll('.tabs'));