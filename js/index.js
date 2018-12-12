
const gallery = document.getElementById('gallery');


getGallery = (gallery) => {
    let galleryElements = gallery.children;
    let newElements = [];

    for(let i=0; i < gallery.childElementCount; i++){

        let src = galleryElements[i].src;
        src = src.replace('thumb', 'front');
        src = src.replace('file:///C:/node/litghtBox/', '');
        
        newElements.push({
            description: galleryElements[i].alt,
            src: src,
        });
    };
    
    return newElements;
};

getCurrentElement = (gallery, element ) => {
    let galleryElements = gallery.children;

    for (let i = 0; i < gallery.childElementCount; i++) {

        if (galleryElements[i] == (element)) {
            return i+1;
        }
    }
}

lightBoxDisplay = ( elementPosition, lightBoxElements ) => {
    let lightBox = document.createElement('div');
    lightBox.className = "container-lightBox";
    lightBox.id = 'lightBox'

    lightBox.innerHTML = `
    <div class="box-image">
        <span id="close" class="fa fa-times icon-image icon-close"></span>
        <img class="image-lightBox" src="${lightBoxElements[elementPosition-1].src}">
        </img>
        <h5 class="lightBox-title">${elementPosition}  DE  ${lightBoxElements.length}</h5>
        <span id="left" class="fa fa-chevron-circle-left icon-image arrow-left"></span>
        <span id="right" class="fa fa-chevron-circle-right icon-image arrow-right"></span>
    </div>`;

    document.body.style.overflowX = 'hidden';
    document.body.style.overflowY = 'hidden';

    document.body.appendChild(lightBox);

};


movementImage = ( elementPosition, lightBoxElements, direction ) => {
    let image = document.querySelectorAll('.image-lightBox')[0];
    let imageText = document.querySelectorAll('.lightBox-title')[0];
    
    switch (direction) {
        case 'left':
            image.src = lightBoxElements[elementPosition - 1].src;   
            imageText.innerText = `${elementPosition}  DE  ${lightBoxElements.length}`; 
            break;
        case 'right':
            image.src = lightBoxElements[elementPosition].src;
            imageText.innerText = `${elementPosition + 1}  DE  ${lightBoxElements.length}`;
            break;
        default:
            break;
    }
};

gallery.addEventListener('click', e =>{

    let elementPosition = getCurrentElement(gallery, e.target);

    let lightBoxElements = getGallery(gallery);

    lightBoxDisplay(elementPosition, lightBoxElements);



    document.getElementById('close').addEventListener('click', (e) => {
        let lightBox = document.getElementById('lightBox')
        
        lightBox.parentNode.removeChild(lightBox);

    });



    document.getElementById('left').addEventListener('click', (e) => {

        if ((elementPosition - 1) < 1) {
            return;
        }
        
        elementPosition = elementPosition - 1;
        movementImage(elementPosition, lightBoxElements, 'left');
    });



    document.getElementById('right').addEventListener('click', (e) => {

        if (elementPosition > 11) {
            return;
        }
        movementImage(elementPosition, lightBoxElements, 'right');
        elementPosition = elementPosition + 1;
    });
})
