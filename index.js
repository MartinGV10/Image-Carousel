class Carousel {
    constructor(className, images, appendTo) {
        this.className = className
        this.images = images
        this.appendTo = document.querySelector(`.${appendTo}`)
        this.idx = 0
        this.imageElements = [] // store created <img> elements so we can show/hide them
    }

    createCarousel() {
        const imgCont = document.createElement('div')
        imgCont.classList.add('img-cont')
        this.appendTo.appendChild(imgCont)

        const top = document.createElement('div')
        top.classList.add('top')
        imgCont.appendChild(top)

        const left = document.createElement('img')
        left.src = './assets/back.png'
        left.classList.add('left')
        top.appendChild(left)

        const imagesContainer = document.createElement('div')
        imagesContainer.classList.add('images')
        top.appendChild(imagesContainer)

        const bottom = document.createElement('div')
        bottom.classList.add('bottom')
        imgCont.appendChild(bottom)

        let picture;

        for (let i = 0; i < this.images.length; i++) {
            picture = document.createElement('img')
            picture.src = this.images[i]
            picture.style.display = 'none' // hide initially
            imagesContainer.appendChild(picture)
            this.imageElements.push(picture)

            let selector = document.createElement('div')
            selector.classList.add('selector')
            bottom.appendChild(selector)
        }

        // show the first image if present
        if (this.imageElements.length > 0) {
            this.imageElements[this.idx].style.display = 'block'
        }

        const right = document.createElement('img')
        right.src = './assets/forward.png'
        right.classList.add('right')
        top.appendChild(right)


        right.addEventListener('click', () => {
            if (this.imageElements.length === 0) return
            // hide current
            this.imageElements[this.idx].style.display = 'none'
            // advance
            this.idx++
            if (this.idx === this.imageElements.length) this.idx = 0
            // show next
            this.imageElements[this.idx].style.display = 'block'
            console.log(`${this.idx} -> ${this.imageElements[this.idx].src}`)
        })

        left.addEventListener('click', () => {
            if (this.imageElements.length === 0) return
            // hide current
            this.imageElements[this.idx].style.display = 'none'
            // go back
            this.idx--
            if (this.idx < 0) this.idx = this.imageElements.length - 1
            // show previous
            this.imageElements[this.idx].style.display = 'block'
            console.log(`${this.idx} -> ${this.imageElements[this.idx].src}`)
        })



    }

}


const pics = ['./assets/door.jpg', './assets/typewriter.jpg', './assets/sign.jpg']

// , './assets/door.jpg', './assets/typewriter.jpg'

const pp = new Carousel('hi', pics, 'content').createCarousel()
// console.log(pics[0])

export default Carousel