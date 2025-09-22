class Carousel {
    constructor(className, images, appendTo) {
        this.className = className
        this.images = images
        this.appendTo = document.querySelector(`.${appendTo}`)
    }

    createCarousel() {
        const imgCont = document.createElement('div')
        imgCont.classList.add('img-cont')
        this.appendTo.appendChild(imgCont)

        const top = document.createElement('div')
        top.classList.add('top')
        imgCont.appendChild(top)

        const left = document.createElement('img')
        left.src = './assets/forward.png'
        left.classList.add('left')
        top.appendChild(left)

        const right = document.createElement('img')
        right.src = './assets/back.png'
        right.classList.add('right')
        top.appendChild(right)

        const imagesContainer = document.createElement('div')
        imagesContainer.classList.add('images')
        top.appendChild(imagesContainer)

        const bottom = document.createElement('div')
        bottom.classList.add('bottom')
        imgCont.appendChild(bottom)

        for (let i = 0; i < this.images.length; i++) {

            let picture = document.createElement('img')
            picture.src = this.images[i]
            imagesContainer.appendChild(picture)
            // console.log(this.images[i])

            let selector = document.createElement('div')
            selector.classList.add('selector')
            bottom.appendChild(selector)
            // this.images.src = this.images[i]
        }


    }

}


const pics = []

// , './assets/door.jpg', './assets/typewriter.jpg'

const pp = new Carousel('hi', pics, 'content').createCarousel()
// console.log(pics[0])

export default Carousel