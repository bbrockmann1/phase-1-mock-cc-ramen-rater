const ramenMenu = document.getElementById('ramen-menu');
const ramenDetail = document.getElementById('ramen-detail');
const form = document.getElementById('new-ramen');

const deleteBtn = document.createElement('button');
deleteBtn.textContent = 'Delete';
ramenDetail.append(deleteBtn);

function fetchRamenData(url){
    fetch(url)
    .then(resp => resp.json())
    .then(data => {
        data.forEach(renderRamens);
        showFirstRamen(data)
        DeleteFunction(data)
    })
};
fetchRamenData('http://localhost:3000/ramens');

function showFirstRamen(data){
    const img = document.querySelector('.detail-image');
    const name = document.querySelector('.name');
    const h3 = document.querySelector('.restaurant');

    img.src = data[0].image;
    name.textContent[0] = data.name;
    h3.textContent[0] = data.restaurant;
};

function renderRamens(obj){
    const newImg = document.createElement('img');
    newImg.src = obj.image;
    ramenMenu.append(newImg);

    const img = document.querySelector('.detail-image');
    const name = document.querySelector('.name');
    const h3 = document.querySelector('.restaurant');

    newImg.addEventListener('click', (e) => {
        img.src = obj.image;
        name.textContent = obj.name;
        h3.textContent = obj.restaurant;
    });
};

function postRequest(url, body){
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(body)
    };
    
    
    fetch(url, config)
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e)
    
    const newRamen = {
        name: e.target.name.value,
        restaurant: e.target.restaurant.value,
        image: e.target.image.value,
        rating: e.target.rating.value,
        comment: e.target.value
    };

    postRequest('http://localhost:3000/ramens', newRamen)
});

// VVV unfinished delete feature VVVV
function DeleteFunction(data){
    deleteBtn.addEventListener('click', (e) => {
        
    deleteRequest(`http://localhost:3000/ramens/${data.id}`)
    .then(data.remove());
    });
}
function deleteRequest(url){
    const config = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }};
    
    fetch(url, config)
};