/*
====================================================================
 PRII DOCES — JAVASCRIPT DO CARDÁPIO
====================================================================

 Este arquivo controla SOMENTE as funções do cardápio.

 MAPA RÁPIDO
 01. Produtos
 02. Estado da aplicação
 03. Elementos da página
 04. Busca, filtros e renderização
 05. Carrinho
 06. Modais e personalização
 07. Checkout / WhatsApp
 08. Eventos
 09. Configurações de contato
 10. Carrossel de destaques
 11. Inicialização

 DICA
 Para adicionar um produto, procure por "const products".
 Para trocar WhatsApp/Instagram, procure por "PRII_CONTACTS".
 Para trocar os destaques do carrossel, procure por "carouselItems".
====================================================================
*/

/* ============================================================
   PRII DOCES | CARDÁPIO.JS
   Organização:
   01. Dados dos produtos
   02. Estado da aplicação
   03. Seletores do DOM
   04. Produtos / filtros
   05. Carrinho
   06. Painéis
   07. Finalização
   08. Inicialização

   IMPORTANTE:
   Depois vamos trocar o array local pelo Firestore.
   ============================================================ */


/* ============================================================
   01. DADOS DOS PRODUTOS
   ============================================================ */

const products = [
    // ============================================================
    // SOBREMESAS
    // Para adicionar um produto, basta copiar um bloco e alterar
    // nome, imagem e preço.
    // ============================================================

    {
        id: 9,
        name: "Açaí",
        category: "Sobremesas",
        price: 12.00,
        description: "Uma deliciosa sobremesa.",
        image: "assets/sobremesas/acai.jpeg"
    },

    {
        id: 10,
        name: "Bombom de Morango",
        category: "Sobremesas",
        price: 12.00,
        description: "Uma deliciosa sobremesa.",
        image: "assets/sobremesas/bombo-de-morango-ferrero-rocher-ninho-com-nutela-brigadeiro.jpeg"
    },

    {
        id: 11,
        name: "Brownie Nuvem",
        category: "Sobremesas",
        price: 12.00,
        description: "Uma deliciosa sobremesa.",
        image: "assets/sobremesas/brownie-nuvem.jpeg"
    },

    {
        id: 12,
        name: "Brownie Supremo",
        category: "Sobremesas",
        price: 12.00,
        description: "Uma deliciosa sobremesa.",
        image: "assets/sobremesas/brownie-supremo-com-recheio-de-brigadeiro-ou-ninho-decorado.jpeg"
    },

    {
        id: 13,
        name: "Caixa de Doces",
        category: "Sobremesas",
        price: 12.00,
        description: "Uma deliciosa sobremesa.",
        image: "assets/sobremesas/caixa-de-doces.jpeg"
    },

    {
        id: 14,
        name: "Copo Brownie Ferrero Rocher",
        category: "Sobremesas",
        price: 12.00,
        description: "Uma deliciosa sobremesa.",
        image: "assets/sobremesas/cop-brawnie-ferreiro-rocher.jpeg"
    },

    {
        id: 15,
        name: "Copo Brownie Chocomelo",
        category: "Sobremesas",
        price: 12.00,
        description: "Uma deliciosa sobremesa.",
        image: "assets/sobremesas/copo-brownie-chocomelo-ferrero-rocher-ninho-com-morango.jpeg"
    },

    {
        id: 16,
        name: "Copo da Felicidade de Morango",
        category: "Sobremesas",
        price: 12.00,
        description: "Uma deliciosa sobremesa.",
        image: "assets/sobremesas/copo-da-felicidade-de-morango.jpeg"
    },

    {
        id: 17,
        name: "Fatia de Brownie",
        category: "Sobremesas",
        price: 12.00,
        description: "Uma deliciosa sobremesa.",
        image: "assets/sobremesas/fatia-brownie.jpeg"
    },

    {
        id: 18,
        name: "Fatia de Brownie Especial",
        category: "Sobremesas",
        price: 12.00,
        description: "Uma deliciosa sobremesa.",
        image: "assets/sobremesas/fatia-brownie2.jpeg"
    },

    {
        id: 19,
        name: "Pote de Sorvete",
        category: "Sobremesas",
        price: 12.00,
        description: "Uma deliciosa sobremesa.",
        image: "assets/sobremesas/pote-de-sorvete.jpeg"
    },

    {
        id: 20,
        name: "Sanduíche de Brownie",
        category: "Sobremesas",
        price: 12.00,
        description: "Uma deliciosa sobremesa.",
        image: "assets/sobremesas/sanduiche-brownie.jpeg"
    },

    {
        id: 21,
        name: "Sobremesa de Brigadeiro com Morango",
        category: "Sobremesas",
        price: 12.00,
        description: "Uma deliciosa sobremesa.",
        image: "assets/sobremesas/sobremesa-de-brigadeiro-com-morango-e-creme-de-ninho.jpeg"
    },

    // Fotos que vieram com nome automático do WhatsApp.
    // Elas aparecem sem título no cardápio.
    {
        id: 22,
        name: "Sobremesa",
        showName: false,
        category: "Sobremesas",
        price: 12.00,
        description: "",
        image: "assets/sobremesas/WhatsApp Image 2026-10-25 at 15.10.30.jpeg"
    },

    {
        id: 23,
        name: "Sobremesa",
        showName: false,
        category: "Sobremesas",
        price: 12.00,
        description: "",
        image: "assets/sobremesas/WhatsApp Image 2026-10-25 at 15.10.33 (1).jpeg"
    }
];


/* ============================================================
   02. ESTADO DA APLICAÇÃO
   ============================================================ */

let cartItemsState = [];
let selectedCategory = "Todos";

let customizationState = { product: null, quantity: 1 };

// Taxa fixa cobrada somente quando o cliente escolhe entrega.
const DELIVERY_FEE = 3.00;


/* ============================================================
   03. SELETORES DO DOM
   ============================================================ */

const elements = {
  products: document.getElementById("products"),
  searchInput: document.getElementById("searchInput"),
  resultCount: document.getElementById("resultCount"),

  cart: document.getElementById("cart"),
  overlay: document.getElementById("overlay"),
  cartItems: document.getElementById("cartItems"),
  cartCount: document.getElementById("cartCount"),
  cartTotal: document.getElementById("cartTotal"),
  checkoutButton: document.getElementById("checkout"),

  checkoutModal: document.getElementById("checkoutModal"),

  customizationModal: document.getElementById("customizationModal"),
  customProductEmoji: document.getElementById("customProductEmoji"),
  customProductName: document.getElementById("customProductName"),
  customProductDescription: document.getElementById("customProductDescription"),
  customFlavor: document.getElementById("customFlavor"),
  customFilling: document.getElementById("customFilling"),
  customTopping: document.getElementById("customTopping"),
  customQuantity: document.getElementById("customQuantity"),
  customQuantityMinus: document.getElementById("customQuantityMinus"),
  customQuantityPlus: document.getElementById("customQuantityPlus"),
  confirmCustomization: document.getElementById("confirmCustomization"),
  skipCustomization: document.getElementById("skipCustomization"),

  payment: document.getElementById("payment"),
  cashChangeBox: document.getElementById("cashChangeBox"),
  changeFor: document.getElementById("changeFor"),
  changePreview: document.getElementById("changePreview")
};


/* ============================================================
   04. PRODUTOS / FILTROS
   ============================================================ */

function formatCurrency(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}


function getFilteredProducts() {
  const search = elements.searchInput.value
    .toLowerCase()
    .trim();

  return products.filter((product) => {

    const matchesCategory =
      selectedCategory === "Todos" ||
      product.category === selectedCategory;

    const searchableText = `
      ${product.name}
      ${product.category}
      ${product.description}
    `.toLowerCase();

    const matchesSearch =
      searchableText.includes(search);

    return matchesCategory && matchesSearch;
  });
}


function renderProducts() {
  const filteredProducts = getFilteredProducts();

  elements.resultCount.textContent =
    `${filteredProducts.length} produto${filteredProducts.length === 1 ? "" : "s"}`;

  if (!filteredProducts.length) {
    elements.products.innerHTML = `
      <p class="no-results">
        Nenhum produto encontrado. ♡
      </p>
    `;

    return;
  }

  elements.products.innerHTML = filteredProducts
    .map(createProductCard)
    .join("");
}


function createProductCard(product) {

    const customizationLabel = product.customizable
        ? `<small class="customizable-label">♡ Monte do seu jeito</small>`
        : "";

    // Se o produto tiver foto, mostra a imagem.
    // Se não tiver, mantém o emoji antigo.
    const productVisual = product.image
        ? `
      <img
        src="${product.image}"
        alt="${product.showName === false ? "Sobremesa da PRII DOCES" : product.name}"
        loading="lazy"
      >
    `
        : product.emoji;

    // Alguns produtos podem aparecer sem título.
    const productName = product.showName === false
        ? ""
        : `<h3>${product.name}</h3>`;

    const productDescription = product.description
        ? `<p>${product.description}</p>`
        : "";

    return `
    <article class="product-card" data-product-id="${product.id}">

      <div class="product-image">
        ${productVisual}
      </div>

      <div class="product-info">

        <span class="product-category">
          ${product.category}
        </span>

        ${productName}

        ${productDescription}

        ${customizationLabel}

        <div class="product-bottom">

          <span class="product-price">
            ${formatCurrency(product.price)}
          </span>

          <div class="product-add-controls" aria-label="Quantidade de ${product.name} no carrinho">

            <button
              class="decrease-product"
              type="button"
              data-product-action="decrease"
              data-product-id="${product.id}"
              data-decrease-for="${product.id}"
              aria-label="Remover uma unidade de ${product.name}"
              ${getProductQuantity(product.id) === 0 ? "disabled" : ""}
            >−</button>

            <span
              class="product-cart-quantity"
              data-quantity-for="${product.id}"
              aria-live="polite"
            >${getProductQuantity(product.id)}</span>

            <button
              class="add-product"
              type="button"
              data-product-action="increase"
              data-product-id="${product.id}"
              aria-label="Adicionar uma unidade de ${product.name}"
            >+</button>

          </div>

        </div>

      </div>

    </article>
  `;
}


/* ============================================================
   05. CARRINHO
   ============================================================ */

function handleProductSelection(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;
  if (!product.customizable) {
    addToCart(product, 1, {});
    return;
  }
  openCustomization(product);
}

function openCustomization(product) {
  customizationState = { product, quantity: 1 };
  elements.customProductEmoji.textContent = product.emoji;
  elements.customProductName.textContent = product.name;
  elements.customProductDescription.textContent = "Monte do seu jeito, escolha a quantidade e adicione outras combinações ao carrinho quando quiser. Todas as opções são opcionais.";
  elements.customFlavor.value = "";
  elements.customFilling.value = "";
  elements.customTopping.value = "";
  updateCustomizationQuantity();
  elements.customizationModal.classList.add("show");
}

function updateCustomizationQuantity() {
  elements.customQuantity.textContent = customizationState.quantity;
}

function getCustomizationData() {
  return {
    flavor: elements.customFlavor.value,
    filling: elements.customFilling.value,
    topping: elements.customTopping.value
  };
}

function getCustomizationLabel(customization) {
  const parts = [];
  if (customization.flavor) parts.push(`Sabor: ${customization.flavor}`);
  if (customization.filling) parts.push(`Recheio: ${customization.filling}`);
  if (customization.topping) parts.push(`Finalização: ${customization.topping}`);
  return parts.join(" • ");
}

function closeCustomization() {
  elements.customizationModal.classList.remove("show");
  customizationState = { product: null, quantity: 1 };
}

function confirmProductCustomization() {
  if (!customizationState.product) return;
  addToCart(customizationState.product, customizationState.quantity, getCustomizationData());
  closeCustomization();
}

function addCustomizedProductWithoutOptions() {
  if (!customizationState.product) return;

  // Mesmo sem escolher sabor/recheio, respeita a quantidade escolhida no modal.
  addToCart(customizationState.product, customizationState.quantity, {});
  closeCustomization();
}

function createCartId(productId, customization) {
  return `${productId}-${JSON.stringify(customization)}`;
}

// Soma todas as versões do mesmo produto, inclusive as personalizadas.
function getProductQuantity(productId) {
  return cartItemsState
    .filter((item) => item.productId === productId)
    .reduce((total, item) => total + item.quantity, 0);
}

// Sincroniza quantidade e botão − do cardápio com o carrinho.
function updateProductQuantityBadges() {
  document.querySelectorAll("[data-quantity-for]").forEach((badge) => {
    const quantity = getProductQuantity(Number(badge.dataset.quantityFor));
    badge.textContent = quantity;
    badge.classList.toggle("has-quantity", quantity > 0);
  });

  document.querySelectorAll("[data-decrease-for]").forEach((button) => {
    button.disabled = getProductQuantity(Number(button.dataset.decreaseFor)) === 0;
  });
}

// Quando houver variações do mesmo produto, diminui a última adicionada.
function decreaseProductQuantity(productId) {
  const item = [...cartItemsState].reverse().find((entry) => entry.productId === productId);
  if (item) changeQuantity(item.cartId, -1);
}

// Eventos delegados: botões seguem funcionando ao buscar ou trocar categoria.
elements.products.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-product-action][data-product-id]");
  if (!button || !elements.products.contains(button) || button.disabled) return;
  event.preventDefault();

  const productId = Number(button.dataset.productId);
  if (button.dataset.productAction === "decrease") {
    decreaseProductQuantity(productId);
  } else if (button.dataset.productAction === "increase") {
    handleProductSelection(productId);
  }
});

function addToCart(product, quantity = 1, customization = {}) {

    const cartId = createCartId(product.id, customization);

    const existingItem = cartItemsState.find(
        (item) => item.cartId === cartId
    );

    if (existingItem) {

        existingItem.quantity += quantity;

    } else {

        cartItemsState.push({

            cartId: cartId,
            productId: product.id,

            name: product.name,
            category: product.category,

            price: product.price,

            // Guarda a foto e o emoji, caso existam.
            image: product.image || "",
            emoji: product.emoji || "🍰",

            quantity: quantity,
            customization: customization

        });

    }

    renderCart();

}

function calculateCartTotal() {
  return cartItemsState.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );
}


function calculateCartQuantity() {
  return cartItemsState.reduce(
    (total, item) => total + item.quantity,
    0
  );
}


function renderCart() {
  // Mantém a quantidade dos cards sincronizada com o carrinho.
  updateProductQuantityBadges();

  const totalQuantity = calculateCartQuantity();
  const totalPrice = calculateCartTotal();

  elements.cartCount.textContent = totalQuantity;
  elements.cartTotal.textContent = formatCurrency(totalPrice);
  updateCheckoutSummary();

  elements.checkoutButton.disabled =
    cartItemsState.length === 0;


  if (!cartItemsState.length) {
    elements.cartItems.innerHTML = `
      <div class="empty-cart">

        <div class="empty-icon">
          🧁
        </div>

        <h3>
          Seu carrinho está vazio
        </h3>

        <p>
          Adicione um docinho para começar.
        </p>

      </div>
    `;

    return;
  }


  elements.cartItems.innerHTML =
    cartItemsState
      .map((item, index) => createCartItem(item, index))
      .join("");
}


function createCartItem(item, index) {

    const customizationLabel =
        getCustomizationLabel(item.customization);

    // Verifica se o produto possui uma foto.
    const productImage = item.image
        ? `
      <img
        src="${item.image}"
        alt="${item.name}"
        loading="lazy"
      >
    `
        : `
      <span>${item.emoji || "🍰"}</span>
    `;

    return `

    <div class="cart-item">

      <div class="cart-item-image">
        ${productImage}
      </div>

      <div class="cart-item-info">

        <h4>${item.name}</h4>

        <p class="cart-item-price">
          ${formatCurrency(item.price)} cada
        </p>

        ${customizationLabel
            ? `<p class="cart-customization">${customizationLabel}</p>`
            : ""
        }

        <div class="quantity-controls">

          <button
            type="button"
            data-cart-action="decrease"
            data-cart-index="${index}"
            aria-label="Diminuir quantidade de ${item.name}"
          >−</button>

          <strong class="cart-item-quantity" aria-live="polite">${item.quantity}</strong>

          <button
            type="button"
            data-cart-action="increase"
            data-cart-index="${index}"
            aria-label="Aumentar quantidade de ${item.name}"
          >+</button>

        </div>

      </div>

      <strong class="cart-item-subtotal">
        ${formatCurrency(item.price * item.quantity)}
      </strong>

    </div>

  `;

}

// Altera a quantidade de um item do carrinho. Ao chegar a zero,
// remove o item por completo (sem permitir quantidades negativas).
function changeQuantity(cartId, amount) {
  const index = cartItemsState.findIndex((item) => item.cartId === cartId);
  if (index < 0 || !Number.isInteger(amount) || amount === 0) return;

  const nextQuantity = cartItemsState[index].quantity + amount;
  if (nextQuantity <= 0) {
    cartItemsState.splice(index, 1);
  } else {
    cartItemsState[index].quantity = nextQuantity;
  }

  renderCart();
}

// Usa o índice atual do item, evitando nomes codificados nos atributos HTML.
// Após cada alteração o carrinho é redesenhado e os índices são atualizados.
elements.cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-cart-action][data-cart-index]");
  if (!button || !elements.cartItems.contains(button)) return;
  event.preventDefault();

  const index = Number(button.dataset.cartIndex);
  if (!Number.isInteger(index) || index < 0 || index >= cartItemsState.length) return;
  const amount = button.dataset.cartAction === "increase" ? 1 : -1;
  changeQuantity(cartItemsState[index].cartId, amount);
});


/* ============================================================
   06. PAINÉIS
   ============================================================ */

function openCart() {
  elements.cart.classList.add("open");
  elements.overlay.classList.add("show");
}


function closeCart() {
  elements.cart.classList.remove("open");
  elements.overlay.classList.remove("show");
}


function openCheckoutModal() {
  if (!cartItemsState.length) return;

  // Nenhum recebimento vem marcado, nem mesmo após fechar e abrir novamente.
  document.getElementById("deliveryMethod").value = "";
  clearDeliveryMethodError();
  updateCheckoutSummary();
  elements.checkoutModal.classList.add("show");
}


function closeCheckoutModal() {
  elements.checkoutModal.classList.remove("show");
}


/* ============================================================
   PAGAMENTO / TROCO
   ============================================================ */

function updatePaymentFields() {
  const isCash = elements.payment.value === "Dinheiro";
  elements.cashChangeBox.hidden = !isCash;
  if (!isCash) {
    elements.changeFor.value = "";
    elements.changePreview.textContent = "Informe o valor que você vai entregar.";
    elements.changePreview.className = "change-preview";
  } else {
    updateChangePreview();
  }
}

function updateChangePreview() {
  if (elements.payment.value !== "Dinheiro") return;
  const amount = Number(elements.changeFor.value);
  const total = calculateCartTotal();
  if (!amount) {
    elements.changePreview.textContent = "Informe o valor que você vai entregar.";
    elements.changePreview.className = "change-preview";
    return;
  }
  if (amount < total) {
    elements.changePreview.textContent = `O valor precisa ser igual ou maior que ${formatCurrency(total)}.`;
    elements.changePreview.className = "change-preview invalid";
    return;
  }
  elements.changePreview.textContent = `Troco: ${formatCurrency(amount - total)}`;
  elements.changePreview.className = "change-preview valid";
}

function getChangeForValue() {
  if (elements.payment.value !== "Dinheiro") return null;
  const amount = Number(elements.changeFor.value);
  return amount && amount >= calculateCartTotal() ? amount : null;
}

/* ============================================================
   07. FINALIZAÇÃO / WHATSAPP
   ============================================================ */

function sendOrderToWhatsApp() {
  const name = document.getElementById("customerName").value.trim();
  const payment = document.getElementById("payment").value;
  const address = document.getElementById("address").value.trim();
  const deliveryMethod = document.getElementById("deliveryMethod").value;
  const isDelivery = deliveryMethod === "Entrega com frete";

  if (!cartItemsState.length) return;
  if (!name) {
    alert("Preencha seu nome para continuar.");
    document.getElementById("customerName").focus();
    return;
  }

  // Sem seleção explícita, não é possível encaminhar o pedido.
  if (!validateDeliveryMethod()) return;

  // Para entrega, o endereço é obrigatório. Na retirada, ele é opcional.
  if (isDelivery && !address) {
    alert("Informe o endereço para a entrega.");
    return;
  }

  /*
    CONFIGURAÇÃO:
    Coloque aqui o WhatsApp real da loja, com DDI + DDD e somente números.
    Exemplo: const whatsappNumber = "5522999999999";
  */
  const whatsappNumber = PRII_CONTACTS.whatsapp || "5500000000000";

  const orderItems = cartItemsState
    .map((item) => `• ${item.quantity}x ${item.name} — ${formatCurrency(item.price * item.quantity)}`)
    .join("\n");

  const deliveryFee = isDelivery ? DELIVERY_FEE : 0;
  const orderTotal = calculateCartTotal() + deliveryFee;
  const deliveryDetails = isDelivery
    ? `Taxa de entrega: ${formatCurrency(DELIVERY_FEE)}.`
    : "Taxa de entrega: R$ 0,00 (retirada no local).";

  const locationDetails = address
    ? address
    : "Retirada no local; sem endereço informado.";

  const message = `
🍰 *NOVO PEDIDO — PRII DOCES*

👤 *Nome:* ${name}

🧁 *Pedido:*
${orderItems}

💰 *Subtotal dos produtos:* ${formatCurrency(calculateCartTotal())}
🚚 *Forma de recebimento:* ${deliveryMethod}
${deliveryDetails}
💵 *TOTAL DO PEDIDO:* ${formatCurrency(orderTotal)}

💳 *Pagamento:* ${payment}

📍 *Endereço / observação:*
${locationDetails}
  `.trim();

  const whatsappUrl =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, "_blank");
}


/* ============================================================
   EVENTOS DA PERSONALIZAÇÃO
   ============================================================ */

/*
   Na V3 o modal abria, mas os botões internos não tinham
   seus eventos conectados. Aqui fazemos essa ligação.
*/

elements.closeCustomization =
  document.getElementById("closeCustomization");

elements.closeCustomization.addEventListener(
  "click",
  closeCustomization
);


elements.customizationModal.addEventListener(
  "click",
  (event) => {
    if (event.target === elements.customizationModal) {
      closeCustomization();
    }
  }
);


elements.confirmCustomization.addEventListener(
  "click",
  (event) => {
    event.preventDefault();
    confirmProductCustomization();
  }
);

elements.skipCustomization.addEventListener(
  "click",
  (event) => {
    event.preventDefault();
    addCustomizedProductWithoutOptions();
  }
);

elements.customQuantityMinus.addEventListener(
  "click",
  () => {
    customizationState.quantity =
      Math.max(1, customizationState.quantity - 1);

    updateCustomizationQuantity();
  }
);

elements.customQuantityPlus.addEventListener(
  "click",
  () => {
    customizationState.quantity += 1;
    updateCustomizationQuantity();
  }
);


/* ============================================================
   08. EVENTOS
   ============================================================ */

document
  .getElementById("openCart")
  .addEventListener("click", openCart);


document
  .getElementById("closeCart")
  .addEventListener("click", closeCart);


elements.overlay.addEventListener(
  "click",
  closeCart
);


elements.searchInput.addEventListener(
  "input",
  renderProducts
);


document
  .getElementById("categories")
  .addEventListener("click", (event) => {

    if (!event.target.matches(".category-button")) {
      return;
    }

    document
      .querySelectorAll(".category-button")
      .forEach((button) => {
        button.classList.remove("active");
      });


    event.target.classList.add("active");

    selectedCategory =
      event.target.dataset.category;


    renderProducts();
  });


// A opção Dinheiro deve abrir o campo de troco.
elements.payment.addEventListener("change", updatePaymentFieldsV5);
elements.changeFor.addEventListener("input", updateChangePreviewV5);

elements.checkoutButton.addEventListener(
  "click",
  openCheckoutModal
);


document
  .getElementById("closeCheckout")
  .addEventListener("click", closeCheckoutModal);


document
  .getElementById("whatsappOrder")
  .addEventListener("click", sendOrderToWhatsApp);

/* Atualiza a explicação de frete quando o cliente troca a opção. */
const deliveryMethodSelect = document.getElementById("deliveryMethod");
const deliveryMethodNote = document.getElementById("deliveryMethodNote");

function clearDeliveryMethodError() {
  deliveryMethodSelect.setAttribute("aria-invalid", "false");
  document.getElementById("deliveryMethodError").hidden = true;
}

function validateDeliveryMethod() {
  const valid = ["Entrega com frete", "Retirada no local"].includes(deliveryMethodSelect.value);
  deliveryMethodSelect.setAttribute("aria-invalid", String(!valid));
  document.getElementById("deliveryMethodError").hidden = valid;
  if (!valid) deliveryMethodSelect.focus();
  return valid;
}

if (deliveryMethodSelect) {
  deliveryMethodSelect.addEventListener("change", () => {
    clearDeliveryMethodError();
    updateCheckoutSummary();
  });
}



/* ============================================================
   09. INICIALIZAÇÃO
   ============================================================ */

// Lê a categoria enviada pela página inicial, por exemplo:
// cardapio.html?categoria=Brownies#cardapio
function applyCategoryFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const requestedCategory = params.get("categoria");
  if (!requestedCategory) return;

  const categoryButton = Array.from(
    document.querySelectorAll(".category-button")
  ).find((button) => button.dataset.category.toLowerCase() === requestedCategory.toLowerCase());

  if (!categoryButton) return;

  document.querySelectorAll(".category-button").forEach((button) => {
    button.classList.toggle("active", button === categoryButton);
  });
  selectedCategory = categoryButton.dataset.category;
  renderProducts();

  // Aguarda a página montar os produtos antes de rolar até a área do cardápio.
  window.setTimeout(() => {
    document.getElementById("cardapio")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 80);
}

renderProducts();
renderCart();
applyCategoryFromUrl();


/* ================= PRII DOCES | LINKS DA CAPA ================= */
const PRII_CONTACTS = {
  // Número oficial com DDI + DDD, somente números.
  whatsapp: "5522999609681",
  // Perfil oficial da PRII DOCES.
  instagram: "https://www.instagram.com/priicardosodoces?igsh=MTE0YnF0MHFzcXJ6Ng=="
};

function setupWelcomeLinks() {
  const whatsappButton = document.getElementById("welcomeWhatsApp");
  const instagramButton = document.getElementById("welcomeInstagram");

  if (whatsappButton) {
    whatsappButton.addEventListener("click", (event) => {
      event.preventDefault();
      if (!PRII_CONTACTS.whatsapp) {
        alert("O WhatsApp ainda não foi configurado. Me passe o número da loja para eu colocar o link.");
        return;
      }
      window.open(`https://wa.me/${PRII_CONTACTS.whatsapp}`, "_blank");
    });
  }

  if (instagramButton) {
    instagramButton.addEventListener("click", (event) => {
      event.preventDefault();
      if (!PRII_CONTACTS.instagram) {
        alert("O Instagram ainda não foi configurado. Me passe o @ da loja para eu colocar o link.");
        return;
      }
      window.open(PRII_CONTACTS.instagram, "_blank");
    });
  }
}

setupWelcomeLinks();

/* ================= PRII DOCES V5 ================= */
const carouselItems=[
 {productId:1,name:"Brigadeiro Gourmet",category:"Brigadeiros",image:"assets/carousel/brigadeiro.jpg",emoji:"🍫"},
 {productId:2,name:"Beijinho",category:"Brigadeiros",image:"assets/carousel/beijinho.jpg",emoji:"🥥"},
 {productId:3,name:"Morango do Amor",category:"Doces",image:"assets/carousel/morango-do-amor.jpg",emoji:"🍓"},
 {productId:5,name:"Bolo de Pote",category:"Bolos",image:"assets/carousel/bolo-de-pote.jpg",emoji:"🍰"},
 {productId:7,name:"Kit Festa",category:"Kits",image:"assets/carousel/kit-festa.jpg",emoji:"🎁"}
];
let carouselIndex=0,carouselTimer=null;
function renderCarousel(){
 const t=document.getElementById("carouselTrack"),d=document.getElementById("carouselDots");
 if(!t||!d)return;
 t.innerHTML=carouselItems.map(x=>`<article class="carousel-card" tabindex="0" data-product-id="${x.productId}"><img src="${x.image}" alt="${x.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'"><div class="carousel-placeholder" style="display:none">${x.emoji}</div><div class="carousel-card-info"><small>${x.category}</small><strong>${x.name}</strong></div></article>`).join("");
 d.innerHTML=carouselItems.map((_,i)=>`<button class="carousel-dot ${i===0?"active":""}" data-carousel-index="${i}" type="button"></button>`).join("");
}
function updateCarousel(){
 const t=document.getElementById("carouselTrack"),v=document.getElementById("carouselWindow"),c=t?.querySelector(".carousel-card");
 if(!t||!v||!c)return;
 const w=c.getBoundingClientRect().width,g=parseFloat(getComputedStyle(t).gap)||0;
 const off=Math.min(carouselIndex*(w+g),Math.max(0,t.scrollWidth-v.clientWidth));
 t.style.transform=`translate3d(${-off}px,0,0)`;
 document.querySelectorAll(".carousel-dot").forEach((d,i)=>d.classList.toggle("active",i===carouselIndex));
}
function goCarousel(i){carouselIndex=(i+carouselItems.length)%carouselItems.length;updateCarousel()}
function startCarousel(){clearInterval(carouselTimer);carouselTimer=setInterval(()=>goCarousel(carouselIndex+1),5200)}
function setupCarousel(){
 const t=document.getElementById("carouselTrack"),v=document.getElementById("carouselWindow");
 if(!t||!v)return;
 document.getElementById("carouselPrev").onclick=()=>{goCarousel(carouselIndex-1);startCarousel()};
 document.getElementById("carouselNext").onclick=()=>{goCarousel(carouselIndex+1);startCarousel()};
 t.onclick=e=>{const c=e.target.closest(".carousel-card");if(!c)return;const p=products.find(x=>x.id===Number(c.dataset.productId));if(!p)return;selectedCategory=p.category;elements.searchInput.value="";document.querySelectorAll(".category-button").forEach(b=>b.classList.toggle("active",b.dataset.category===p.category));renderProducts();setTimeout(()=>{const target=document.querySelector(`.product-card[data-product-id="${p.id}"]`);target?.scrollIntoView({behavior:"smooth",block:"center"});target?.classList.add("product-highlight");setTimeout(()=>target?.classList.remove("product-highlight"),1800)},80)};
 document.getElementById("carouselDots").onclick=e=>{const d=e.target.closest(".carousel-dot");if(d){goCarousel(Number(d.dataset.carouselIndex));startCarousel()}};
 v.onmouseenter=()=>clearInterval(carouselTimer);v.onmouseleave=startCarousel;
t.addEventListener("keydown",e=>{const c=e.target.closest(".carousel-card");if(!c||!((e.key==="Enter")||(e.key===" ")))return;e.preventDefault();c.click()});
}
/* ============================================================
   08. RESUMO DO PEDIDO E TAXA DE ENTREGA
   ============================================================ */

// O subtotal contém apenas os produtos; o frete entra no total final.
function calculateCheckoutTotal() {
  const deliveryMethod = document.getElementById("deliveryMethod")?.value;
  if (!["Entrega com frete", "Retirada no local"].includes(deliveryMethod)) return null;
  const fee = deliveryMethod === "Entrega com frete" ? DELIVERY_FEE : 0;
  return calculateCartTotal() + fee;
}

function updateCheckoutSummary() {
  const deliveryMethod = document.getElementById("deliveryMethod")?.value;
  const isDelivery = deliveryMethod === "Entrega com frete";
  const hasSelection = ["Entrega com frete", "Retirada no local"].includes(deliveryMethod);
  const subtotal = calculateCartTotal();
  const fee = isDelivery ? DELIVERY_FEE : 0;
  const total = subtotal + fee;

  const subtotalElement = document.getElementById("checkoutSubtotal");
  const feeElement = document.getElementById("checkoutDeliveryFee");
  const totalElement = document.getElementById("checkoutGrandTotal");
  const note = document.getElementById("deliveryMethodNote");

  if (subtotalElement) subtotalElement.textContent = formatCurrency(subtotal);
  if (feeElement) feeElement.textContent = hasSelection ? formatCurrency(fee) : "—";
  if (totalElement) totalElement.textContent = hasSelection ? formatCurrency(total) : "—";

  if (note) {
    note.textContent = !hasSelection
      ? "Escolha entrega ou retirada. A taxa de entrega é R$ 3,00; a retirada não tem taxa."
      : isDelivery
        ? `Taxa fixa de entrega: ${formatCurrency(DELIVERY_FEE)}. O valor já está incluído no total abaixo.`
        : "Retirada no local sem taxa de entrega. O total abaixo inclui somente os produtos.";
  }

  updateChangePreviewV5();
}

function updatePaymentFieldsV5(){
 const cash=elements.payment.value==="Dinheiro";
 elements.cashChangeBox.hidden=!cash;
 if(!cash)elements.changeFor.value="";
 updateChangePreviewV5();
}
function updateChangePreviewV5(){
 if(elements.payment.value!=="Dinheiro")return;
 const total=calculateCheckoutTotal();
 if(total === null){elements.changePreview.textContent="Escolha entrega ou retirada para calcular o troco.";elements.changePreview.className="change-preview";return}
 const rawAmount=elements.changeFor.value.replace(",",".");
 const amount=Number(rawAmount);
 if(!rawAmount||!Number.isFinite(amount)||amount<=0){elements.changePreview.textContent="Digite quanto o cliente vai entregar.";elements.changePreview.className="change-preview";return}
 if(amount<total){elements.changePreview.textContent=`Valor insuficiente. Faltam ${formatCurrency(total-amount)}.`;elements.changePreview.className="change-preview invalid";return}
 elements.changePreview.textContent=`Troco: ${formatCurrency(amount-total)}`;elements.changePreview.className="change-preview valid";
}
