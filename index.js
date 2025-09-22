class Carousel {
    constructor(className, images, appendTo) {
        this.className = className
        this.images = images
        this.appendTo = document.querySelector(`.${appendTo}`)
        this.idx = 0
        this.selectorIdx = 0
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
        let selectorList = [];
        for (let i = 0; i < this.images.length; i++) {
            picture = document.createElement('img')
            picture.src = this.images[i]
            picture.style.display = 'none' // hide initially
            imagesContainer.appendChild(picture)
            this.imageElements.push(picture)

            let selector = document.createElement('div')
            selector.classList.add('selector')
            bottom.appendChild(selector)
            selectorList.push(selector)
        }

        // show the first image if present
        if (this.imageElements.length > 0) {
            this.imageElements[this.idx].style.display = 'block'
            selectorList[this.idx].style.backgroundColor = 'aquamarine'
        }

        const right = document.createElement('img')
        right.src = './assets/forward.png'
        right.classList.add('right')
        top.appendChild(right)


        right.addEventListener('click', () => {
            if (this.imageElements.length === 0) return
            this.imageElements[this.idx].style.display = 'none'

            this.idx++  
            this.selectorIdx++          
            if (this.idx === this.imageElements.length && this.selectorIdx === selectorList.length) {
                this.idx = 0
                this.selectorIdx = 0
                selectorList[selectorList.length - 1].style.backgroundColor = 'white'
            }

            this.imageElements[this.idx].style.display = 'block'
            console.log(`${this.idx} -> ${this.imageElements[this.idx].src}`)

            selectorList[this.selectorIdx].style.backgroundColor = 'aquamarine'
            selectorList[this.selectorIdx - 1].style.backgroundColor = 'white'



        })

        left.addEventListener('click', () => {
            if (this.imageElements.length === 0) return
            this.imageElements[this.idx].style.display = 'none'
            
            this.idx--
            this.selectorIdx--          
            if (this.idx < 0 && this.selectorIdx < 0) {
                this.idx = this.imageElements.length - 1
                this.selectorIdx = this.imageElements.length - 1
                selectorList[0].style.backgroundColor = 'white'
            }

            this.imageElements[this.idx].style.display = 'block'
            console.log(`${this.idx} -> ${this.imageElements[this.idx].src}`)

            selectorList[this.idx].style.backgroundColor = 'aquamarine'
            selectorList[this.idx + 1].style.backgroundColor = 'white'
            

        })



    }

}


const pics = ['./assets/door.jpg', './assets/typewriter.jpg', './assets/sign.jpg']

// , './assets/door.jpg', './assets/typewriter.jpg'

const pp = new Carousel('hi', pics, 'content').createCarousel()
// console.log(pics[0])

export default Carousel