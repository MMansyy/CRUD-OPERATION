let productNameInput = document.getElementById("productName");
let productPriceInput = document.getElementById("productPrice");
let productCategoryInput = document.getElementById("productCategory");
let DescriptionInput = document.getElementById("Description");
let productImgInput = document.getElementById("productImg");
let productList = [];
let addBtn = document.querySelector("#add");
let updateBtn = document.querySelector("#updateBtn");
let updateIndex;
let productSearch = document.getElementById("productSearch");
let upload = document.getElementById("upload");

if (localStorage.getItem("productsList")) {
  productList = JSON.parse(localStorage.getItem("productsList"));
  displayProducts(productList);
}



function addProduct() {
  let product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    desc: DescriptionInput.value,
    img: productImgInput.files[0].name,
  };
  productList.push(product);
  localStorage.setItem("productsList", JSON.stringify(productList));
  displayProducts(productList);
  clearForm();
}



function displayProducts(list) {
  let cartona = "";
  for (let i = 0; i < list.length; i++) {

    cartona += `
    <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="card">
                        <img src="./imgs//${list[i].img}" class="card-img-top" style="aspect-ratio: 16/9; object-fit: contain;">
                        <div class="card-body">
                            <h5 class="card-title">${list[i].newName ? list[i].newName : list[i].name}</h5>
                            <div class="d-flex justify-content-between">
                                <h6><span class="badge text-bg-primary">${list[i].category}</span></h6>
                                <h6><span class="badge text-bg-success">${list[i].price}$</span></h6>
                            </div>
                            <p class="card-text my-3">${list[i].desc}</p>
                        </div>
                        <div class="card-footer">
                            <div class="d-flex">
                                <a href="#" onclick="updateProduct(${i})" class="btn btn-outline-dark">update</a>
                                <a href="#" onclick="deleteProduct(${i})" class="btn btn-outline-danger mx-2">delete</a>
                            </div>
                        </div>
                    </div>
                    </div>
                    `
  }
  document.getElementById("showProduct").innerHTML = cartona;
}


function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  DescriptionInput.value = "";
  productImgInput.value = "";
  productNameInput.classList.remove("is-valid");
  productPrice.classList.remove("is-valid");
  productCategory.classList.remove("is-valid");
  Description.classList.remove("is-valid");
  productImg.classList.remove("is-valid");

}

function deleteProduct(index) {
  productList.splice(index, 1);
  localStorage.setItem("productsList", JSON.stringify(productList));
  displayProducts(productList);
}


function updateProduct(index) {
  productNameInput.value = productList[index].name;
  productPriceInput.value = productList[index].price;
  productCategoryInput.value = productList[index].category;
  DescriptionInput.value = productList[index].desc;
  // productImgInput.value = productList[index].img;
  updateBtn.classList.remove("d-none");
  addBtn.classList.add("d-none");
  updateIndex = index;
}


function update() {
  productList[updateIndex].name = productNameInput.value;
  productList[updateIndex].price = productPriceInput.value;
  productList[updateIndex].category = productCategoryInput.value;
  productList[updateIndex].desc = DescriptionInput.value;
  productList[updateIndex].img = productImgInput.files[0]?.name || productList[updateIndex].img;
  localStorage.setItem("productsList", JSON.stringify(productList));
  displayProducts(productList);
  clearForm();
  updateBtn.classList.add("d-none");
  addBtn.classList.remove("d-none");
}

function validationInputs(input) {
  var rexgs = {
    productName: /^[A-Z][a-z]{2,10}$/,
    productPrice: /^([6-9][0-9]{3}|[1-5][0-9]{4}|60000)$/,
    productCategory: /(Phones|Tv|Screens|Laptops)/,
    productImg: /^.{1,}\.(png|jpg){1}$/,
    Description: /^[a-zA-Z]{0,250}$/,
  };

  let x = rexgs[input.id].test(input.value);

  if (x) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    input.nextElementSibling.classList.replace("d-block", "d-none");
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    input.nextElementSibling.classList.replace("d-none", "d-block");
  }
  toggleButton();
}

function toggleButton() {
  if (
    productNameInput.classList.contains("is-valid") &&
    productPriceInput.classList.contains("is-valid") &&
    productCategoryInput.classList.contains("is-valid") &&
    DescriptionInput.classList.contains("is-valid") &&
    productImgInput.classList.contains("is-valid")
  ) {
    addBtn.classList.remove("disabled");
  } else {
    addBtn.classList.add("disabled");
  }

}


function searchProduct() {
  let searchList = productList.filter((product) => product.name.toLowerCase().includes(productSearch.value.toLowerCase()));
  searchList.forEach((product) => {
    product.newName = product.name.toLowerCase().replace(productSearch.value.toLowerCase(), `<span class="text-danger">${productSearch.value.toLowerCase()}</span>`);
  });
  if (searchList.length == 0) {
    return document.getElementById("showProduct").innerHTML = `<div class="alert alert-danger" role="alert"> No Products Found </div>`;
  }
  displayProducts(searchList);
}