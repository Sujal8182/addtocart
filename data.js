let section = document.getElementById("container")
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
  link.addEventListener('click', function () {
    navLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});
let header = ["Electronics","Audio & Gaming","Photography & Fitness"]
let desp = ["Latest smartphones, laptops, tablets and wearables","Premium headphones, earbuds, speakers and gaming accessories","Professional cameras and fitness tracking devices"]
function getthat(input){
    switch(input){
        case "electronics" :
                section.innerHTML = `
                     <div class="container">
                        <div class="section-header">
                            <h2>${header[0]}</h2>
                            <p>${desp[0]}</p>
                        </div>
                        <div class="products-grid" id="products-grid">
                            <!-- Products will be loaded here -->
                        </div>
                `
                everydata(input)
            break;
        case "audio-gaming" :
                section.innerHTML = `
                     <div class="container">
                        <div class="section-header">
                            <h2>${header[1]}</h2>
                            <p>${desp[1]}</p>
                        </div>
                        <div class="products-grid" id="products-grid">
                            <!-- Products will be loaded here -->
                        </div>
                `
                everydata(input)
            break;
        case "photography-fitness" :
                section.innerHTML = `
                     <div class="container">
                        <div class="section-header">
                            <h2>${header[2]}</h2>
                            <p>${desp[2]}</p>
                        </div>
                        <div class="products-grid" id="products-grid">
                            <!-- Products will be loaded here -->
                        </div>
                `
                everydata(input)
            break;

    }
}


    function everydata(input){
            
            // Load products from JSON
            fetch(`./data/${input}.json`)
                .then(response => response.json())
                .then(products => {
                    const productsGrid = document.getElementById('products-grid');
                    
                    products.forEach(product => {
                        const productCard = document.createElement('div');
                        productCard.className = 'product-card';
                        
                        productCard.innerHTML = `
                            <div class="product-image">
                                <img src="${product.imageUrl}" alt="${product.title}">
                                ${product.badge ? `<div class="product-badge ${product.badge}">${product.badge === 'sale' ? '-25%' : product.badge}</div>` : ''}
                                <div class="product-actions">
                                    <button class="action-btn"><i class="fas fa-heart"></i></button>
                                    <button class="action-btn"><i class="fas fa-eye"></i></button>
                                </div>
                            </div>
                            <div class="product-info">
                                <div class="product-category">${product.category}</div>
                                <h3>${product.title}</h3>
                                <div class="product-rating">
                                    <div class="stars">
                                        ${'<i class="fas fa-star"></i>'.repeat(Math.floor(product.rating))}
                                        ${product.rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                                    </div>
                                    <span>(${product.rating})</span>
                                </div>
                                <div class="product-price">
                                    <span class="current-price">$${product.price}</span>
                                    ${product.oldPrice ? `<span class="old-price">$${product.oldPrice}</span>` : ''}
                                </div>
                                <button class="add-to-cart-btn" onclick="addtocart('${input}',${product.id})">
                                    <i class="fas fa-shopping-cart"></i>
                                    Add to Cart
                                </button>
                            </div>
                        `;
                        
                        productsGrid.appendChild(productCard);
                    });
                })
                .catch(error => console.error('Error loading products:', error));
    }
    let newproduct = []
    function addtocart(input,id){
                fetch(`./data/${input}.json`)
                .then((response)=> response.json())
                .then((data)=> {
                    if(newproduct.length === 0){
                        newproduct.push(data[id])
                        localStorage.setItem("allproduct",JSON.stringify(newproduct))
                        console.log("first set");
                        
                    }else{
                        let found = false 

                        newproduct.forEach(e =>{
                            if(e.title === data[id].title){
                                found = true;
                            }
                        })
                        if(found){
                            console.log("it is there")
                        }else{
                            newproduct.push(data[id])
                            localStorage.setItem("allproduct",JSON.stringify(newproduct))
                        }
                    }
                })
            }
