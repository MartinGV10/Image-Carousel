class Carousel {
    constructor(className, images, appendTo) {
        this.className = className
        this.images = images
        this.appendTo = document.querySelector(`.${appendTo}`)
        this.idx = 0
        this.selectorIdx = 0
        this.imageElements = [] // store created <img> elements so we can show/hide them
        this.selNum = -1
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
        let selIdx = [];
        let selector;
        let picMap = new Map()
        for (let i = 0; i < this.images.length; i++) {
            picture = document.createElement('img')
            picture.src = this.images[i]
            picture.style.display = 'none' // hide initially
            imagesContainer.appendChild(picture)
            this.imageElements.push(picture)

            selector = document.createElement('div')
            selector.classList.add('selector')
            this.selNum++
            selIdx.push(this.selNum)
            bottom.appendChild(selector)
            selectorList.push(selector)

            // Hashmap of pictures and indexes -> {1 -> pic1}
            picMap.set(this.imageElements[i], selectorList[i])
        }

        // show the first image if present
        if (this.imageElements.length > 0) {
            this.imageElements[this.idx].style.display = 'block'
            selectorList[this.idx].style.backgroundColor = 'aquamarine'
            // keep selector index in sync with shown image
            this.selectorIdx = this.idx
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

        // clicking a selector jumps to that image index
        selectorList.forEach((item, index) => {
            item.addEventListener('click', () => {
                if (this.imageElements.length === 0) return
                // hide current image and reset its selector color
                this.imageElements[this.idx].style.display = 'none'
                selectorList[this.idx].style.backgroundColor = 'white'

                // update indices to clicked index
                this.idx = index
                this.selectorIdx = index

                // show target image and highlight its selector
                this.imageElements[this.idx].style.display = 'block'
                selectorList[this.idx].style.backgroundColor = 'aquamarine'
                console.log(`jump -> ${this.idx} -> ${this.imageElements[this.idx].src}`)
            })
        });



    }

}


const pics = ['./assets/door.jpg', './assets/typewriter.jpg', './assets/sign.jpg']

// , './assets/door.jpg', './assets/typewriter.jpg'

const pp = new Carousel('hi', pics, 'content').createCarousel()
// console.log(pics[0])

export default Carousel